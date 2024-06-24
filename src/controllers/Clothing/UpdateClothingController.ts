import { FastifyRequest, FastifyReply } from "fastify";
import UpdateClothingService from "../../models/Clothing/UpdateClothingService";

class UpdateClothingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.query as { id: string };
            const { name, description, color, size, category, photoClothing, price, quantity } = request.body as {
                name: string,
                description: string,
                color: string,
                size: string,
                category: string,
                photoClothing: string,
                price: number,
                quantity: number
            };

            const updateClothingService = new UpdateClothingService();
            const update = await updateClothingService.execute({ id, name, description, color, size, category, photoClothing, price, quantity });
            
            reply.send(update);

        } catch (error) {
            reply.status(500).send({ error: "Erro ao atualizar roupa" });
        }
    }
}

export { UpdateClothingController };
