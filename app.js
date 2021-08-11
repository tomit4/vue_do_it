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
            // const { task, nanoid } = request.payload
            // const sqlQuery = 'INSERT INTO to_do (task, nanoid) VALUES(?, ?)'
            // const result = await pool.query(sqlQuery, [task, nanoid])
            const { task, hours, minutes, am_pm, nanoid } = request.payload
            const sqlQuery = 'INSERT INTO to_do (task, hours, minutes, am_pm, nanoid) VALUES (?, ?, ?, ?, ?)'
            const result = await pool.query(sqlQuery, [task, hours, minutes, am_pm, nanoid])
            return result
        }         
    })

    server.route({
        method: 'DELETE',
        path: '/maria_database',
        handler: async(request) => {
            const { deletedItem } = request.payload
            const sqlQuery = 'DELETE FROM to_do WHERE nanoid = (?)'
            const result = await pool.query(sqlQuery, [deletedItem.nanoid])
            return result
        }
    })

    // We'll now need to add more sqlQuery parameters to edit hours, minutes, and ampm
    server.route({
        method: 'PUT',
        path: '/maria_database',
        handler: async(request) => {
            const { updated_todo, hours, minutes, am_pm, nanoid } = request.payload
            const sqlQuery = 'UPDATE to_do SET task = (?), hours = (?), minutes = (?), am_pm = (?) WHERE nanoid = (?)'
            const result = await pool.query(sqlQuery, [ updated_todo, hours, minutes, am_pm, nanoid ])
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