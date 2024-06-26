import { FastifyRequest, FastifyReply } from 'fastify';
import prismaClient from '../../prisma';
import CreatePurchaseService from '../../models/Purchases/CreatePurchaseService';

class PurchaseController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { userId, clothingId, quantity } = request.body as { userId: string; clothingId: string; quantity: number };

        try {
            // Verificar se userId e clothingId são IDs válidos do MongoDB
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

            // Calcular o total com base no preço do item
            const total = clothing.price * quantity;
            const statusPurchase = true; // ou outro valor baseado na lógica de negócio

            // Criar serviço de criação de compra e executar
            const createPurchaseService = new CreatePurchaseService();
            const purchase = await createPurchaseService.execute({
                userId: user.id,            // Passar o ID válido do usuário
                clothingId: clothing.id,    // Passar o ID válido da roupa
                quantity,
                total,
                statusPurchase,
                nameUser: user.fullName,   // Nome completo do usuário
                nameClothing: clothing.name // Nome da roupa
            });

            //Atualizar Estoque
            const updatedClothing = await prismaClient.clothing.update({
                where: { id: clothing.id },
                data: {
                    quantity: clothing.quantity - quantity  // Diminuir a quantidade comprada do estoque atual
                }
            });

            return reply.status(201).send(purchase);
        } catch (error) {
            console.error('Erro ao criar compra:', error);
            return reply.status(500).send({ error: 'Erro ao criar compra' });
        }
    }
}

export default PurchaseController;
