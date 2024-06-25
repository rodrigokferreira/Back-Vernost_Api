import { FastifyRequest, FastifyReply } from "fastify";
import { ListUserService } from "../../models/Users/ListUserService";

class listUserController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listUserService = new ListUserService()
        const user = await listUserService.execute()
        reply.send(user)
    }
}

export {listUserController}