import * as config from '../config';
import { log } from './logger';

export const onListening = () => {
    log.info(`Listening on ${config.PORT}, from ${config.BASE_URL}`);
};
