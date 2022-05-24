const express = require('express')
const router = express.Router()
const fs = require('fs')

// routes

// INDEX route
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)

    let nameFilter = req.query.nameFilter
    // console.log(nameFilter)
    if (nameFilter){
        dinoData = dinoData.filter(dino=>dino.name.toLowerCase() === nameFilter.toLowerCase())
    }
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    })
})

// NEW DINO FORM route
router.get('/new', (req,res)=>{
    res.render('dinosaurs/new.ejs')
})

// SHOW route -- specific dino
router.get('/:id', (req, res)=>{
    // get the array of the dinos
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // id the exaact dino
    let dinoIndex = req.params.id
    // console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs',{
        myDino: dinoData[dinoIndex]
    })
})

// POST route
router.post('/', (req,res)=>{

    // get the array of the dinos
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // add new dino to the array
    dinoData.push(req.body)
    // save dinosaurs to json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to the index route
    res.redirect('/dinosaurs')
    // console.log(req.body)
})

// GET /dinosaurs/edit/:id -- a view of a form to edit a specific dino at :is
router.get('/edit/:id', (req, res)=>{
    // get the dino data and render the dit form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // render edit form
    res.render('dinosaurs/edit.ejs', {
        dinoId: req.params.id,
        dino: dinoData[req.params.id]
    })
})

// PUT /dinosaurs/:id -- update a dino at :id
router.put('/:id', (req, res)=>{
    // get dinos from json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    console.log(req.params.id, req.body)
    // update the dino based on the req.params.id and the req.body
    // req.params = which dino
    // req.body = dino data to update
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type
    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to someplace that has data 
    // res.send(`update a dino at ${req.params.id}`)
    res.redirect('/dinosaurs')
})

// DELETE /dinosaurs/:id -- destroy a dino at :id
router.delete('/:id', (req, res)=>{
    // get the dino from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // splice dino from  the array
    dinoData.splice(req.params.id, 1)
    // save the dino json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to see all dinos
    res.redirect('/dinosaurs')
})

module.exports = router