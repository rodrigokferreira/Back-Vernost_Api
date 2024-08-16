import prismaClient from "../../prisma";

interface UpdateUserProps {
    id: string;
    fullName: string;
    username: string;
    email: string;
    photoUser: string;
    status?: boolean;
}

class UpdateUserService {
    async execute({ id, fullName, username, email, photoUser, status }: UpdateUserProps) {
        try {
            const user = await prismaClient.user.update({
                where: { id },
                data: {
                    fullName,
                    username,
                    email,
                    photoUser,
                    status
                }
            });
            return user;
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error}`);
        }
    }
}

export default UpdateUserService;