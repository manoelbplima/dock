import { IMovimentoDTO } from '@adapters/IMovimentoDTO';
import mongoose, { model, Schema, Model, Document } from 'mongoose'

export interface IMovimentoModel extends IMovimentoDTO, Document {
}

const MovimentoSchema: Schema = new Schema({
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
    tipo: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    descricao: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    valor: {
        type: Number,
    },
    data: {
        type: Date,
    }
})

var Movimento = model<IMovimentoModel>("Movimento", MovimentoSchema);

export { Movimento }