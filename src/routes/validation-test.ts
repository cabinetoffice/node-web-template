import { Router } from 'express';

import { authentication } from '../middleware/authentication.middleware';
import { checkValidations } from '../middleware/validation.middleware';
import { validationTest } from '../validation/validation-test.validation';
import { get, post } from '../controller/validation-test.controller';

import * as config from '../config';

const validationTestRouter = Router();

validationTestRouter.get(config.VALIDATION_TEST_URL, authentication, get);
validationTestRouter.post(
    config.VALIDATION_TEST_URL,
    authentication,
    ...validationTest,
    checkValidations,
    post
);

export default validationTestRouter;
