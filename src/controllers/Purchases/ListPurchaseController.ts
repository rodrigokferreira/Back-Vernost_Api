import { FastifyRequest, FastifyReply } from "fastify";
import { ListPurchaseService } from "../../models/Purchases/ListPurchaseService";

class ListPurchaseController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listPurchaseService = new ListPurchaseService()
        const purchase = await listPurchaseService.execute()
        reply.send(purchase)
    }
}

export {ListPurchaseController}