import prismaClient from "../../prisma";

class ListPurchaseService {
    async execute() {
        const purchase = await prismaClient.purchase.findMany();

        return purchase
    }
}

export {ListPurchaseService}