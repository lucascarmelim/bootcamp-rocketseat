import { Request, Response, NextFunction } from 'express'

export default function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
): void {
  //Validação do token
}