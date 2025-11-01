import { Router } from "express";
import { pegarTodosOsLivros, pegarLivroPeloId, criarLivro, deletarLivro, atualizarLivros, pegarEmprestado, devolverLivro } from "../controller/books-controller.js"
import { verifyUser } from "./middleware/auth.js"
import { verifyAdmin } from "./middleware/admin.js"

const router = Router()

router.get("/", verifyUser, (req, res) => {
    pegarTodosOsLivros(req, res)
})

router.get("/:id", verifyUser, (req, res) => {
    pegarLivroPeloId(req, res)
})

router.post("/", verifyUser, verifyAdmin, (req, res) => {
    criarLivro(req, res)
})

router.delete("/:id", verifyUser, verifyAdmin, (req,res) => {
    deletarLivro(req, res)
})

router.patch("/:id", verifyUser, verifyAdmin, (req, res) => {
    atualizarLivros(req,res)
})


router.post("/:id/borrow", verifyUser, (req, res) => {
    pegarEmprestado(req, res)
})

router.post("/:id/return", verifyUser, (req, res) => {
    devolverLivro(req, res)
})

export default router