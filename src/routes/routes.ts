import express, { Express, Request, Response } from 'express'
// import { createUser, deleteUser, getUsers, updateUser } from '../controller/usuarioController'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getAllData } from '../functions/execFunc'


const app: Express = express()


app.use(bodyParser.json())
app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/alldataip', getAllData)

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running 1.0')

})

export const appRoutes = app