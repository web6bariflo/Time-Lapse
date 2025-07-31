import express from 'express'
import connectDb from './utils/db.js';
import authRouter from './router/user-router.js';
import cors from 'cors'

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(cors())

//handle routing
app.use("/api/auth",authRouter)

connectDb()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
})
.catch((error)=>{
  console.log("Connection failed", error);
})


