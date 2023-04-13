import pingman, { pingResponse, pingOptions } from 'pingman'
import { PrismaClient } from '@prisma/client'
import XLSX from 'xlsx'
import path from 'path'

const prisma = new PrismaClient()

export const runPing = async (listIp: string[]) => {
    
    const options: pingOptions = { logToFile: true, numberOfEchos: 10, timeout: 2, IPV4: true };

    const promises = listIp.map(async (ip: string) => {
        try {
            const response: pingResponse = await pingman(ip, options);
            // console.log(`Ping to ${ip}: ${response.output}`);
            if (response.alive) {
                // updatePingGreen(ip)
            } else {
                // updatePingRed(ip)

                console.log(response)
            }
        } catch (error) {
            console.log(`Error pinging ${ip}: ${error}`);
            //=> 'Internal server error ...'
        }
    })

    await Promise.all(promises)
}
export const getIps = async (): Promise<string[]> => {
    const listIp: any = [];
    const ipHost: any = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host;`)
    for (let i = 0; i < ipHost.length; i++) {
        let aux = ipHost[i].IP_EQUIPMENT.toString()
        listIp.push(aux)
    }
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
export const updatePingRed = async (ip: any) => {
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host_equipment SET STATUS_EQUIPMENT = 'OFF' WHERE (IP_EQUIPMENT = '${ip}')`)
}
export const updatePingGreen = async (ip: any) => {
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host_equipment SET STATUS_EQUIPMENT = 'LIVE' WHERE (IP_EQUIPMENT = '${ip}')`)
}