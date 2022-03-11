import { Request, Response } from "express";
import { ContaManagement } from "./ContaManagement";

export class ContaManagementController{
    constructor(
        private contaManagement: ContaManagement
    ){}

    async handlePostAbrir(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.body;

        try{
            await this.contaManagement.create(cpf)

            return response.status(201).send();
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }   

    async handleGetConsulta(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        try{
            const contas = await this.contaManagement.consultaConta(cpf)

            if (contas.length == 0)
                return response.status(404)

            return response.status(200).json(contas)
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }
    
    async handlePutEncerrar(request: Request, response: Response): Promise<Response> {
        const { cpf, numero, agencia } = request.body;

        try{
            const contas = await this.contaManagement.encerrarConta(cpf, numero, agencia)

            return response.status(200).json(contas)
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }

    async handlePutBloquear(request: Request, response: Response): Promise<Response> {
        const { cpf, numero, agencia } = request.body;

        try{
            const contas = await this.contaManagement.toogleStatusConta(cpf, numero, agencia, true)

            return response.status(200).json(contas)
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }

    async handlePutDesbloquear(request: Request, response: Response): Promise<Response> {
        const { cpf, numero, agencia } = request.body;

        try{
            const contas = await this.contaManagement.toogleStatusConta(cpf, numero, agencia, false)

            return response.status(200).json(contas)
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }

    async handlePostDepositar(request: Request, response: Response): Promise<Response> {
        const { numero, agencia, valor } = request.body;

        try{
            const contas = await this.contaManagement.depositarConta(numero, agencia, valor)

            return response.status(201).json(contas)
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }

    async handlePostSaque(request: Request, response: Response): Promise<Response> {
        const { numero, agencia, valor } = request.body;

        try{
            const contas = await this.contaManagement.saqueConta(numero, agencia, valor)

            return response.status(201).json(contas)
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }

    async handleGetExtratoPeriodo(request: Request, response: Response): Promise<Response> {
        const { inicio, fim, numero, agencia } = request.params;

        try{
            const extrato = await this.contaManagement.extratoConta(numero, agencia, inicio, fim)

            return response.status(200).json(extrato)
        }catch (err){
            return response.status(400).json({
                message: err.message || 'Unexpected error'
            });
        }
    }
}