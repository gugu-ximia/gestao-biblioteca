// Decodificar Basic Token (username:password)
// Buscar usuário no banco
// Retornar 401 se não autenticado

export async function verifyUser(req, res, next) {

    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Basic")) {
        return res.status(401).json({ message: "falha na autentificação" });
    }

    const token = auth.split(" ")[1];

    const decoded = Buffer.from(token, "base64").toString();

    const [username, password] = decoded.split(":");

    const user = await prisma.Users.findFirst({ where: { username } });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "falha na autentificação" });
    }

    req.user = user;
    
    next();
}
