import prismaClient from "../prisma";

interface ClothingProps {
    name: string;
    description: string;
    color: string;
    size: string;
    category: string;
    photoClothing: string;
    price: number;
    quantity: number;
}

class ClothingService {
    async execute({ name, description, color, size, category, photoClothing, price, quantity }: ClothingProps) {
        try {
            const clothing = await prismaClient.clothing.create({
                data: {
                    name,
                    description,
                    color,
                    size,
                    category,
                    photoClothing,
                    price,
                    quantity,
                }
            });

            return clothing;
        } catch (error) {
            // Handle specific Prisma validation errors or other errors
            throw new Error(`Erro ao criar roupa: ${error}`);
        }
    }
}

export default ClothingService;
