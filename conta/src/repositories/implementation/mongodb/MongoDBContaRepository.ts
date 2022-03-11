import { IContaDTO } from "@adapters/IContaDTO";
import { IDatabase } from "@providers/database/IDatabase";
import { IContaRepository } from "@repositories/IContaRepository";
import { Conta } from "../../../entities/ContaSchema" 

export class MongoDBContaRepository implements IContaRepository{
    constructor(
        private db: IDatabase
    ){
        db.open()
    }
    async remove(cpf: String): Promise<boolean> {
        return await (await Conta.deleteOne({ "cpf": cpf })).deletedCount > 0;
    }

    async findByCpf(cpf: String): Promise<IContaDTO[]> {
        return await Conta.find({ "cpf": cpf });
    }
    async save(data: IContaDTO): Promise<IContaDTO> {
        return await Conta.create(data);
    }
    async findByCpfConta(cpf: string, numero: string, agencia: string): Promise<IContaDTO> {
        return await Conta.findOne({ "cpf": cpf, "numero": numero, "agencia": agencia });
    }
    async findByConta(numero: string, agencia: string): Promise<IContaDTO> {
        return await Conta.findOne({ "numero": numero, "agencia": agencia });
    }
    async update(data: IContaDTO, conditions: any): Promise<boolean> {
        return await (await Conta.updateOne(conditions, data)).modifiedCount > 0;
    }
}