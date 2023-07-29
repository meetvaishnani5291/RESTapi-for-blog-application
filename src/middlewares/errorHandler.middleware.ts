import { BadRequestException, NotFoundExpception, UnauthorizedException } from "../errors/customErrors";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { NextFunction, Response } from "express";
import logger from "../logger/winstonLogger";

const errorHandler =async (err : any, req : CustomRequest, res : Response , next : NextFunction) => {
    let statusCode = 500;
    if(
        err instanceof BadRequestException
        || err instanceof UnauthorizedException
        || err instanceof NotFoundExpception
    ) {
        statusCode = err.statusCode;
        logger.info(err);
    }else{
        logger.error(err);
    }
    res.status(statusCode).json({ message : err.message });
}

export default errorHandler;