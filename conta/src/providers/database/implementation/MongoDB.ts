import { IDatabase } from "../IDatabase"
import mongoose, { connect } from 'mongoose'

export class MongoDB implements IDatabase{

    async open(){
        await mongoose.connect('mongodb+srv://mbpl:B3OVW8pUetBeLWhU@cluster0.tipjd.mongodb.net/dock?retryWrites=true&w=majority');
    }

    async close() {
        await mongoose.connection.close()
    }
}