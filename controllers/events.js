const {response} = require('express') // No es necesario, pero sirve para recueprar las ayudas del idle

const getEvents = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'getEvents'
    })
}
const createEvent = async (req, res = response) => {

    

    return res.status(200).json({
        ok: true,
        msg: 'createEvent'
    })
}
const updateEvent = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'updateEvent'
    })
}
const deleteEvent = async (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'deleteEvent'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}