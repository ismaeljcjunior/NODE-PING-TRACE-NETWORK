import pingman, { pingResponse, pingOptions } from 'pingman'
import { PrismaClient } from '@prisma/client'
import XLSX from 'xlsx'
import path from 'path'
import express, { Request, Response } from 'express'

const prisma = new PrismaClient()

export const runPing = async (listIp: any[]) => {
    const pingPromises = listIp.map(async (obj) => {
        const options: pingOptions = { logToFile: false, numberOfEchos: obj.QUANTIDADE_PING, timeout: 5, IPV4: true }
        const ip = obj.IP_GATEWAY_HOST
        try {
            const response: pingResponse = await pingman(ip, options)
            if (response.alive) {
                // console.log(response)
                updatePingGreen(obj, response)
            } else {
                console.log(response)
                updatePingRed(obj, response)
            }
        } catch (error) {
            console.log(`Error pinging ${ip}: ${error}`)
        }
    })
    await Promise.all(pingPromises)
}
export const getIps = async (): Promise<string[]> => {

    const listIp: any = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host;`)

    return listIp as string[]
}
export const readExcel = async () => {
    const workbook = XLSX.readFile(path.join(__dirname, 'utils', 'PORTARIAS.xlsx'))
    const sheet_name_list = workbook.SheetNames
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    xlData.forEach(async (obj: any) => {
        console.log(obj.GATEWAY)
        await prisma.$queryRawUnsafe(`INSERT INTO networktracker.host_equipment (NAME_EQUIPMENT, PRODUCER_EQUIPMENT, MODEL_EQUIPMENT, HANDLE_HABILITY, IP_EQUIPMENT, STATUS_EQUIPMENT, DT_EXECUTE, CSID_HOST) VALUES ('${obj.NOME}', 'TESTE', 'TESTE', 'HABILITADO', '${obj.GATEWAY}', 'LIVE', '2023-03-17 14:02:15.000', '3313');
         `)
    })
    console.log('terminou')
}
export const updatePingGreen = async (obj: any, response: any) => {
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET PERCA_DE_PACOTE = '${response.packetLoss}', STATUS_HOST = 'ON-LINE' WHERE (ID_HOST = '${obj.ID_HOST}');`)
}
export const updatePingRed = async (obj: any, response: any) => {
    let total: number = 0

    try {
       
        console.log('count',obj.CONTADOR_OFF)

        total = Number(obj.CONTADOR_OFF) + 1
        console.log('total', total)
        await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET PERCA_DE_PACOTE = '${response.packetLoss}', STATUS_HOST = 'OFF-LINE', CONTADOR_OFF = '${total}' WHERE (ID_HOST = '${obj.ID_HOST}');`)

    } catch (e) {
        console.log(e)
    }
}
export const createEvent = async (obj: any, response: any) => {

}
export const getAllData = async (req: Request, res: Response) => {
    try {
        const data = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host`)
        // console.log(data);

        res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({ response: e })

    }
}