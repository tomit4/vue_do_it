'use strict'

const Hapi = require("@hapi/hapi")
const pool = require('./maria_database_connection/database.js')

const init = async() => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true
        }
    })

    server.route({
        method: 'GET',
        path: '/maria_database',
        handler: async() => {
            const sqlQuery = 'SELECT * FROM to_do'
            const result = await pool.query(sqlQuery)
            return result
        }               
    })

    server.route({
        method: 'POST',
        path: '/maria_database',
        handler: async(request) => {
            const { task, nanoid } = request.payload
            const sqlQuery = 'INSERT INTO to_do (task, nanoid) VALUES(?, ?)'
            const result = await pool.query(sqlQuery, [task, nanoid])
            return result
        }         
    })

    server.route({
        method: 'DELETE',
        path: '/maria_database',
        handler: async(request) => {
            const { deletedItem } = request.payload
            const sqlQuery = 'DELETE FROM to_do WHERE (task) = (?) && nanoid = (?)'
            const result = await pool.query(sqlQuery, [deletedItem.todo, deletedItem.nanoid])
            return result
        }
    })

    server.route({
        method: 'PUT',
        path: '/maria_database',
        handler: async(request) => {
            const { updated, nanoid } = request.payload
            const sqlQuery = 'UPDATE to_do SET task = (?) WHERE nanoid = (?)'
            const result = await pool.query(sqlQuery, [ updated, nanoid ])
            return result
        }
    })

    await server.start()
    console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()