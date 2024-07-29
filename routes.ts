/**
 * An array of routes that are accessible to the public
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/",
  "/auth/new-verification",
];

/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";

export const DEFAULT_LOGOUT_REDIRECT: string = "/";