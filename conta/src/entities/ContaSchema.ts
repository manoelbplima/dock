import { IContaDTO } from '@adapters/IContaDTO';
import mongoose, { model, Schema, Model, Document } from 'mongoose'

export interface IContaModel extends Omit<IContaDTO, '_id'>, Document {
}

const ContaSchema: Schema = new Schema({
    cpf: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    numero: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    agencia: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    saldo: {
        type: Number,
    },
    fechada_em: {
        type: Date,
    },
    bloqueada_em: {
        type: Date,
    }
})

var Conta = model<IContaModel>("Conta", ContaSchema);

export { Conta }