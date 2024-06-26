import prismaClient from "../../prisma";

interface CreatePurchaseProps {
    userId: string;
    clothingId: string;
    quantity: number;
    total: number;
    statusPurchase: boolean;
    nameUser: string;
    nameClothing: string;
}

class CreatePurchaseService {
    async execute({ userId, clothingId, quantity, total, statusPurchase, nameUser, nameClothing }: CreatePurchaseProps) {
        try {
            // Verificar se userId e clothingId são IDs válidos do MongoDB (opcional)
            const validUser = await prismaClient.user.findUnique({ where: { id: userId } });
            if (!validUser) {
                throw new Error(`Usuário com ID ${userId} não encontrado.`);
            }

            const validClothing = await prismaClient.clothing.findUnique({ where: { id: clothingId } });
            if (!validClothing) {
                throw new Error(`Roupa com ID ${clothingId} não encontrada.`);
            }

            // Criar a compra no banco de dados
            const purchase = await prismaClient.purchase.create({
                data: {
                    userId,
                    clothingId,
                    quantity,
                    total,
                    statusPurchase,
                    nameUser,
                    nameClothing
                }
            });

            return purchase;
        } catch (error) {
            console.error('Erro ao criar compra:', error);
            throw new Error(`Erro ao criar compra: ${error}`);
        }
    }
}

export default CreatePurchaseService;
