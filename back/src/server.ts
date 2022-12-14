import express, { json } from "express"
import { PrismaClient } from "@prisma/client"
 
const app = express()
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

app.post('/users', async (request, response) => {
    const body = request.body

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                cpf: body.cpf,
                birthDate: body.birthDate
            }
        })

        return response.status(201).json(user)
    } catch (error) {
        return response.status(500).json({
            error: "Ocorreu um erro, tente novamente"
        })
    }
    
})

app.put('/users/:id',async (request, response) => {
    const id = request.params.id
    const body = request.body

    try {
        const updatedUser = await prisma.user.update({
            where: {
              id: id,
            },
            data: {
              name: body.name,
              birthDate: body.birthDate
            },
        })
        return response.status(200).json(updatedUser)
    } catch (error) {
        return response.status(500).json({
            error: "Ocorreu um erro, tente novamente"
        })
    }    
})

app.listen(3000, ()=>{console.log("Server running at http://localhost:3000");
})