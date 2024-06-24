import { FastifyRequest, FastifyReply } from "fastify";
import UserService from "../../models/Users/UserService";

class UserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { fullName, username, email, password, cpf, status, photouser } = request.body as { fullName: string, username: string, email: string, password: string, cpf: string, status: Boolean, photouser: string };

        const userService = new UserService();
        const user = await userService.execute({ fullName, username, email, password, cpf, status, photouser });
        console.log(user);

        reply.send(user);
    }
}

export { UserController };
