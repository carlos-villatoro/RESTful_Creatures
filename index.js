// packages
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') // import a module
const methodOverride = require('method-override')

// app config
const app = express()
app.set('view engine', 'ejs')
const PORT = 3000

// middlewares
app.use(ejsLayouts)
// body parser
app.use(express.urlencoded({extended: false}))
// allow non GET/Post methods form an html form 
app.use(methodOverride('_method'))

// controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

// home route
app.get('/', (req,res)=>{
    res.render('home.ejs')
})


// listen
app.listen(PORT, ()=>{
    console.log(`you is on port ${PORT}`)
})