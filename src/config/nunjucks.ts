import express from 'express';
import * as nunjucks from 'nunjucks';

import * as config from '../config';

export const configureNunjucks = (app: express.Application, viewsPath: string) => {
    console.log(`Set nunjucks configurations and where nunjucks templates should resolve to: ${viewsPath}`);

    const nunjucksEnv = nunjucks.configure(
        [viewsPath, 'node_modules/govuk-frontend', 'node_modules/govuk-frontend/components'],
        {
            autoescape: true,
            express: app
        }
    );

    nunjucksEnv.addGlobal('CDN_HOST', config.CDN_HOST);
    nunjucksEnv.addGlobal('SERVICE_URL', config.SERVICE_URL);
    nunjucksEnv.addGlobal('SERVICE_NAME', config.SERVICE_NAME);
};
