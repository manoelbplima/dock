import { IMovimentoDTO } from "src/adapter/IMovimentoDTO";

export interface IMovimentoRepository{
    save(data: IMovimentoDTO): Promise<IMovimentoDTO>;
    remove(cpf: String): Promise<boolean>;
    findSaquesByConta(numero: String, agencia: String): Promise<number>;
    findByConta(numero: String, agencia: String): Promise<IMovimentoDTO>;
    extratoConta(numero: string, agencia: string, inicio: Date, fim: Date): Promise<IMovimentoDTO[]>;
}