import { IPortadorDTO } from '@adapters/IPortadorDTO';
import mongoose, { model, Schema, Model, Document } from 'mongoose'

export interface IPortadorModel extends IPortadorDTO, Document {
}

const PortadorSchema: Schema = new Schema({
    cpf: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
    }
})

var Portador = model<IPortadorModel>("Portador", PortadorSchema);

export { Portador }