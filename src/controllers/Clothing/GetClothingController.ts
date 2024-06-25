import { FastifyRequest, FastifyReply } from "fastify";
import GetClothingService from "../../models/Clothing/GetClothingService";

class GetClothingController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {id} = request.query as {id: string}
        const getClothingService = new GetClothingService()

        try {
            const result = await getClothingService.execute({id})
            reply.send(result);
        }   catch(err: any) {
            reply.send(500).send({ error: err.message });
        }
    }
}

export {GetClothingController}