import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controllers/Users/UserControler";  // Verifique o nome do arquivo aqui
import { ClothingController } from "./controllers/Clothing/ClothingControler";
import { DeleteClothingController } from "./controllers/Clothing/DeleteClothingController";
import { UpdateClothingController } from "./controllers/Clothing/UpdateClothingController";
import { listUserController } from "./controllers/Users/ListUserController";
import { GetUserController } from "./controllers/Users/GetUserController";
import { UpdateUserController } from "./controllers/Users/UpdateUserController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get("/perfil", async (request: FastifyRequest, reply: FastifyReply) => {
        return new listUserController().handle(request, reply);
    });

    fastify.get("/perfil/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request, reply);
    });

    fastify.put("/perfil", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateUserController().handle(request, reply);
    })

    fastify.post("/cadastro", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().handle(request, reply);
    });

    fastify.post("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ClothingController().handle(request, reply);
    })

    fastify.delete("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteClothingController().handle(request, reply);
    })

    fastify.put("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateClothingController().handle(request, reply);
    })
}
