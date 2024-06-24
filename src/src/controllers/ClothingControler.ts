import { FastifyRequest, FastifyReply } from "fastify";
import ClothingService from "../models/ClothingService";

class ClothingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name, description, color, size, category, photoClothing, price } = request.body as {
                name: string,
                description: string,
                color: string,
                size: string, // alterei de number para string, se size é string
                category: string,
                photoClothing: string,
                price: number
            };

            const clothingService = new ClothingService();
            const clothing = await clothingService.execute({ name, description, color, size, category, photoClothing, price });

            reply.send(clothing);
        } catch (error) {
            reply.status(500).send({ error: "Erro ao criar roupa" });
        }
    }
}

export { ClothingController };
