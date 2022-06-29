/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {
    user?: string;
    addon?: string;
    platform?: string;
  }
}
