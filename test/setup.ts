export default () => {
    process.env.CDN_HOST = 'test';
    process.env.HUMAN = 'true';
    process.env.LOG_LEVEL = 'info';
    process.env.COOKIE_PARSER_SECRET = 'secret';
    process.env.COOKIE_SESSION_SECRET = 'secret';
    process.env.COOKIE_ID_NAME = 'secret';
    process.env.USER_POOL_ID = 'secret';
    process.env.USER_POOL_CLIENT_ID = 'secret';
    process.env.COOKIE_ID_NAME = 'test';
    process.env.AUTH_SIGN_IN_URL = 'test';
    process.env.SESSION_ID_NAME = 'test';
    process.env.SESSION_APP_KEY = 'test';
    process.env.TEST_KEY = 'test';
    process.env.UNSANITISED_TEST_KEY = '   test      ';
};
