import blogRoutes from "./routes/blog.routes.js"
import express from "express"
import cors from "cors"
import  {conectarDB}  from "./database/db.js"


const app= express()
app.use(express.json())
app.use(cors())

conectarDB()

app.use("/blogs",blogRoutes)
const PORT= process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("servidor iniciado en puerto: ",PORT)
})

