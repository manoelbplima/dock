import { IPortadorDTO } from "src/adapter/IPortadorDTO";

export interface IPortadorRepository{
    findByCpf(cpf: String): Promise<IPortadorDTO>;
    save(data: IPortadorDTO): Promise<IPortadorDTO>;
    remove(cpf: String): Promise<boolean>;
}