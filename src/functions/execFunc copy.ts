import pingman, { pingResponse, pingOptions } from 'pingman'
import { PrismaClient } from '@prisma/client'
import XLSX from 'xlsx'
import path from 'path'
import moment from 'moment'
import { IHostProps } from '../interfaces/interfaces'
import uuid from 'uuid'

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

    const listIp: any = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host`)

    return listIp as string[]
}
export const readExcel = async () => {
    const workbook = XLSX.readFile(path.join(__dirname, 'utils', 'PORTARIAS.xlsx'))
    const sheet_name_list = workbook.SheetNames
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

    xlData.forEach(async (obj: any) => {
        console.log(obj.GATEWAY)
        await prisma.$queryRawUnsafe(`INSERT INTO networktracker.host_equipment (NAME_EQUIPMENT, PRODUCER_EQUIPMENT, MODEL_EQUIPMENT, HANDLE_HABILITY, IP_EQUIPMENT, STATUS_EQUIPMENT, DT_EXECUTE, CSID_HOST) VALUES ('${obj.NOME}', 'TESTE', 'TESTE', 'HABILITADO', '${obj.GATEWAY}', 'LIVE', '2023-03-17 14:02:15.000', '3313')
         `)
    })
    console.log('terminou')
}
export const updatePingUp = async (obj: any, response: any) => {
    try {
        let total: number = 0
        total = Number(obj.CONTADOR_ON) + 1
        // console.log('PING IP UP:', response.numericHost, '- DATA', dateFormat, '- PERDA DE PACOTE', response.packetLoss, '- STATUS', response.alive)
        await updateDateDiffUp(obj, response)
        await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET PERCA_DE_PACOTE = '${response.packetLoss}', CONTADOR_ON = '${total}', STATUS_HOST = 'ON-LINE', DT_UPTIME = IFNULL(DT_UPTIME, NOW()), DT_EXECUCAO = NOW(), CONTADOR_OFF = 0 WHERE ID_HOST = '${obj.ID_HOST}'`)

    } catch (e) {
        console.log(e.message)
    }
}
export const updatePingDown = async (obj: any, response: any) => {
    try {
        let total: number = 0
        total = Number(obj.CONTADOR_OFF) + 1
        // console.log('PING IP DOWN:', response.numericHost, '- DATA', dateFormat, '- PERDA DE PACOTE', response.packetLoss, '- STATUS', response.alive)
        await updateDateDiffDown(obj, response)
        await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET PERCA_DE_PACOTE = '${response.packetLoss}', STATUS_HOST = 'OFF-LINE', CONTADOR_OFF = '${total}', DT_EXECUCAO = NOW(), DT_UPTIME = NULL, DT_DOWNTIME = IFNULL(DT_DOWNTIME, NOW())  WHERE (ID_HOST = '${obj.ID_HOST}')`)

    } catch (e) {
        console.log(e)
    }
}
export const updateDateDiffUp = async (obj: any, response: any) => {
    try {
        const resultHost: any = await prisma.$queryRawUnsafe(`SELECT ID_HOST, TIME_FORMAT(TIMEDIFF( DT_EXECUCAO, DT_UPTIME), '%H:%i:%s') AS DATE_DIFF FROM host WHERE (ID_HOST = '${obj.ID_HOST}')`)
        await prisma.$queryRawUnsafe(`UPDATE networktracker.host SET DT_DIF_TIME_UP = '${resultHost[0].DATE_DIFF}', DT_DOWNTIME = NULL, DT_DIF_TIME_DOWN = NULL WHERE (ID_HOST = '${resultHost[0].ID_HOST}')`)
        //await createEvent(obj, response)
    } catch (e) {
        console.log('getDateDiffUp', e.message)
    }
}
export const updateDateDiffDown = async (obj: any, response: any) => {
    try {
        const resultHost: any = await prisma.$queryRawUnsafe(`SELECT ID_HOST, TIME_FORMAT(TIMEDIFF( DT_EXECUCAO, DT_DOWNTIME), '%H:%i:%s') AS DATE_DIFF FROM host WHERE (ID_HOST = '${obj.ID_HOST}')`)
        await prisma.$queryRawUnsafe(`UPDATE host SET STATUS_INICIAL_EVENTO = 'INICIADO', DT_DIF_TIME_DOWN = '${resultHost[0].DATE_DIFF}', DT_DIF_TIME_UP = NULL, DT_UPTIME = NULL WHERE (ID_HOST = '${resultHost[0].ID_HOST}')`)
        checkTimeDOWN(obj)
        //await createEvent(obj, response)
    } catch (e) {
        console.log('getDateDiffUp', e.message)
    }
}
export const checkTimeDOWN = async (obj: any) => {
    try {
        const resultTime: any = await prisma.$queryRawUnsafe(`SELECT TIMESTAMPDIFF(MINUTE, DT_DOWNTIME, DT_EXECUCAO) AS DIFF_MINUTES FROM networktracker.host WHERE (ID_HOST = '${obj.ID_HOST}'); `);

        // if (Number(resultTime[0].DIFF_MINUTES) >= 10) {
        //     await prisma.$queryRawUnsafe(`UPDATE host SET STATUS_INICIAL_EVENTO = 'INICIADO' WHERE (ID_HOST = '${obj.ID_HOST}')`)
        // }
        checkForCreateEventDown(obj)
    } catch (e) {
        console.log('checkTimeDOWN', e.message)
    }
}
export const checkForCreateEventDown = async (obj: any) => {
    try {
        const resultDiff: any = await prisma.$queryRawUnsafe(`SELECT TIMESTAMPDIFF(MINUTE, DT_DOWNTIME, DT_EXECUCAO) AS DIFF_MINUTES FROM networktracker.host WHERE (ID_HOST = '${obj.ID_HOST}'); `)
        const result: IHostProps = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host WHERE (ID_HOST = '${obj.ID_HOST}');`)

        console.log('------------>', Number(resultDiff[0].DIFF_MINUTES))
        if (result[0].STATUS_HOST == 'OFF-LINE' && result[0].STATUS_INICIAL_EVENTO == 'INICIADO' && Number(resultDiff[0].DIFF_MINUTES) >= 20) {
            console.log('MAIOR QUE 20 ');

            await prisma.$queryRawUnsafe(`UPDATE host SET STATUS_ENVIO_EVENTO = 'CRIADO' WHERE (ID_HOST = '${obj.ID_HOST}')`)
        }
    } catch (e) {
        console.log('checkForCreateEvent', e.message)
    }
}
export const createEventDown = async (obj: any) => {
    const uuidv4 = uuid.v4()
    const hash = uuidv4.substr(0, 10)
    
    const error = 'E358'
    const nameError = 'FALHA DE COMUNICACAO'
    try {
        await prisma.$queryRawUnsafe(`INSERT INTO event_host (CONTA_EVENTO, DESCRICAO_HOST, NOME_EVENTO, CODIGO_EVENTO, ID_EMPRESA_EVENTO, IP_GATEWAY_HOST_EVENTO, ZONA_HOST_EVENTO, PARTICAO_HOST_EVENTO)  VALUES ('${obj.CONTA}, '${obj.NOME}','${nameError}','${error}''${obj.ID_EMPRESA}, '${obj.IP_GATEWAY_HOST}','${obj.ZONA_HOST}','${obj.PARTICAO_HOST_EVENTO}')`)
    } catch (e) {

    }
}