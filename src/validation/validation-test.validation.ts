import { body } from 'express-validator';

import { ErrorMessages } from './error.messages';

export const validationTest = [
    body('first_name')
        .not()
        .isEmpty({ ignore_whitespace: true })
        .withMessage(ErrorMessages.TEST_FIRST_NAME),
    body('description')
        .isLength({ max: 1000 })
        .withMessage(ErrorMessages.TEST_DESCRIPTION_LENGTH),
];
