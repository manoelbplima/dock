import { Router } from "express";
import { portadorManagementController } from "./features/portador-management";

const router = Router()
const prefix = "/api/v1/portador/"

router.post(prefix + "novo", (request, response) => {
    return portadorManagementController.handlePOST(request, response)
})

router.delete(prefix + "remover/:cpf", (request, response) => {
    return portadorManagementController.handleDELETE(request, response)
})

export { router }