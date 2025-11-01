import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function pegarTodosOsLivros(req, res) {
    try{
        const todosOsLIvros = await prisma.Books.findMany();

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
        const livro = await prisma.Books.findUnique({
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
        const novoLivro = await prisma.Books.create({
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

    const {title, author, available} = req.body

    try {
        const livroAtualizado = await prisma.Books.update({
            where: {id: idNumero},
            data: {
                title,
                author,
                available,
            }
        })

        return res.status(201).json({mensagen: "livro atualizado com sucesso", livroAtualizado})
        
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
        await prisma.Books.delete({
            where: {id: idNumero}
        })

        res.status(200).json({mensagen: "livro deletado com sucesso"})
    } catch (error) {
        res.status(500).json({mensagen: "erro ao deletar livro"})
    }
}

export async function pegarEmprestado(req, res) {
    const {id} = req.params;
    const idNumero = parseInt(id);

    if(isNaN(idNumero)) {
        return res.status(400).json({mensagen: "id invalido"})
    }

    try {
        const livro = await prisma.Books.findUnique({
            where: {id: idNumero}
        })

        if(livro === null) {
            return res.status(400).json({mensagem: "livro não encontrado"})
        } else {

        if(livro.available === false) {
            return res.status(400).json({mensagem: "livro esta indisponível no momento"})
        } else {
            await prisma.Books.update({
                where: { id: idNumero },
                data: { available: false }
            })

            res.status(201).json({mensagem: "livro emprestado com sucesso"})

        }
        
        }
    }catch (error){
        res.status(500).json({error: "erro ao pegar livro"})
    }
 
}

export async function devolverLivro(req, res) {
    const {id} = req.params;
    const idNumero = parseInt(id);

    if(isNaN(idNumero)) {
        return res.status(400).json({mensagen: "id invalido"})
    }

    try {
        const livro = await prisma.Books.findUnique({
            where: {id: idNumero}
        })

        if(livro === null) {
            return res.status(400).json({mensagem: "livro não encontrado"})
        } else {

        if(livro.available === true) {
            return res.status(400).json({mensagem: "O livro ja esta desponível"})
        } else {
            await prisma.Books.update({
                where: { id: idNumero },
                data: { available: true }
            })

            res.status(200).json({mensagem: "livro devolvido com sucesso"})

        }
        
        }
    }catch (error){
        res.status(500).json({error: "erro ao pegar livro"})
    }
 
}