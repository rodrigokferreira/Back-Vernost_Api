import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../../models/Users/ListUserService";

class listUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listUserController = new ListUserService()
        const user = await listUserController.execute()
        reply.send(user)
    }
}

export {listUserController}