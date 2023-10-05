export const PORT = process.env["PORT"] || "3000";
export const BASE_URL = process.env["BASE_URL"] || `http://localhost:${PORT}`;
export const CDN_HOST = process.env["CDN_HOST"] || "d6nh3dxv55e16.cloudfront.net";

export const SERVICE_NAME = "Node Prototype";

// Template
export const LANDING_PAGE = "info";
export const NOT_FOUND = "error";

// Routing paths
export const LANDING_URL = "/info";

export const INFO_URL = "/info";
export const HEALTHCHECK_URL = "/healthcheck";
export const SERVICE_URL = `${BASE_URL}${LANDING_URL}`;
