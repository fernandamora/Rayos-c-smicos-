const express = require("express");
const router = express.Router();


const RC = require("../models/infoRC");
//Leer datos de la base de datos
router.get("/", async(req, res, next) => {
    const RayCosObj = await RC.find();
    res.json(RayCosObj);
});

//Consulta de datos por lugar
router.get("/lugar/:lugar", async(req, res, next) => {
    // http://localhost:5000/api/RayosCosmicos/lugar/universidad
    const lugar = req.params.lugar;
    console.log(lugar);
    const RayCosObj = await RC.find({lugar : lugar, }).sort({$natural : -1});
    res.json(RayCosObj);
});

router.get("/ultimo/lugar/:lugar", async(req, res, next) => {
    const lugar = req.params.lugar;
    console.log(lugar);
    const RayCosObj = await RC.find({lugar : lugar}).limit(1).sort({$natural : -1});
    res.json(RayCosObj);
});

//Consulta de datos por lugar
router.get("/lugar/:lugar/temp/:temp", async(req, res, next) => {
    // http://localhost:5000/api/RayosCosmicos/lugar/universidad/temp/12
    const temp = req.params.temp;
    const lugar = req.params.lugar;
    console.log(lugar);
    const RayCosObj = await RC.find({lugar : lugar, temperatura : {$gt: temp}}).sort({$natural : -1}); //Busca la temperatura mayor que temp
    res.json(RayCosObj);
});

// Posting data
//{"lugar": "universidad", "temperatura": 12.0, "saturacion": 24.0, "luz": 10.0}
router.post("/", async(req, res, next) => {
    const { lugar, temperatura, saturacion, luz} = req.body;

    const RayCosObj = new RC({
        lugar,
        temperatura,
        saturacion,
        luz
    });

    console.log(RC)

    //Post
    await RayCosObj.save();

    res.json({status: "Dato guardado"})
});

module.exports = router;