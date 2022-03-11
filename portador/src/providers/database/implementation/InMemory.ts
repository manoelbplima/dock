import { IDatabase } from "../IDatabase";

export class InMemory implements IDatabase{
    connect() {
        throw new Error("Method not implemented.");
    }
    disconnect() {
        throw new Error("Method not implemented.");
    }
}