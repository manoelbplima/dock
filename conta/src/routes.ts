import { Router } from "express";
import { contaManagementController } from "./features/conta-management";

const router = Router()
const prefix = "/api/v1/conta/"

router.post(prefix + "abrir", (request, response) => {
    return contaManagementController.handlePostAbrir(request, response)
})

router.get(prefix + "consulta/:cpf", (request, response) => {
    return contaManagementController.handleGetConsulta(request, response)
})

router.put(prefix + "encerrar", (request, response) => {
    return contaManagementController.handlePutEncerrar(request, response)
})

router.put(prefix + "bloquear", (request, response) => {
    return contaManagementController.handlePutBloquear(request, response)
})

router.put(prefix + "desbloquear", (request, response) => {
    return contaManagementController.handlePutDesbloquear(request, response)
})

router.post(prefix + "depositar", (request, response) => {
    return contaManagementController.handlePostDepositar(request, response)
})

router.post(prefix + "saque", (request, response) => {
    return contaManagementController.handlePostSaque(request, response)
})

router.get(prefix + "extrato-periodo/:inicio/:fim/:numero/:agencia", (request, response) => {
    return contaManagementController.handleGetExtratoPeriodo(request, response)
})

export { router }