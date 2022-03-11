import { ObjectId } from 'mongoose'

export interface IContaDTO {
    _id?: string;
    cpf: string;
    numero: string;
    agencia: string;
    saldo: number;
    fechada_em: Date;
    bloqueada_em: Date;
}