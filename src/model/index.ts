export interface ErrorLogMessage {
    code: number;
    message: string;
}

export interface OptionSSL {
    key: Buffer;
    cert: Buffer;
}
