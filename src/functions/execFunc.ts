import pingman, { pingResponse, pingOptions } from 'pingman'
import { PrismaClient } from '@prisma/client'
import XLSX from 'xlsx'
import path from 'path'
import express, { Request, Response } from 'express'

const prisma = new PrismaClient()

export const runPing = async (listIp: any[]) => {
    const ips = listIp.map((obj) => obj.IP_GATEWAY_HOST)
    const pingPromises = listIp.map(async (obj) => {
        const options: pingOptions = { logToFile: false, numberOfEchos: obj.QUANTIDADE_PERCA, timeout: 5, IPV4: true }
        const ip = obj.IP_GATEWAY_HOST
        try {
            const response: pingResponse = await pingman(ip, options)
            //console.log(`Ping to ${ip}: ${response.output}`)
            if (response.alive) {
                // fazer algo se o ping for bem sucedido
                updatePingGreen(obj)

            } else {
                updatePinGRed(obj)

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
export const updatePingGreen = async (obj: any) => {
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET STATUS_HOST = 'ALIVE' WHERE (ID_HOST = '${obj.ID_HOST}');`)
}
export const updatePinGRed = async (obj: any) => {
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET STATUS_HOST = 'DEAD' WHERE (ID_HOST = '${obj.ID_HOST}');`)
}
export const getAllData = async (req: Request, res: Response) => {
    try {
        const data = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host`)
        console.log(data);

        res.status(200).json({ data: data })
    } catch (e) {
        return res.status(404).json({ response: e })

    }
}