import { IPortadorDTO } from "@adapters/IPortadorDTO";
import { Portador } from "@entities/Portador";
import { IDatabase } from "@providers/database/IDatabase";
import { IPortadorRepository } from "@repositories/IPortadorRepository";

export class MongoDBPortadorRepository implements IPortadorRepository{
    constructor(
        private db: IDatabase
    ){}

    findByCpf(cpf: String): Promise<IPortadorDTO> {
        throw new Error("Method not implemented.");
    }
    save(portador: IPortadorDTO): Promise<IPortadorDTO> {
        throw new Error("Method not implemented.");
    }
}