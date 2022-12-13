import express from "express"

const app = express()

app.get('/', (request, response)=>{
    return response.status(200).json({
        name: 'teste'
    })
})

app.listen(3000, ()=>{console.log("Server running at http://localhost:3000");
})