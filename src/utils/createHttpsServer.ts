import { Express } from 'express';

import * as https from 'https';
import { readFileSync } from 'fs';
import * as config from '../config';

export const createHttpsServer = (app: Express) => {
    const options = {
        key: readFileSync(config.PATH_SSL_PRIVATE_KEY),
        cert: readFileSync(config.PATH_SSL_CERTIFICATE)
    };
    return https.createServer(options, app);
};
