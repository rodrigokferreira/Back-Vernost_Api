import prismaClient from "../../prisma";

class ListClothingService {
    async execute() {
        const clothing = await prismaClient.clothing.findMany();

        return clothing
    }
}

export { ListClothingService}