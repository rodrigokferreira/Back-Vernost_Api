import prismaClient from "../../prisma";

interface DeleteClothingProps {
    id: string;
}

class DeleteClothing {
    async execute({ id }: DeleteClothingProps) {
        if (!id) {
            throw new Error("Solicitação Inválida");
        }

        try {
            const findClothing = await prismaClient.clothing.findFirst({
                where: { id }
            });

            if (!findClothing) {
                throw new Error("Roupa não Existe");
            }

            await prismaClient.clothing.delete({
                where: { id: findClothing.id }
            });

            return { message: "Deletado com sucesso!" };
        } catch (error) {
            console.error("Erro ao deletar roupa:", error);
            throw new Error("Erro ao deletar roupa");
        }
    }
}

export default DeleteClothing;
