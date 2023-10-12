import * as config from '../config';

export const onError = (error: any ) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const code = error.code;
    const errorCodes = new Map([
        ['EACCES', 'requires elevated privileges'],
        ['EADDRINUSE', 'is already in use']
    ]);

    if (errorCodes.has(code)) {
        console.error(`Pipe ${config.PORT} ${errorCodes.get(code)}`);
        process.exit(1);
    } else {
        throw error;
    }
};
