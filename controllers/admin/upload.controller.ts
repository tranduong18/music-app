import { Request, Response } from "express";

// [POST] /admin/upload
export const index = async (req: Request, res: Response) => {
    res.json({
        location: req.body.file
    });
}