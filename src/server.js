import express from "express" // IMPORTANDO O EXPRESS
import authRouter from "./routes/Auth.js"
import booksRouter from "./routes/Books.js" 

const app = express(); 
app.use(express.json())

app.use("/auth", authRouter)

app.use("/books", booksRouter)


app.listen(3000);