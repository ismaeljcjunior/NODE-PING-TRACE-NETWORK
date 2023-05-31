import dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express'
import nodeSchedule from 'node-schedule'
import { appRoutes } from './routes/routes'
import { runPingMain } from './controller/pingHostController'
import moment from 'moment'

const app: Express = express()
const port = process.env.PORT
const date = moment()
app.use(appRoutes)

const main = async () => {
    const dateFormat = date.format("HH:mm:ss:mm DD/MM/YYYY ")
    try {
        console.log('Run main:', dateFormat)
        await runPingMain()
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}
const job = nodeSchedule.scheduleJob('0-59/15 * * * * *', () => {
    main()
})
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})