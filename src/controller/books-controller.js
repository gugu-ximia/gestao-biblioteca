import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function pegarTodosOsLivros(req, res) {
    try{
        const todosOsLIvros = await prisma.books.findMany();

        res.status(200).json({todosOsLIvros})
    }catch (error){
        res.status(500).json({error: "erro ao pegar todos os livros"})
    }
    
}

export async function pegarLivroPeloId(req, res) {
    const {id} = req.params;
    const idNumero = parseInt(id);

    if(isNaN(idNumero)) {
        return res.status(400).json({mensagen: "id invalido"})
    }

    try {
        const livro = await prisma.books.findUnique({
            where: {id: idNumero}
        })
        
        res.status(200).json(livro)

    }catch (error){
        res.status(500).json({error: "erro ao pegar livro"})
    }

}

export async function criarLivro(req, res) {
    const {title, author} = req.body;

    if(!title || !author){
        return res.status(400).json({mensagen: "title e author são obrigatorios"})
    }
    
    try {
        const novoLivro = await prisma.books.create({
            data: {
                title: title,
                author: author,
            },
        });
        return res.status(201).json({mensagen: "livro cadastrado com sucesso", novoLivro})
    } catch (error) {
        return res.status(500).json({mensagen: "erro ao criar um novo livro"})
        
    }
}

export async function atualizarLivros(req, res) {
    const {id} = req.params;
    const idNumero = parseInt(id);

    if(isNaN(idNumero)) {
        return res.status(400).json({mensagen: "id invalido"})
    }

    const {title, author, available} = req.body.PrismaClient

    try {
        const livroAtualizado = await prisma.books.update({
            where: {id: idNumero},
            data: {
                title,
                author,
                available,
            }
        })

        return res.status(204).json({mensagen: "livro atualizado com sucesso", livroAtualizado})
        
    } catch (error) {
        res.status(500).json({mensagen: "erro em atualizar o livro", error})
    }
}

export async function deletarLivro(req, res) {
    const {id} = req.params;
    const idNumero = parseInt(id);

    if(isNaN(idNumero)) {
        return res.status(400).json({mensagen: "id invalido"})
    }

    try {
        await prisma.books.delete({
            where: {id: idNumero}
        })

        res.status(200).json({mensagen: "livro deletado com sucesso"})
    } catch (error) {
        res.status(500).json({mensagen: "erro ao deletar livro"})
    }
}