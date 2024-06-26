import { FastifyRequest, FastifyReply } from "fastify";
import UserService from "../../models/Users/UserService";

class UserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { fullName, username, email, password, cpf, status, photoUser } = request.body as { fullName: string, username: string, email: string, password: string, cpf: string, status: Boolean, photoUser?: string };

        const userService = new UserService();
        
        try {
            const user = await userService.execute({ fullName, username, email, password, cpf, status, photoUser });
            reply.send(user);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            reply.status(500).send({ error: "Erro ao criar usuário" });
        }
    }
}

export { UserController };
