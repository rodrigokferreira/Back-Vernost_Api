import prismaClient from "../../prisma";

interface ListUserPurchasesProps {
    userId: string;
}

class ListUserPurchasesService {
    async execute({ userId }: ListUserPurchasesProps) {
        try {
            // Certifique-se de que userId seja um valor válido no formato esperado pelo Prisma
            const purchases = await prismaClient.purchase.findMany({
                where: { userId }, // Aqui userId deve ser passado como um valor válido
                include: {
                    clothing: true,
                },
            });

            if (!purchases.length) {
                throw new Error(`Nenhuma compra encontrada para o usuário com ID ${userId}.`);
            }

            return purchases;
        } catch (error) {
            console.error('Erro ao listar compras do usuário:', error);
            throw new Error(`Erro ao listar compras do usuário: ${error}`);
        }
    }
}

export default ListUserPurchasesService;
