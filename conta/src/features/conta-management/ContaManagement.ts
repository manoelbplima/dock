import { IContaDTO } from "src/adapter/IContaDTO";
import { IContaRepository } from "src/repositories/IContaRepository";
import { IPortadorRepository } from "src/repositories/IPortadorRepository";
import { cpf } from 'cpf-cnpj-validator'; 
import { InvalidCpf } from "./errors/InvalidCpf";
import { NotExistsCpf } from "./errors/NotExistsCpf";
import { HasClosed } from "./errors/HasClosed";
import { InvalidConta } from "./errors/InvalidConta";
import { InvalidValor } from "./errors/InvalidValor";
import { IMovimentoDTO } from "@adapters/IMovimentoDTO";
import { IMovimentoRepository } from "@repositories/IMovimentoRepository";
import { HasBlocked } from "./errors/HasBlocked";
import { InvalidData } from "./errors/InvalidData";
import moment from 'moment'

export class ContaManagement{
    
    constructor(
        private contaRepository: IContaRepository,
        private portadorRepository: IPortadorRepository,
        private movimentoRepository: IMovimentoRepository
    ){}
    
    async create(numeroCpf: string){
        if (!cpf.isValid(numeroCpf)){
            throw new InvalidCpf("CPF Portador inválido.");
        }

        const portadorAlreadyExists = await this.portadorRepository.findByCpf(numeroCpf);

        if (!portadorAlreadyExists){
            throw new NotExistsCpf("CPF Portador não existe.");
        }

        const data: IContaDTO = {
            cpf: portadorAlreadyExists.cpf,
            numero: (Math.floor( Math.random() * 999999 )).toString(),
            agencia: "0001",
            saldo: 0,
            fechada_em: null,
            bloqueada_em: null
        }

        return await this.contaRepository.save(data);
    }

    async consultaConta(numeroCpf: string){
        if (!cpf.isValid(numeroCpf)){
            throw new InvalidCpf("CPF Conta inválido.");
        }

        return await this.contaRepository.findByCpf(numeroCpf);
    }

    async encerrarConta(numeroCpf: string, numero: string, agencia: string): Promise<IContaDTO>{
        if (!cpf.isValid(numeroCpf)){
            throw new InvalidCpf("CPF Conta inválido.");
        }

        let conta:IContaDTO = await this.contaRepository.findByCpfConta(numeroCpf, numero, agencia)

        if (conta == null){
            throw new InvalidConta("Conta não existe ou não pertence ao portador.")
        }

        if (conta.fechada_em != null){
            throw new HasClosed("Conta já encerrada.")
        }

        conta.fechada_em = new Date()

        if (this.contaRepository.update(conta, { "_id": conta._id })){
            return conta;
        }
    }

    async toogleStatusConta(numeroCpf: string, numero: string, agencia: string, bloquear: boolean): Promise<IContaDTO>{
        if (!cpf.isValid(numeroCpf)){
            throw new InvalidCpf("CPF Conta inválido.");
        }

        let conta:IContaDTO = await this.contaRepository.findByCpfConta(numeroCpf, numero, agencia)

        if (conta == null){
            throw new InvalidConta("Conta não existe ou não pertence ao portador.")
        }

        if (conta.fechada_em != null){
            throw new HasClosed("Conta já encerrada.")
        }

        if (bloquear){
            if (conta.bloqueada_em != null){
                throw new HasBlocked("Conta já esta bloqueada.")
            }

            conta.bloqueada_em = new Date()
        }else{
            if (conta.bloqueada_em == null){
                throw new HasBlocked("Conta já esta desbloqueada.")
            }

            conta.bloqueada_em = null
        }

        if (this.contaRepository.update(conta, { "_id": conta._id })){
            return conta;
        }
    }

    async depositarConta(numero: string, agencia: string, valor: number): Promise<IMovimentoDTO>{
        if (valor <= 0){
            throw new InvalidValor("Valor para depósito deve ser maior que 0")
        }

        let conta:IContaDTO = await this.contaRepository.findByConta(numero, agencia)

        if (conta == null){
            throw new InvalidConta("Conta não existe.")
        } 

        if (conta.bloqueada_em != null){
            throw new HasBlocked("Conta esta bloqueada.")
        }

        if (conta.fechada_em != null){
            throw new HasClosed("Conta já encerrada.")
        }      

        const data: IMovimentoDTO = {
            cpf: conta.cpf,
            numero: conta.numero,
            agencia: conta.agencia,
            data: new Date(),
            descricao: "DEPOSITO",
            tipo: "+",
            valor: valor
        }
        
        const deposito = await this.movimentoRepository.save(data);

        if (data.tipo == "+")
            conta.saldo += deposito.valor;

        await this.contaRepository.update(conta, { "_id": conta._id })

        return deposito;
    }

    async saqueConta(numero: string, agencia: string, valor: number): Promise<IMovimentoDTO>{
        if (valor <= 0){
            throw new InvalidValor("Valor para depósito deve ser maior que 0")
        }
        
        let conta:IContaDTO = await this.contaRepository.findByConta(numero, agencia)

        if (conta == null){
            throw new InvalidConta("Conta não existe.")
        } 

        if (conta.bloqueada_em != null){
            throw new HasBlocked("Conta esta bloqueada.")
        }

        if (conta.fechada_em != null){
            throw new HasClosed("Conta já encerrada.")
        }      

        let consumoLimiteDiario = await this.movimentoRepository.findSaquesByConta(numero, agencia)

        if (consumoLimiteDiario > 2000){
            throw new InvalidValor("Valor solicitado ultrapassa o limite diário");
        }

        if ((consumoLimiteDiario+valor > 2000)){            
            throw new InvalidValor("Valor solicitado ultrapassa o limite diário");
        }

        if (valor > 2000){
            throw new InvalidValor("Valor solicitado ultrapassa o limite diário");
        }

        if ((conta.saldo - valor) < 0){
            throw new InvalidValor("Saldo indisponível")
        }

        const data: IMovimentoDTO = {
            cpf: conta.cpf,
            numero: conta.numero,
            agencia: conta.agencia,
            data: new Date(),
            descricao: "SAQUE",
            tipo: "-",
            valor: valor
        }
        
        const deposito = await this.movimentoRepository.save(data);

        if (data.tipo == "-")
            conta.saldo -= deposito.valor;

        await this.contaRepository.update(conta, { "_id": conta._id })

        return deposito;
    }

    async extratoConta(numero: string, agencia: string, inicio: string, fim: string): Promise<IMovimentoDTO[]>{
        const dateInicio =  new Date(inicio + 'T00:00:00.000Z')
        const dateFim = new Date(fim + 'T23:59:59.000Z')            
        const dateMInicio = moment(dateInicio)
        const dateMFim = moment(dateFim)
        const duration = moment.duration(dateMFim.diff(dateMInicio))
        const days = duration.asDays()

        if (!dateMInicio.isValid())
            throw new InvalidData("Data Inicio inválida, formato YYYY-MM-DD")
        
        if (!dateMFim.isValid())
            throw new InvalidData("Data Fim inválida, formato YYYY-MM-DD")
    
        if (dateInicio > dateFim)
            throw new InvalidData("Data Inicio não pode ser maior que Data Fim")
            
        if ( days > 60 ){
            throw new InvalidData("Período maximo do extrato é 60 dias")
        }

        return await this.movimentoRepository.extratoConta(numero, agencia, dateInicio, dateFim)
    }       
}