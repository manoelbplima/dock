import { IPortadorDTO } from "src/adapter/IPortadorDTO";
import { IPortadorRepository } from "src/repositories/IPortadorRepository";
import { cpf } from 'cpf-cnpj-validator'; 
import { DuplicateCpf } from "./errors/DuplicateCpf";
import { InvalidCpf } from "./errors/InvalidCpf";
import { NotExistsCpf } from "./errors/NotExistsCpf";

export class PortadorManagement{
    
    constructor(
        private portadorRepository: IPortadorRepository
    ){}
    
    async save(data: IPortadorDTO){
        if (!cpf.isValid(data.cpf)){
            throw new InvalidCpf("CPF portador inválido.");
        }

        const portadorAlreadyExists = await this.portadorRepository.findByCpf(data.cpf);

        if (portadorAlreadyExists){
            throw new DuplicateCpf("CPF Portador já cadastrado.");
        }

        return await this.portadorRepository.save(data);
    }

    async remove(data: IPortadorDTO){
        if (!cpf.isValid(data.cpf)){
            throw new InvalidCpf("CPF portador inválido.");
        }

        const portadorAlreadyExists = await this.portadorRepository.findByCpf(data.cpf);

        if (!portadorAlreadyExists){
            throw new NotExistsCpf("CPF Portador não existe.");
        }

        return await this.portadorRepository.remove(data.cpf);
    }
}