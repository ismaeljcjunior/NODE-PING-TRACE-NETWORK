export interface IHostProps {
    ID_HOST?: number,
    CONTA?: string,
    NOME?: string,
    ID_EMPRESA?: string,
    IP_GATEWAY_HOST?: string,
    DESCRICAO_HOST?: string,
    ZONA_HOST?: string,
    PARTICAO_HOST?: string,
    QUANTIDADE_PING?: number,
    PERCA_DE_PACOTE?: string,
    STATUS_HOST?: string,
    STATUS_INICIAL_EVENTO?: string,
    STATUS_ENVIO_EVENTO?: string,
    DT_UPTIME?: any,
    DT_DOWNTIME?: any,
    DT_DIF_TIME_UP?: any,
    DT_DIF_TIME_DOWN?: any,
    CONTADOR_ON?: number,
    CONTADOR_OFF?: number,
    DT_EXECUCAO?: any,
    DT_CRIACAO?: any
    ip?: string
}