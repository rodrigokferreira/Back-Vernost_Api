import prismaClient from "../prisma";

interface UserServiceProps {
    fullName: string,
    username: string,
    email: string,
    password: string,
    cpf: string,
    status: Boolean,
    photouser?: string
}

class UserService {
    async execute({fullName, username, email, password, cpf, status, photouser}: UserServiceProps) {
        
        if (!fullName || !username || !email || !password || !cpf) {
            throw new Error("Preencha todos os campos");
        }

        const data: any = {
            fullName,
            username,
            email,
            password,
            cpf,
            status
        };

        if (photouser) {
            data.photoUser = photouser; // Corrigido para photoUser
        }

        const user = await prismaClient.user.create({
            data
        });

        return user;
    }
}

export default UserService;
