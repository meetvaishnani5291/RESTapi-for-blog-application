
export class BadRequestException extends Error{
    statusCode: number = 400;
    constructor(message: string){
        super(message);
    }
}
export class UnauthorizedException extends Error{
    statusCode: number = 401;
    constructor(message: string){
        super(message);
    }
}
export class NotFoundExpception extends Error{
    statusCode: number = 404;
    constructor(message: string){
        super(message);
    }
}
