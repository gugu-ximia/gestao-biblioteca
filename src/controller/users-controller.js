import { PrismaClient } from "@prisma/client"; // IMPORTANDO OPRISMA CLIENT

const prisma = new PrismaClient()

export async function criaUsuario(req, res) {
    
    // O ASYNC E AWAIT E PARA DIZER QUE AS INFORMAÇÕES VÃO DEMORAR UM POUCO PARA CHEGAR
    console.log("cadastrando um usuario")

    const {username, password} = req.body

    // SE EU NÃO TIVER O NOME E NEM A SENHA
    if(!username || !password){
        res.status(400).json({mensagen:"usrername e password nescessarios"})
    }

    try{
        const newUser = await prisma.users.create({
        // VAI ADICIONAR OS VALORES NA TABELA Users
            data: {
                username: username,
                password: password,
            },

        })

        res.status(201).json({mensagen: "usuario criado com sucesso", id: newUser.id});
        
    }catch (error){
        res.status(500).json({mensagen: "Erro ao criar usuario", error})
    }

}