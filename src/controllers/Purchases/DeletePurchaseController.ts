// DeletePurchaseController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import DeletePurchase from "../../models/Purchases/DeletePurchase";

class DeletePurchaseController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const deletePurchase = new DeletePurchase();

        try {
            const result = await deletePurchase.execute({ id });
            reply.send(result);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    }
}

export { DeletePurchaseController };
