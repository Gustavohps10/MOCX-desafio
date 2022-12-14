import express from "express"
import { PrismaClient } from "@prisma/client"
 
const app = express()
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

app.listen(3000, ()=>{console.log("Server running at http://localhost:3000");
})