const Biere = require("../models/biere");
const biereController = {};

biereController.getAll = (req, res) =>{
    Biere.findAll()
    .then((bieres)=>{
        return res.send(bieres)
    }).catch((error)=>{
        res.status(400).send({message : "Failed fetching bieres", error})
    })
}

biereController.getById = (req, res) => {
    const id = req.params.id

    Biere.findByPk(id)
    .then((biere) =>{
        if(!biere){
            return res.send({message: "Biere not found"})
        }
        return res.status(200).send(biere)
    }).catch((error)=> {
        res.status(400).send({message : "Failed fetching biere", error})
    })
}

biereController.create = (req, res) => {
   if(!req.form.isValid){
    res.status(400).json({ message : "Invalid Form"})
   }

   const {name, description, degree, prix} = req.form
   const biere = {name, description, degree, prix}

   Biere.create(biere)
   .then((biere)=> {
    return res.status(201).send({biere, message : "Biere created"})
   }).catch((error)=>{
    res.status(400).send({message : "Failed creating biere", error})
   })
}

module.exports = biereController
