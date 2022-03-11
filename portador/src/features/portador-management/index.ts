import { MongoDB } from "../../providers/database/implementation/MongoDB";
import { MongoDBPortadorRepository } from "../../repositories/implementation/mongodb/MongoDBPortadorRepository";
import { PortadorManagement } from "./PortadorManagement";
import { PortadorManagementController } from "./PortadorManagementController";

const db = new MongoDB()
const portadorRepository = new MongoDBPortadorRepository(db)
const portadorManagement = new PortadorManagement(portadorRepository) 
const portadorManagementController = new PortadorManagementController(portadorManagement);

export { portadorManagementController, portadorRepository, portadorManagement }