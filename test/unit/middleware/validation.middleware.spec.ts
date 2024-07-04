jest.mock('express-validator');
jest.mock('../../../src/utils/logger');
jest.mock('../../../src/utils/validateFilepath.ts');

import {
    describe,
    expect,
    test,
    jest,
    afterEach,
    beforeEach,
} from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import * as config from '../../../src/config';

import { checkValidations } from '../../../src/middleware/validation.middleware';
import { ErrorMessages } from '../../../src/validation/error.messages';
import { MOCK_ERROR, MOCK_POST_VALIDATION_TEST } from '../../mock/data';
import { log } from '../../../src/utils/logger';

const validationResultMock = validationResult as unknown as jest.Mock;
const logInfoMock = log.info as jest.Mock;
const logErrorMock = log.error as jest.Mock;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn() as any;
    return res;
};
const mockRequest = () => {
    const req = {} as Request;
    req.path = config.VALIDATION_TEST_URL;
    req.body = MOCK_POST_VALIDATION_TEST;
    return req;
};
const next = jest.fn() as NextFunction;

describe('Validation Middleware test suites', () => {
    let res: any, req: any;

    beforeEach(() => {
        res = mockResponse();
        req = mockRequest();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Should call next if errorList is empty', () => {
        validationResultMock.mockImplementationOnce(() => {
            return { isEmpty: () => true };
        });
        checkValidations(req, res, next);

        expect(logInfoMock).toBeCalledTimes(0);
        expect(logErrorMock).toBeCalledTimes(0);
        expect(next).toHaveBeenCalledTimes(1);
    });

    test(`should call res.render with ${config.VALIDATION_TEST} view if errorList is not empty`, () => {
        const fieldKey = 'first_name';
        validationResultMock.mockImplementationOnce(() => {
            return {
                isEmpty: () => false,
                array: () => [{ path: fieldKey, msg: ErrorMessages.TEST_FIRST_NAME }],
            };
        });
        req.body[fieldKey] = '';
        checkValidations(req, res, next);

        expect(logInfoMock).toHaveBeenCalledTimes(1);
        expect(logInfoMock).toHaveBeenCalledWith(
            `Validation error on ${config.VALIDATION_TEST} page`
        );
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.VALIDATION_TEST, {
            ...req.body,
            errors: {
                errorList: [{ href: `#${fieldKey}`, text: ErrorMessages.TEST_FIRST_NAME }],
                [fieldKey]: { text: ErrorMessages.TEST_FIRST_NAME },
            },
        });
    });

    test('should catch the error log error message and call next(err)', () => {
        validationResultMock.mockImplementationOnce(() => {
            throw new Error(MOCK_ERROR.message);
        });
        checkValidations(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(logErrorMock).toHaveBeenCalledTimes(1);
        expect(logErrorMock).toHaveBeenCalledWith(MOCK_ERROR.message);
    });
});
// jest.mock('express-validator');
// jest.mock('../../../src/utils/validateFilepath.ts');
// jest.mock('../../../src/utils/logger');

// import {
//     describe,
//     expect,
//     test,
//     jest,
//     afterEach,
//     beforeEach,
// } from '@jest/globals';
// import { Request } from 'express';
// import { validationResult } from 'express-validator';

// import * as config from '../../../src/config';
// import { validateFilepath } from '../../../src/utils/validateFilepath';
// import { mockLogInfo, mockLogErrorRequest } from '../../mock/log.mock';
// import { checkValidations } from '../../../src/middleware/validation.middleware';
// import { ErrorMessages } from '../../../src/validation/error.messages';
// import { MOCK_ERROR, MOCK_POST_INFO } from '../../mock/data';
// import { mockNext, mockResponse } from '../../mock/express.mock';
// import { mockID } from '../../mock/session.mock';

// const validationResultMock = validationResult as unknown as jest.Mock;
// const validateFilepathMock = validateFilepath as jest.Mock<
// 	typeof validateFilepath
// >;

// const mockRequest = () => {
//     const req = {} as Request;
//     req.path = config.INFO_URL;
//     req.body = MOCK_POST_INFO;
//     req.params = { [config.ID]: mockID };
//     return req;
// };

// describe('Validation Middleware test suites', () => {
//     let res: any, req: any;
//     beforeEach(() => {
//         res = mockResponse();
//         req = mockRequest();
//     });

//     afterEach(() => {
//         jest.resetAllMocks();
//     });

//     test('Should call next if errorList is empty', () => {
//         validationResultMock.mockImplementationOnce(() => {
//             return { isEmpty: () => true };
//         });
//         checkValidations(req, res, mockNext);

//         expect(mockLogInfo).toBeCalledTimes(0);
//         expect(mockLogErrorRequest).toBeCalledTimes(0);
//         expect(mockNext).toHaveBeenCalledTimes(1);
//     });

//     test(`should call res.render with ${config.LANDING_PAGE} view if errorList is not empty and id empty`, () => {
//         const fieldKey = 'test';
//         validationResultMock.mockImplementationOnce(() => {
//             return {
//                 isEmpty: () => false,
//                 array: () => [{ path: fieldKey, msg: ErrorMessages.TEST_INFO_ERROR }],
//             };
//         });
//         validateFilepathMock.mockImplementationOnce(() => config.INFO_URL);
//         req.body[fieldKey] = '';
//         req.params[config.ID] = '';
//         checkValidations(req, res, mockNext);

//         expect(mockLogInfo).toHaveBeenCalledTimes(1);
//         expect(mockLogInfo).toHaveBeenCalledWith(
//             `Validation error on ${config.LANDING_PAGE} page` // need to specify page
//         );

//         expect(res.render).toHaveBeenCalledTimes(1);
//         expect(res.render).toHaveBeenCalledWith(config.LANDING_PAGE, {
//             ...req.body,
//             [config.ID]: '',
//             errors: {
//                 errorList: [
//                     { href: `#${fieldKey}`, text: ErrorMessages.TEST_INFO_ERROR },
//                 ],
//                 [fieldKey]: { text: ErrorMessages.TEST_INFO_ERROR },
//             },
//         });
//     });

//     test('should catch the error log error message and call next(err)', () => {
//         validationResultMock.mockImplementationOnce(() => {
//             throw new Error(MOCK_ERROR.message);
//         });
//         checkValidations(req, res, mockNext);

//         expect(mockNext).toHaveBeenCalledTimes(1);
//         expect(mockLogErrorRequest).toHaveBeenCalledTimes(1);
//         expect(mockLogErrorRequest).toHaveBeenCalledWith(req, MOCK_ERROR.message);
//     });
// });
