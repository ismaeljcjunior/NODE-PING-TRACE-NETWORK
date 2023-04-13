import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import nodeSchedule from 'node-schedule'
import pingman from 'pingman'
import { getIps, readExcel, runPing } from './functions/execFunc'

const app = express()
const port = process.env.PORT

const main = async () => {
    try {
        const ipHost = await getIps()
        await runPing(ipHost)
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}
const job = nodeSchedule.scheduleJob('0-59/30  * * * * *', () => {
    main()
})

app.get('/', (_req: Request, res: Response) => {

    res.json({ msg: 'Hello World!' })
})
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})