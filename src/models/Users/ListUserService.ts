import prismaClient from "../../prisma";

class ListUserService {
    async execute() {
        const user = await prismaClient.user.findMany();

        return user
    }
}

export {ListUserService}