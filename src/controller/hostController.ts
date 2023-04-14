import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import moment from 'moment'

const prisma = new PrismaClient()
const date = moment()
const dateFormat = date.format("HH:mm:ss DD/MM/YYYY ")

export const getAllData = async (req: Request, res: Response) => {
    try {
        const data = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host`)
        // console.log(data)
        res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({ response: e })
    }
}