import express from "express" // IMPORTANDO O EXPRESS
import authRouter from "./routes/auth.js"
import booksRouter from "./routes/books.js"

const app = express(); 
app.use(express.json())

app.use("/auth", authRouter)

app.use("/books", booksRouter)


app.listen(3000);