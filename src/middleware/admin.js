export function verifyAdmin(req, res, next) {

    const user = req.user;

    if (!user.isAdmin) {
        return res.status(403).json({ message: "somente admins" });
    }

    next();
}
