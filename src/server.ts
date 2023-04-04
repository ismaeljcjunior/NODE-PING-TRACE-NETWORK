import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import nodeSchedule from 'node-schedule'
import pingman from 'pingman'
import { PrismaClient } from '@prisma/client'
import { getIps, readExcel, runPing } from './functions/runPing';

const app = express()
const port = process.env.PORT
const prisma = new PrismaClient()



const main = async () => {
    try {
        const ipHost = await getIps()
        await runPing(ipHost)
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}



const job = nodeSchedule.scheduleJob('0-59/5  * * * * *', () => {

    readExcel()

})

app.get('/', (_req: Request, res: Response) => {

    res.json({ msg: 'Hello World!' })
})
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})