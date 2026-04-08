import express from "express"
import cors from 'cors'

const app = express();
app.use(express());
app.use(cors());

const PORT = 3000;
app.listen(PORT , ()=> {
    console.log(`App listening on port: ${PORT}`)
})