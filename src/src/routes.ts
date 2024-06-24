import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controllers/UserControler"; // Verifique o nome do arquivo aqui
import { ClothingController } from "./controllers/ClothingControler";
import { DeleteClothingController } from "./controllers/DeleteClothingController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.post("/cadastro", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().handle(request, reply);
    });

    fastify.post("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ClothingController().handle(request, reply);
    })

    fastify.delete("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteClothingController().handle(request, reply);
    })
}
