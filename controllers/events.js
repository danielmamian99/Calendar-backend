const { response } = require("express"); // No es necesario, pero sirve para recueprar las ayudas del idle
const { events } = require("../models/Event");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  return res.status(200).json({
    ok: true,
    events,
  });
};
const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;

    const saveEvent = await event.save();

    return res.json({
      ok: true,
      event: saveEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: "No hay evento con ese Id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    }); //new true para que retorne los datos actualizados y no los anteriores

    return res.status(200).json({
      ok: true,
      evento: updateEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No hay evento con ese Id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio para eliminar este evento",
      });
    }

    const deleteEvent = await Event.findByIdAndDelete( eventId ); //new true para que retorne los datos actualizados y no los anteriores

    return res.status(200).json({
      ok: true,
      evento: deleteEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
