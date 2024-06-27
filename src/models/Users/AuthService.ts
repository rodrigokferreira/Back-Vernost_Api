import prismaClient from "../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AuthProps {
    username: string;
    password: string;
}

class AuthService {
    async execute({ username, password }: AuthProps) {
        // Procurar o usuário pelo nome de usuário
        const user = await prismaClient.user.findUnique({ where: { username } });

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Senha incorreta.");
        }

        // Gerar um token JWT
        const token = jwt.sign({ userId: user.id }, "vernost_jwt", { expiresIn: "1d" });

        return { token, user };
    }
}

export default AuthService;
