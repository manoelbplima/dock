//import { MongoDB } from "../../providers/database/implementation/MongoDB";
//import { MongoDBPortadorRepository } from "../../repositories/implementation/mongodb/MongoDBPortadorRepository";

import { InMemory } from "../../providers/database/implementation/InMemory";
import { InMemoryPortadorRepository } from "../../repositories/implementation/inmemory/InMemoryPortadorRepository";

import { PortadorManagement } from "./PortadorManagement";
import { PortadorManagementController } from "./PortadorManagementController";

const db = new InMemory()
const portadorRepository = new InMemoryPortadorRepository(db)
const portadorManagement = new PortadorManagement(portadorRepository) 
const portadorManagementController = new PortadorManagementController(portadorManagement);

export { portadorManagementController, portadorRepository, portadorManagement }