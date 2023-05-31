import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getAllData } from '../controller/getHostController'


const app: Express = express()

app.use(bodyParser.json())
app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/alldataip', getAllData)

app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'NETWORK API TRACKER 1.0 IS RUNNING' })

})

export const appRoutes = app