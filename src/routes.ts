import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controllers/Users/UserControler";  // Verifique o nome do arquivo aqui
import { ClothingController } from "./controllers/Clothing/ClothingControler";
import { DeleteClothingController } from "./controllers/Clothing/DeleteClothingController";
import { UpdateClothingController } from "./controllers/Clothing/UpdateClothingController";
import { listUserController } from "./controllers/Users/ListUserController";
import { GetUserController } from "./controllers/Users/GetUserController";
import { UpdateUserController } from "./controllers/Users/UpdateUserController";
import { listClothingController } from "./controllers/Clothing/ListClothingController";
import { GetClothingController } from "./controllers/Clothing/GetClothingController";
import PurchaseController from "./controllers/Purchases/PurchaseController";
import { ListPurchaseController } from "./controllers/Purchases/ListPurchaseController";
import AuthController from "./controllers/Users/AuthController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    // Api para buscar todos os Usuarios
    fastify.get("/perfil", async (request: FastifyRequest, reply: FastifyReply) => {
        return new listUserController().handle(request, reply);
    });

    // Api para buscar todas as roupas
    fastify.get("/roupas", async (request: FastifyRequest, reply: FastifyReply) => {
        return new listClothingController().handle(request, reply);
    });

    //Api para buscar apenas um User
    fastify.get("/perfil/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request, reply);
    });

    //Api para buscar apenas uma roupa
    fastify.get("/roupas/get", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetClothingController().handle(request, reply);
    });

    //Api para listar compras
    fastify.get("/compras", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListPurchaseController().handle(request, reply);
    });

    //Api para atualizar perfil do usuario
    fastify.put("/perfil", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateUserController().handle(request, reply);
    })

    // Api para criar usuario e mandalo para o banco
    fastify.post("/cadastro", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UserController().handle(request, reply);
    });

    //Api para criar compras
    fastify.post("/compras", async (request: FastifyRequest, reply: FastifyReply) => {
        return new PurchaseController().handle(request, reply);
    });

    // Api para criar roupas
    fastify.post("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ClothingController().handle(request, reply);
    })

    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        return new AuthController().handle(request, reply);
    })

    // Api para deletar Roupa da tabela
    fastify.delete("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteClothingController().handle(request, reply);
    })

    // Api para Atualizar Roupa
    fastify.put("/administrador", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateClothingController().handle(request, reply);
    })
}
