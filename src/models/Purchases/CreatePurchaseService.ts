import prismaClient from "../../prisma";

interface CreatePurchaseProps {
    userId: string;
    clothingId: string;
    quantity: number;
    price: number;
    nameClothing: string;
}

class CreatePurchaseService {
    async execute({ userId, clothingId, quantity, price, nameClothing }: CreatePurchaseProps) {
        try {
            // Verificar se já existe uma compra aberta para este usuário
            let purchase = await prismaClient.purchase.findFirst({
                where: {
                    userId,
                    statusPurchase: false, // Supondo que `statusPurchase: false` significa que a compra ainda está aberta
                },
                include: { clothingItems: true },
            });

            const total = quantity * price;

            if (purchase) {
                // Verificar se o item de roupa já está na compra
                const existingItem = purchase.clothingItems.find(item => item.clothingId === clothingId);

                if (existingItem) {
                    // Atualizar o item existente no array de itens
                    await prismaClient.clothingItem.update({
                        where: { id: existingItem.id },
                        data: {
                            quantity: existingItem.quantity + quantity,
                            price: existingItem.price + total,
                        },
                    });
                } else {
                    // Adicionar novo item ao array de itens
                    await prismaClient.clothingItem.create({
                        data: {
                            purchaseId: purchase.id,
                            clothingId,
                            nameClothing,
                            quantity,
                            price: total,
                        },
                    });
                }

                // Atualizar o total da compra
                purchase = await prismaClient.purchase.update({
                    where: { id: purchase.id },
                    data: {
                        total: purchase.total + total,
                    },
                    include: { clothingItems: true },
                });
            } else {
                // Criar uma nova compra com o primeiro item
                purchase = await prismaClient.purchase.create({
                    data: {
                        userId,
                        total,
                        statusPurchase: false,
                        clothingItems: {
                            create: [{
                                clothingId,
                                nameClothing,
                                quantity,
                                price: total,
                            }]
                        }
                    },
                    include: { clothingItems: true },
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
