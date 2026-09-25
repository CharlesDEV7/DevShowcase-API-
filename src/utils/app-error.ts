export class AppError extends Error { constructor(public statusCode:number, public error:string, message:string){super(message)} }
