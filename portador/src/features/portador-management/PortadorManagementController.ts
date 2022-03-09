import { Request, Response } from "express";
import { PortadorManagement } from "./PortadorManagement";

export class PortadorManagementController{
    constructor(
        private portadorManagement: PortadorManagement
    ){}

    async handlePOST(request: Request, response: Response): Promise<Response> {
        const { cpf, name } = request.body;

        try{
            await this.portadorManagement.save({
                cpf,
                name
            })

            return response.status(201).send();
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }   

    async handleDELETE(request: Request, response: Response): Promise<Response> {
        const { cpf, name } = request.body;

        try{
            await this.portadorManagement.remove({
                cpf,
                name
            })

            return response.status(204).send();
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }   
}