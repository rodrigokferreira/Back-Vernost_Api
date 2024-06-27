import prismaClient from "../../prisma";
import bcrypt from "bcrypt";

interface UserServiceProps {
    fullName: string;
    username: string;
    email: string;
    password: string;
    cpf: string;
    status: Boolean;
    photoUser?: string;
}

class UserService {
    async execute({fullName, username, email, password, cpf, status, photoUser}: UserServiceProps) {
        
        if (!fullName || !username || !email || !password || !cpf) {
            throw new Error("Preencha todos os campos");
        }

        const crptPassoword = await bcrypt.hash(password, 10);

        const data: any = {
            fullName,
            username,
            email,
            password: crptPassoword,
            cpf,
            status,
        };

        // Verifica se photoUser está presente e adiciona ao objeto data
        if (photoUser !== undefined) {
            data.photoUser = photoUser;
        }

        const user = await prismaClient.user.create({
            data
        });

        return user;
    }
}

export default UserService;
