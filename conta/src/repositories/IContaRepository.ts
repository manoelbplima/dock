import { IContaDTO } from "src/adapter/IContaDTO";

export interface IContaRepository{
    save(data: IContaDTO): Promise<IContaDTO>;
    update(data: IContaDTO, conditions: any): Promise<boolean>;
    remove(cpf: String): Promise<boolean>;
    findByCpfConta(cpf: string, numero: string, agencia: string): Promise<IContaDTO>;
    findByConta(numero: string, agencia: string): Promise<IContaDTO>;
    findByCpf(cpf: String): Promise<IContaDTO[]>;
}