import prismaClient from "../prisma";

interface ClothingProps {
    name: string;
    description: string;
    color: string;
    size: string;
    category: string;
    photoClothing: string;
    price: number; // Adicionei o campo price
}

class ClothingService {
    async execute({ name, description, color, size, category, photoClothing, price }: ClothingProps) {
        if (!name || !description || !color || !size || !category || !photoClothing || price === undefined) {
            throw new Error("Erro ao pegar todos os dados");
        }

        const clothing = await prismaClient.clothing.create({
            data: {
                name,
                description,
                color,
                size,
                category,
                photoClothing,
                price 
            }
        });

        return clothing;
    }
}

export default ClothingService;
