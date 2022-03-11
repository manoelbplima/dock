import { IPortadorDTO } from "@adapters/IPortadorDTO";
import { IDatabase } from "@providers/database/IDatabase";
import { IPortadorRepository } from "@repositories/IPortadorRepository";
import { Portador, IPortadorModel } from "../../../entities/PortadorSchema" 

export class MongoDBPortadorRepository implements IPortadorRepository{
    constructor(
        private db: IDatabase
    ){
        db.open()
    }
    async remove(cpf: String): Promise<boolean> {
        return await (await Portador.deleteOne({ "cpf": cpf })).deletedCount > 0;
    }

    async findByCpf(cpf: String): Promise<IPortadorDTO> {
        return await Portador.findOne({ "cpf": cpf });
    }
    async save(portador: IPortadorDTO): Promise<IPortadorDTO> {
        return await Portador.create({
            cpf: portador.cpf,
            name: portador.name,
          });
    }
}