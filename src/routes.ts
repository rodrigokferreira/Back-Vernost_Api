import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controllers/UserControler"; // Verifique o nome do arquivo aqui
import { ClothingController } from "./controllers/ClothingControler";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste1", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true };
    });

    fastify.post("/cadastro", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().handle(request, reply);
    });

    fastify.post("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ClothingController().handle(request, reply);
    })
}
