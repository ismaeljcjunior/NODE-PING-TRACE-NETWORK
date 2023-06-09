
export interface IHostProps {
    ID_HOST?: number,
    CONTA?: string,
    NOME?: string,
    ID_EMPRESA?: string,
    IP_GATEWAY_HOST?: string,
    DESCRICAO_HOST?: string,
    ZONA_HOST?: string,
    PARTICAO_HOST?: string,
    QUANTIDADE_PING?: string,
    PERCA_DE_PACOTE?: number,
    STATUS_HOST?: string,
    STATUS_INICIAL_EVENTO?: string,
    STATUS_ENVIO_EVENTO?: string,
    DT_UPTIME?: Date,
    DT_DOWTIME?: Date,
    DT_DIF_TIME_UP?: string,
    DT_DIF_TIME_DOWN?: string,
    CONTADOR_ON?: Number,
    CONTADOR_OFF?: Number,
    DT_EXECUCAO?: Date,
    DT_CRIACAO?: Date,
    DATA_EVENTO?: Date,
    VALORATUAL?: Number,
    VALORANTERIOR?: Number



}
export interface IHostPingProps {
    IP_HOST?: string|undefined;
    NOME?: string,
    DATE_OFF?: String,
    DATE_ON?: String,
    STATUS_OFF?: String,
    STATUS_ON?: String,
    ERROR_CODE?: String,
    COUNT_OFF?: number,
    COUNT_ON?: number
}