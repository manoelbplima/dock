import { DuplicateCpf } from './errors/DuplicateCpf'
import { InvalidCpf } from './errors/InvalidCpf'
import { NotExistsCpf } from './errors/NotExistsCpf'
import { portadorRepository, portadorManagement } from './index'

test('Check should portador save it ok', () => {
    return portadorManagement.save({
        cpf: "36127621844",
        name: "Manoel Lima"
    }).then(data => {
        expect(data).toMatchObject({ cpf: "36127621844" })
    })
})

test('Check should portador cpf invalid it ok', () => {
    return portadorManagement.save({
        cpf: "36127621800",
        name: "Manoel Lima"
    }).then(data => { 
        fail('it should not reach here');
    }).catch( err => {
        expect(err).toBeInstanceOf(InvalidCpf)
    })
})

test('Check should portador findByCpf it ok', () => {
    return portadorRepository.findByCpf("36127621844").then(data => {
        expect(data).toMatchObject({ cpf: "36127621844" })
    })
})

test('Check should portador duplicity validation it ok', () => {
    return portadorManagement.save({
        cpf: "36127621844",
        name: "Manoel Lima"
    }).then(data => {
        fail('it should not reach here');
     }).catch( err => {
        expect(err).toBeInstanceOf(DuplicateCpf)
    })
})

test('Check should portador delete it ok', () => {
    portadorRepository.save({
        cpf: "36127621844",
        name: "Manoel Lima"
    })    

    return portadorManagement.remove({
        cpf: "36127621844",
        name: ""
    }).then(data => {
        expect(data).toBe(true)
    })
})

test('Check should portador delete invalid cpf it ok', () => {
    return portadorManagement.remove({
        cpf: "36127621800",
        name: ""
    }).then(data => { 
        fail('it should not reach here');
    }).catch( err => {
        expect(err).toBeInstanceOf(InvalidCpf)
    })
})

test('Check should portador delete no existent cpf it ok', () => {
    return portadorManagement.remove({
        cpf: "93252822083",
        name: ""
    }).then(data => { 
        fail('it should not reach here');
    }).catch( err => {
        expect(err).toBeInstanceOf(NotExistsCpf)
    })
})