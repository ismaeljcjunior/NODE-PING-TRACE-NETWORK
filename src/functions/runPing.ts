import pingman, { pingResponse, pingOptions } from 'pingman'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// export const runPing2 = async (listIp: string[]) => {
//     const options: pingOptions = { logToFile: true, numberOfEchos: 6, timeout: 2, IPV4: true };

//     const promises = listIp.map(async (ip: string) => {
//         try {
//             const result = await pingman(ip)
//             console.log(`Ping to ${ip}: ${result.output}`)
//         } catch (err) {
//             console.log(`Error pinging ${ip}: ${err}`)
//         }
//     })

//     await Promise.all(promises)
// }
export const runPing = async (listIp: string[]) => {
    const options: pingOptions = { logToFile: true, numberOfEchos: 10, timeout: 2, IPV4: true };

    const promises = listIp.map(async (ip: string) => {
        try {
            const response: pingResponse = await pingman(ip, options);
            // console.log(`Ping to ${ip}: ${response.output}`);
            if (response.alive) {
                updatePingGreen(ip)
            } else {
                updatePingRed(ip)

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
    const ipHost: any = await prisma.$queryRawUnsafe(`SELECT IP_EQUIPMENT FROM networktracker.host_equipment`)
    for (let i = 0; i < ipHost.length; i++) {
        let aux = ipHost[i].IP_EQUIPMENT.toString()
        listIp.push(aux)
    }
    return listIp as string[]
}

export const updatePingRed = async (ip: any) => {
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host_equipment SET STATUS_EQUIPMENT = 'OFF' WHERE (IP_EQUIPMENT = '${ip}')`)
}
export const updatePingGreen = async (ip: any) => {
    await prisma.$queryRawUnsafe(`UPDATE networktracker.host_equipment SET STATUS_EQUIPMENT = 'LIVE' WHERE (IP_EQUIPMENT = '${ip}')`)
}