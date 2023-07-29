import {  Response, NextFunction } from 'express';
import { CustomRequest } from '../interfaces/customRequest.interface';

// List of public routes
const publicRoutes = ['/users/login', '/users/register']; 

const publicRoutesMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const isPublicRoute = publicRoutes.includes(req.path);
  req.isPublicRoute = isPublicRoute;
  next();
};

export default publicRoutesMiddleware;
