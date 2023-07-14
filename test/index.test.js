const server = require('../src/server')
const session = require('supertest')
const agent = session(server)

describe ('Test de RUTAS', () => {
    describe('GET /rickandmorty/character/:id',
    ()=> {
        it('Responde con status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200)
        })

        it( 'Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = (await agent.get('/rickandmorty/character/1')).body
            expect(response).toHaveProperty("id", "name", "species", "gender", "status", "origin","image")
        })

        it('Si hay un error responde con status: 404', async () => {
            await agent.get('/rickandmorty/character/5000').expect(404)
        })
    })

    describe("GET /rickandmorty/login", () => {
        it('Responde con access true si pasamos credenciales correctas', async () => {
            const response = (await agent.get('/rickandmorty/login?email=matta.ale@gmail.com&password=rickmorty1')).body
            expect(response.access).toEqual(true)
        })

        it('Responde con access false si pasamos credenciales incorrectas', async () => {
            const response = (await agent.get('/rickandmorty/login?email=matale@gmail.com&password=ricky1')).body
            expect(response.access).toEqual(false)
        })
    })

    describe("POST /rickandmorty/fav", () => {
        const character1 = {id:1, name: "Ana"}
        const character2 = {id:2, name: "Samuel"}
        it('Retorna lo que envío por body en un arreglo', async () => {
            const response = (await agent.post('/rickandmorty/fav').send(character1)).body
            expect(response).toContainEqual(character1)
        })

        it('Devuelve el elemento previo y el actual', async () => {
            const response = (await agent.post('/rickandmorty/fav').send(character2)).body
            expect(response).toContainEqual(character1,character2)
        })
    })

    describe("DELETE /rickandmorty/fav/:id", () => {
        const character1 = {id:1, name: "Ana"}
        const character2 = {id:2, name: "Samuel"}
        it('Devuelve todo el array de favs cuando no encuentra personaje con el id solicitado', async () => {
            const response = (await agent.delete('/rickandmorty/fav/322')).body
            expect(response).toContainEqual(character1,character2)
        })

        it('Devuelve todo el arreglo sin el personaje eliminado', async () => {
            const response = (await agent.delete('/rickandmorty/fav/1')).body
            expect(response).not.toContainEqual(character1)
        })
    })
})