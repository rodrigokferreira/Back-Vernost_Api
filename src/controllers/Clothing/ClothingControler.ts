import { FastifyRequest, FastifyReply } from "fastify";
import ClothingService from "../../models/Clothing/ClothingService";

class ClothingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name, description, color, size, category, photoClothing, price, quantity} = request.body as {
                name: string,
                description: string,
                color: string,
                size: string, 
                category: string,
                photoClothing: string,
                price: number,
                quantity: number
            };

            const clothingService = new ClothingService();
            const clothing = await clothingService.execute({ name, description, color, size, category, photoClothing, price, quantity });

            

            reply.send(clothing);
        } catch (error) {
            console.error("O ERRO AQUI:", error); // Adicione este log para verificar o erro específico
            reply.status(500).send({ error: "Erro ao criar roupa" });
        }
    }
}

export { ClothingController };
