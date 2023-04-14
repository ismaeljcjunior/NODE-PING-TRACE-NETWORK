import pingman, { pingResponse, pingOptions } from 'pingman'
import { PrismaClient } from '@prisma/client'
import XLSX from 'xlsx'
import path from 'path'
import express, { Request, Response } from 'express'
import moment from 'moment'

const prisma = new PrismaClient()
const date = moment()
const dateFormat = date.format("HH:mm:ss DD/MM/YYYY ")

export const runPing = async (listIp: any[]) => {
    const pingPromises = listIp.map(async (obj) => {
        const options: pingOptions = { logToFile: false, numberOfEchos: obj.QUANTIDADE_PING, timeout: 5, IPV4: true }
        const ip = obj.IP_GATEWAY_HOST
        try {
            const response: pingResponse = await pingman(ip, options)
            if (response.alive) {

                updatePingUp(obj, response)
            } else {

                updatePingDown(obj, response)
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
export const updatePingUp = async (obj: any, response: any) => {
    console.log('PING IP:', response.numericHost, '- DATA', dateFormat, '- PERDA DE PACOTE', response.packetLoss, '- STATUS', response.alive)
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET PERCA_DE_PACOTE = '${response.packetLoss}', STATUS_HOST = 'ON-LINE', DT_UPTIME = IFNULL(DT_UPTIME, NOW()), DT_EXECUCAO = NOW(), CONTADOR_OFF = 0 WHERE ID_HOST = '${obj.ID_HOST}';`)
}
export const updatePingDown = async (obj: any, response: any) => {
    let total: number = 0
    console.log('PING IP:', response.numericHost, '- DATA', dateFormat, '- PERDA DE PACOTE', response.packetLoss, '- STATUS', response.alive)
    try {
        total = Number(obj.CONTADOR_OFF) + 1
        await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET PERCA_DE_PACOTE = '${response.packetLoss}', STATUS_HOST = 'OFF-LINE', CONTADOR_OFF = '${total}', DT_EXECUCAO = NOW(), DT_UPTIME = NULL, DT_DOWTIME = IFNULL(DT_DOWTIME, NOW())  WHERE (ID_HOST = '${obj.ID_HOST}');`)
    } catch (e) {
        console.log(e)
    }
}
export const getDateDiffUp = async (obj: any, response: any) => {
    try {
        const resultHost = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host WHERE ID_HOST = '${obj.ID_HOST}`)
        
    } catch (e) {

    }
}
export const getDateDiffDown = async (obj: any, response: any) => {
    try {

    } catch (e) {

    }
}
export const createEvent = async (obj: any, response: any) => {

}
