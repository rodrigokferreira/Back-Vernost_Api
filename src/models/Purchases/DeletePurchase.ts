// DeletePurchase.ts
import prismaClient from "../../prisma";

interface DeletePurchaseProps {
    id: string;
}

class DeletePurchase {
    async execute({ id }: DeletePurchaseProps) {
        if (!id) {
            throw new Error("Solicitação Inválida");
        }

        try {
            const findPurchase = await prismaClient.purchase.findFirst({
                where: { id }
            });

            if (!findPurchase) {
                throw new Error("Compra não encontrada");
            }

            await prismaClient.purchase.delete({
                where: { id: findPurchase.id }
            });

            return { message: "Compra deletada com sucesso!" };
        } catch (error) {
            console.error("Erro ao deletar compra:", error);
            throw new Error("Erro ao deletar compra");
        }
    }
}

export default DeletePurchase;
