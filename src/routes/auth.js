import { Router } from "express";
import { criaUsuario } from "../controller/users-controller.js";

const router = Router();

router.post("/register", (req, res) => {
    criaUsuario(req, res)
})

export default router;