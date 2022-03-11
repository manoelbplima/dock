import { IMovimentoDTO } from "@adapters/IMovimentoDTO";
import { IDatabase } from "@providers/database/IDatabase";
import { IMovimentoRepository } from "@repositories/IMovimentoRepository";
import { Movimento, IMovimentoModel } from "../../../entities/MovimentoSchema" 

export class MongoDBMovimentoRepository implements IMovimentoRepository{
    constructor(
        private db: IDatabase
    ){
        db.open()
    }
    async findByConta(numero: String, agencia: String): Promise<IMovimentoDTO> {
        return await Movimento.findOne({ "numero": numero, "agencia": agencia });
    }
    async remove(cpf: String): Promise<boolean> {
        return await (await Movimento.deleteOne({ "cpf": cpf })).deletedCount > 0;
    }
    async save(data: IMovimentoDTO): Promise<IMovimentoDTO> {
        return await Movimento.create(data);
    }
    async findSaquesByConta(numero: String, agencia: String): Promise<number> {
        const limite = await Movimento.aggregate()
                                      .match({
                                          "tipo": "-"
                                      })
                                      .group({ 
                                          "_id" : 1 , 
                                          "valor": { 
                                              "$sum": "$valor"
                                           } 
                                      });
        
        if (limite == null)
            return 0;

        if (limite.length == 0)
            return 0;
        
        return limite[0].valor;
    }

    async extratoConta(numero: string, agencia: string, inicio: Date, fim: Date): Promise<IMovimentoDTO[]> {
        return await Movimento.find({ 
            "numero": numero,
            "agencia": agencia, 
            "data":{
                "$gte": inicio,
                "$lt": fim
            }
        });
    }
}