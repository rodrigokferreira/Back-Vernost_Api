import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from '../../prisma';
import CreatePurchaseService from '../../models/Purchases/CreatePurchaseService';

class PurchaseController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { userId, clothingId, quantity } = request.body as { userId: string; clothingId: string; quantity: number };

        // Calcular o total com base no preço do item
        const clothing = await prismaClient.clothing.findUnique({ where: { id: clothingId } });
        if (!clothing) {
            return reply.status(404).send({ error: 'Clothing not found' });
        }

        const total = clothing.price * quantity;
        const statusPurchase = true; // ou outro valor baseado na lógica de negócio

        const createPurchaseService = new CreatePurchaseService();
        const purchase = await createPurchaseService.execute({
            userId,
            clothingId,
            quantity,
            total,
            statusPurchase
        });

        return reply.status(201).send(purchase);
    }
}

export default PurchaseController;
