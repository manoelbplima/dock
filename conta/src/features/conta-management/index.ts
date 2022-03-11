import { MongoDB } from "../../providers/database/implementation/MongoDB";
import { MongoDBContaRepository } from "../../repositories/implementation/mongodb/MongoDBContaRepository";
import { MongoDBPortadorRepository } from "../../repositories/implementation/mongodb/MongoDBPortadorRepository";
import { MongoDBMovimentoRepository } from "../../repositories/implementation/mongodb/MongoDBMovimentoRepository";
import { ContaManagement } from "./ContaManagement";
import { ContaManagementController } from "./ContaManagementController";

const db = new MongoDB()
const contaRepository = new MongoDBContaRepository(db)
const portadorRepository = new MongoDBPortadorRepository(db)
const movimentoRepository = new MongoDBMovimentoRepository(db)
const contaManagement = new ContaManagement(contaRepository,portadorRepository,movimentoRepository) 
const contaManagementController = new ContaManagementController(contaManagement);

export { contaManagementController, contaRepository, contaManagement }