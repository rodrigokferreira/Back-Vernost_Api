import { FastifyRequest, FastifyReply } from "fastify";
import AuthService from "../../models/Users/AuthService";

class AuthController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as { email: string; password: string };

        const authService = new AuthService();

        try {
            const { token, user } = await authService.execute({ email, password });
            reply.send({ token, user });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            reply.status(401).send({ error: "Credenciais inválidas" });
        }
    }
}

export default AuthController;
