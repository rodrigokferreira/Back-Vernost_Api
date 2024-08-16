import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from '../../prisma';
import CreatePurchaseService from '../../models/Purchases/CreatePurchaseService';

class PurchaseController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { userId, clothingId, quantity } = request.body as { userId: string; clothingId: string; quantity: number };

        try {
            const user = await prismaClient.user.findUnique({ where: { id: userId } });
            if (!user) {
                console.log(`Usuário com ID ${userId} não encontrado.`);
                return reply.status(404).send({ error: 'User not found' });
            }

            const clothing = await prismaClient.clothing.findUnique({ where: { id: clothingId } });
            if (!clothing) {
                console.log(`Roupa com ID ${clothingId} não encontrada.`);
                return reply.status(404).send({ error: 'Clothing not found' });
            }

            const price = clothing.price;
            const createPurchaseService = new CreatePurchaseService();
            const purchase = await createPurchaseService.execute({
                userId: user.id,
                clothingId: clothing.id,
                quantity,
                price,
                nameClothing: clothing.name,
            });

            // Atualizar Estoque
            await prismaClient.clothing.update({
                where: { id: clothing.id },
                data: {
                    quantity: clothing.quantity - quantity,
                },
            });

            return reply.status(201).send(purchase);
        } catch (error) {
            console.error('Erro ao criar compra:', error);
            return reply.status(500).send({ error: 'Erro ao criar compra' });
        }
    }
}

export default PurchaseController;
