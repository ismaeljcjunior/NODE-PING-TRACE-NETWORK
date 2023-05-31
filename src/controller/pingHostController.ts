import ping from 'ping'
import moment from 'moment'
import { PrismaClient } from '@prisma/client'
import { IHostPingProps, IHostProps } from '../interfaces/interfaces'

const date = moment()
const prisma = new PrismaClient()
let objectHost: IHostPingProps = {

    IP_HOST: '',
    NOME: '',
    DATE_OFF: '',
    DATE_ON: '',
    STATUS_OFF: '',
    STATUS_ON: '',
    COUNT_OFF: 10,
    COUNT_ON: 10,
    ERROR_CODE: '',
}
export const runPingMain = async () => {
    const dateFormat = date.format("HH:mm:ss:mm DD/MM/YYYY ")
    console.log('runPingMain:', dateFormat)
    let hostTest = '8.8.8.8'
    try {
        ping.sys.probe(hostTest, async function (isAlive) {
            if (isAlive) {
                console.log(`Ping host Test  ${hostTest} isAlive \n`)
                await runPing()
            } else {
                console.log('Ping isDead')
            }
        })
    } catch (e) {
        console.log('Error: ', e)
    }
}
export const runPing = async () => {
    try {
        const ipHost = await getIps()
        executePing(ipHost)
    } catch (e) {
        console.log(e)
    }
}
export const getIps = async (): Promise<IHostProps[]> => {
    const listIp: any = await prisma.$queryRawUnsafe(`SELECT * FROM networktracker.host`)
    return listIp as IHostProps[]
}
export const executePing = async (ipHost: IHostProps[]) => {
    console.log('executePing', ipHost.length)
    try {
        const pingPromises = ipHost.map((host) => {
            return new Promise((resolve, reject) => {
                if (host.IP_GATEWAY_HOST) {
                    ping.promise.probe(host.IP_GATEWAY_HOST)
                        .then((res) => {
                            // Atualiza o objeto objectHost com as informações relevantes
                            objectHost.IP_HOST = host.IP_GATEWAY_HOST
                            objectHost.NOME = host.NOME
                            // Outras atualizações necessárias
                            console.log(objectHost)
                            if (res.alive) {
                                console.log('ping live', res.inputHost);
                                resolve('ping alive')
                            } else {
                                console.log('ping dead', res.inputHost);
                                resolve('ping dead')
                            }
                        }).catch((error) => {
                            reject(error)
                        })
                } else {
                    resolve('IP_GATEWAY_HOST is undefined')
                }
            })
        })
        return Promise.all(pingPromises) // Aguarda todas as promessas serem resolvidas
    } catch (e) {
        console.log(e)
        return []
    }
}
