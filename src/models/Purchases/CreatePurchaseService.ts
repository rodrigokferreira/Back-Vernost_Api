import prismaClient from "../../prisma";

interface CreatePurchaseProps {
    userId: string;
    clothingId: string;
    quantity: number;
    total: number;
    statusPurchase: boolean;
}

class CreatePurchaseService {
    async execute({ userId, clothingId, quantity, total, statusPurchase }: CreatePurchaseProps) {
        try {
            const purchase = await prismaClient.purchase.create({
                data: {
                    userId,
                    clothingId,
                    quantity,
                    total,
                    statusPurchase
                }
            });

            return purchase;
        } catch (error) {
            // Handle specific Prisma validation errors or other errors
            throw new Error(`Erro ao criar compra: ${error}`);
        }
    }
}

export default CreatePurchaseService;
