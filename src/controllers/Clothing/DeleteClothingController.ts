import { FastifyRequest, FastifyReply } from "fastify";
import DeleteClothing from "../../models/Clothing/DeleteClothing";

class DeleteClothingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const deleteClothing = new DeleteClothing();

        try {
            const result = await deleteClothing.execute({ id });
            reply.send(result);
        } catch (error: any) {
            reply.status(500).send({ error: error.message });
        }
    }
}

export { DeleteClothingController };
