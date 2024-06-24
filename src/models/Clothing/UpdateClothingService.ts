import prismaClient from "../../prisma";

interface UpdateClothingProps {
    id: string; // ID da roupa a ser atualizada
    name?: string;
    description?: string;
    color?: string;
    size?: string;
    category?: string;
    photoClothing?: string;
    price?: number;
    quantity?: number;
}

class UpdateClothingService {
    async execute({ id, name, description, color, size, category, photoClothing, price, quantity }: UpdateClothingProps) {
        try {
            const clothing = await prismaClient.clothing.update({
                where: { id },
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
            throw new Error(`Erro ao atualizar roupa: ${error}`);
        }
    }
}

export default UpdateClothingService;
