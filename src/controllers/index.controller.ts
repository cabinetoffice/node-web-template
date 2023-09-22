import { Request, Response } from "express";

export const get = (req: Request, res: Response) => {
    return res.send("get request test");

};

export const post = (req: Request, res: Response) => {
    return res.send("post request test");
};
