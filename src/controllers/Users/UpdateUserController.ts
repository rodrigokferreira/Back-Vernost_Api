import { FastifyRequest, FastifyReply } from "fastify";
import UpdateUserService from "../../models/Users/UpdateUserService";

class UpdateUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.query as { id: string };
            const { fullName, username, email, photoUser, status } = request.body as {
                fullName: string,
                username: string,
                email: string,
                photoUser: string,
                status?: boolean
            };

            const updateUserService = new UpdateUserService();
            const update = await updateUserService.execute({ id, fullName, username, email, photoUser, status });

            reply.send(update);
        } catch (error) {
            console.error("O ERRO AQUI:", error); 
            reply.status(500).send({ error: "Erro ao atualizar usuário" });
        }
    }
}

export {UpdateUserController} 