import { PrismaClient } from "@prisma/client"; // IMPORTANDO OPRISMA CLIENT

const prisma = new PrismaClient()

export async function criaUsuario(req, res) {
    
    // O ASYNC E AWAIT E PARA DIZER QUE AS INFORMAÇÕES VÃO DEMORAR UM POUCO PARA CHEGAR
    console.log("cadastrando um usuario") 

    const {username, password} = req.body

    // SE EU NÃO TIVER O NOME E NEM A SENHA
    if(!username || !password){
        return res.status(400).json({mensagen:"usrername e password nescessarios"})
    }

    try{

        const adminExistente = await prisma.Users.findFirst({
            where: { isAdmin: true } 
        });

        const isAdmin = adminExistente ? false : true;

        const newUser = await prisma.Users.create({
            data: {
                username: username,
                password: password,
                isAdmin: isAdmin
            }
        });

        res.status(201).json({mensagen: "usuario criado com sucesso", id: newUser.id});
        
    }catch (error){
        res.status(500).json({mensagen: "Erro ao criar usuario", error})
    }

}