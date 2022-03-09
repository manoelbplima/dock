import { IPortadorDTO } from "@adapters/IPortadorDTO";
import { IDatabase } from "@providers/database/IDatabase";
import { IPortadorRepository } from "@repositories/IPortadorRepository";

export class InMemoryPortadorRepository implements IPortadorRepository{
    private portadores: IPortadorDTO[] = [];

    constructor(
        private db: IDatabase
    ){}

    async remove(cpf: String): Promise<boolean> {
        let success = false

        this.portadores.forEach((element, index) => {
            if (element.cpf === cpf){
                this.portadores.splice(index, 1)
                success = true
            }
        });

        return success;
    }

    async findByCpf(cpf: String): Promise<IPortadorDTO> {
        const portador = this.portadores.find( x => x.cpf == cpf );

        return portador;
    }
    
    async save(data: IPortadorDTO): Promise<IPortadorDTO> {
        this.portadores.push(data);
        return data;
    }
}