import { Router } from "express";
import { pegarTodosOsLivros, pegarLivroPeloId, criarLivro, deletarLivro, atualizarLivros } from "../controller/books-controller.js"
const router = Router()

router.get("/", (req, res) => {
    pegarTodosOsLivros(req, res)
})

router.get("/:id", (req, res) => {
    pegarLivroPeloId(req, res)
})

router.post("/", (req, res) => {
    criarLivro(req, res)
})

router.delete("/:id", (req,res) => {
    deletarLivro(req, res)
})

router.patch("/:id", (req, res) => {
    atualizarLivros(req,res)
})

export default router