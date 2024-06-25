import { FastifyRequest, FastifyReply } from "fastify";
import { ListClothingService } from "../../models/Clothing/ListClothingService";

class listClothingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listClothingService = new ListClothingService()
        const clothing = await listClothingService.execute()
        reply.send(clothing)
    }
}

export {listClothingController}