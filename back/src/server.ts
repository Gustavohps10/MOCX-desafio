import express, { json } from "express"
import { PrismaClient, Prisma } from "@prisma/client"
import { cpf as cpfValidator} from "cpf-cnpj-validator"
import cors from "cors"
 
const app = express()
app.use(cors())
app.use(json())

const prisma = new PrismaClient({
    log: ['error']
})

app.get('/users', async (request, response) => {

    try {
        const users = await prisma.user.findMany()
        return response.status(200).json(users)
    } catch (error) {
        return response.status(200).json(error)
    }
})

app.get('/users/:id', async (request, response) => {
    const id = request.params.id

    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id
            }
        })
        return response.status(200).json(user)
    } catch (error: any) {
        if(error.code == "P2025"){
            return response.status(400).json({
                error: "Usuário inexistente"
            })
        }

        if(error.code == "P2023"){
            return response.status(400).json({
                error: "Id de usuário inválido"
            })
        }

        return response.status(500).json({
            error: "Ocorreu um erro inesperado"
        })
        
    }
})

app.post('/users', async (request, response) => {
    const body = request.body
    const name = body.name.trim()
    const cpf = body.cpf.trim()
    const birthDate = body.birthDate.trim()

    try {
        if(!name || !cpf || !birthDate){
            throw new Error("Preencha todos os campos");
        }

        if(!cpfValidator.isValid(cpf)){
            throw new Error("CPF inválido");   
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                cpf: cpf.replace(/\D/g,''),
                birthDate: birthDate
            }
        })

        return response.status(201).json(user)
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              return response.status(409).json({
                error: 'Já existe um usuário com esse CPF'
              })
            }
        }

        return response.status(500).json({
            error: error.message
        })
    }
    
})

app.put('/users/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    const name = body.name.trim()
    const birthDate = body.birthDate.trim()

    try {
        if(!name || !birthDate){
            throw new Error("Preencha todos os campos");
        }

        const updatedUser = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              name: name,
              birthDate: birthDate
            },
        })
        return response.status(200).json(updatedUser)
    } catch (error: any) {
        return response.status(500).json({
            error: error.message
        })
    }    
})

app.delete('/users/:id', async (request, response) => {
    const id = request.params.id

    try {
        await prisma.user.delete({
            where: {
                id: id
            }
        })

        return response.status(204).json()
    } catch (error) {
        return response.status(500).json({
            error: "Ocorreu um erro, tente novamente"
        })
    }
})

app.listen(3000, ()=>{console.log("Server running at http://localhost:3000");
})