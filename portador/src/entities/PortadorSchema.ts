import mongoose, { Document, Schema } from 'mongoose'

type Portador = Document & {}

const PortadorSchema = new Schema({
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

export default mongoose.model<Portador>('Portador', PortadorSchema)