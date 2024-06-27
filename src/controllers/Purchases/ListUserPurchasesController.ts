import { FastifyRequest, FastifyReply } from 'fastify';
import ListUserPurchasesService from '../../models/Purchases/ListUserPurchasesService';

class ListUserPurchasesController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.params as { userId: string };

        const listUserPurchasesService = new ListUserPurchasesService();
        
        try {
            const purchases = await listUserPurchasesService.execute({ userId });
            return reply.send(purchases);
        } catch (error) {
            console.error('Erro ao listar compras do usuário:', error);
            return reply.status(500).send({ error: 'Erro ao listar compras do usuário' });
        }
    }
}

export default ListUserPurchasesController;
