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
            // Verificar se já existe uma compra para este usuário e roupa
            let purchase = await prismaClient.purchase.findFirst({
                where: {
                    userId,
                    clothingId,
                },
            });

            if (purchase) {
                // Atualizar a compra existente
                purchase = await prismaClient.purchase.update({
                    where: { id: purchase.id },
                    data: {
                        quantity: purchase.quantity + quantity,
                        total: purchase.total + total,
                    },
                });
            } else {
                // Criar uma nova compra
                purchase = await prismaClient.purchase.create({
                    data: {
                        userId,
                        clothingId,
                        quantity,
                        total,
                        statusPurchase,
                        nameUser,
                        nameClothing,
                    },
                });
            }

            return purchase;
        } catch (error) {
            console.error('Erro ao criar ou atualizar compra:', error);
            throw new Error(`Erro ao criar ou atualizar compra: ${error}`);
        }
    }
}

export default CreatePurchaseService;
