const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX route
router.get('/', (req, res)=>{
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // console.log(creatureData)

    let nameFilter = req.query.nameFilter
    console.log(nameFilter)
    if (nameFilter){
        creatureData = creatureData.filter(creature=>creature.type === nameFilter)
    }
    console.log(creatureData)
    res.render('prehistoric_creatures/index.ejs', {
        myCreatures: creatureData
    })
})

// NEW CREATURE FORM route
router.get('/new', (req,res)=>{
    res.render('prehistoric_creatures/new.ejs')
})

// SHOW route -- specific creature
router.get('/:id', (req, res)=>{
    // get the array of the dinos
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // id the exaact dino
    let creatureIndex = req.params.id
    // console.log(dinoData[dinoIndex])
    res.render('/show.ejs',{
        myCreatures: creatureData[creatureIndex]
    })
})

// POST route
router.post('/prehistoric_creatures', (req,res)=>{

    // get the array of the dinos
    let prehistoric_creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(prehistoric_creatures)
    // add new dino to the array
    creatureData.push(req.body)
    // save dinosaurs to json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    // redirect to the index route
    res.redirect('/prehistoric_creatures')
    // console.log(req.body)
})

module.exports = router