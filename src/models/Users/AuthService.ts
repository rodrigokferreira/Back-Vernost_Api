import prismaClient from "../../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AuthProps {
    email: string;
    password: string;
}

class AuthService {
    async execute({ email, password }: AuthProps) {

        const user = await prismaClient.user.findUnique({
            where: { email },
        });

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

        return {
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                cpf: user.cpf,
                status: user.status,
                photoUser: user.photoUser
            }
        };
    }
}

export default AuthService;
