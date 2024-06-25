import prismaClient from "../../prisma";

interface GetClothingProps {
    id: string
}

class GetClothingService {
    async execute({id}: GetClothingProps) {
        if(!id) {
            throw new Error("Solicitação Inválida");
        }
        try {
            const getClothing = await prismaClient.clothing.findFirst({
                where: {id},
            });

            if(!getClothing) {
                throw new Error("Clothing not found");
            }

            return {message: "Clothing Resgatado com sucesso", clothing: getClothing}
        } catch (error) {
            throw new Error(`Erro ao buscar roupa: ${error}`);
        }
    } 
}

export default GetClothingService;