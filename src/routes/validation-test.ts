import { Router } from 'express';

import { checkValidations } from '../middleware/validation.middleware';
import { validationTest } from '../validation/validation-test.validation';
import { get, post } from '../controller/validation-test.controller';

import * as config from '../config';

const validationTestRouter = Router();

validationTestRouter.get(config.VALIDATION_TEST_URL, get);
validationTestRouter.post(
    config.VALIDATION_TEST_URL,
    ...validationTest,
    checkValidations,
    post
);

export default validationTestRouter;
