import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FormException } from "./FormException";
import { Response } from "express";
@Catch(FormException)
export class FormExceptionFilter implements ExceptionFilter {
    catch(exception: FormException, host: ArgumentsHost) {
        const body ={
            message:exception.message,
            error:"Form is invalid"
        }
        const ctx= host.switchToHttp()
        const response = ctx.getResponse<Response>()
        response.status(HttpStatus.BAD_REQUEST).json(body)

    }

}