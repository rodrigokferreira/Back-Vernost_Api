import prismaClient from "../../prisma";

interface GetUserProps {
    id: string;
}

class GetUserService {
    async execute({ id }: GetUserProps) {
        if (!id) {
            throw new Error("Solicitação Inválida");
        }
        
        try {
            const getUser = await prismaClient.user.findFirst({
                where: { id },
            });

            if (!getUser) {
                throw new Error("User not found");
            }

            return { message: "User resgatado com sucesso!", user: getUser };
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error}`);
        }
    }
}

export default  GetUserService ;
