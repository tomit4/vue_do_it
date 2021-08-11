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
            const sqlQuery = 'SELECT * FROM to_do_am UNION ALL SELECT * FROM to_do_pm ORDER BY hours, minutes'
            const result = await pool.query(sqlQuery)
            return result
        }               
    })

    server.route({
        method: 'POST',
        path: '/maria_database',
        handler: async(request) => {
            const { task, minutes, am_pm, nanoid } = request.payload
            let { hours } = request.payload
            if (am_pm === "AM" && hours === "12") {
                hours = 0
            }
            if (am_pm === "PM" && hours === "12") {
                hours = 0
            }
            if (am_pm === "AM") {
                const sqlQuery = 'INSERT INTO to_do_am (task, hours, minutes, am_pm, nanoid) VALUES (?, ?, ?, ?, ?)'
                const result = await pool.query(sqlQuery, [task, Number(hours), Number(minutes), am_pm, nanoid])
                return result
            } else if (am_pm === "PM") {
                const sqlQuery = 'INSERT INTO to_do_pm (task, hours, minutes, am_pm, nanoid) VALUES (?, ?, ?, ?, ?)'
                const result = await pool.query(sqlQuery, [task, Number(hours) + 12, Number(minutes), am_pm, nanoid])
                return result
            }
        }         
    })

    server.route({
        method: 'DELETE',
        path: '/maria_database',
        handler: async(request) => {
            const { deletedItem } = request.payload
            if (deletedItem.am_pm === "AM") {
                const sqlQuery = 'DELETE FROM to_do_am WHERE nanoid = (?)'
                const result = await pool.query(sqlQuery, [deletedItem.nanoid])
                return result
            } else if (deletedItem.am_pm === "PM") {
                const sqlQuery = 'DELETE FROM to_do_pm WHERE nanoid = (?)'
                const result = await pool.query(sqlQuery, [deletedItem.nanoid])
                return result
            }
        }
    })

    server.route({
        method: 'PUT',
        path: '/maria_database',
        handler: async(request) => {
            const { updated_todo, hours, minutes, am_pm, nanoid } = request.payload
            if (am_pm === "AM") {
                const sqlQuery = 'UPDATE to_do_am SET task = (?), hours = (?), minutes = (?), am_pm = (?) WHERE nanoid = (?)'
                const result = await pool.query(sqlQuery, [ updated_todo, Number(hours), Number(minutes), am_pm, nanoid ])
                return result
            } else if (am_pm === "PM") {
                const sqlQuery = 'UPDATE to_do_pm SET task = (?), hours = (?), minutes = (?), am_pm = (?) WHERE nanoid = (?)'
                const result = await pool.query(sqlQuery, [ updated_todo, Number(hours), Number(minutes), am_pm, nanoid ])
                return result
            }
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