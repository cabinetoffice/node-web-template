import * as config from '../config';

export const onListening = () => {
    console.log(`Listening on ${config.PORT}, from ${config.BASE_URL}`);
};
