import { Router } from "express";
import { portadorManagementController } from "./features/portador-management";

const router = Router()

router.post('/portador', (request, response) => {
    return portadorManagementController.handlePOST(request, response)
})

router.delete('/portador', (request, response) => {
    return portadorManagementController.handleDELETE(request, response)
})

export { router }