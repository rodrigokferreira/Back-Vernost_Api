import { FastifyRequest, FastifyReply } from "fastify";
import GetUserService from "../../models/Users/GetUserService";
import { error } from "console";

class GetUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const getUserService = new GetUserService();

        try {
            const result = await getUserService.execute({ id });
            reply.send(result);
        } catch (err: any) {
            reply.status(500).send({ error: err.message });
        }
    }
}

export { GetUserController };
