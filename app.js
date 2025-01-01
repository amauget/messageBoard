const express = require('express')
const app = express()
const path = require('node:path')
const prepData = require('./controllers/prepData')
const fs = require('node:fs')



//Default data
const content = prepData()

//Set up static page useage -> "public" dir
const assetPath = path.join(__dirname, 'public')
app.use(express.static(assetPath))

//Enable reading of app.body <-- this is where form data will be..
app.use(express.urlencoded({ extended: true }));

//Set up EJS 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('index', {content: content})
})

app.get('/form', (req, res) => {
    res.status(200).render('form', {date: (new Date())})
})
//POST requests here.. drive w/ submit event
app.post('/', (req, res) => {
    //How is the data bundled so that I can audit all inputs are complete?
    const newContent = req.body
    newContent.date = new Date()
    content.push(newContent)

    fs.writeFile('./data/data.json', JSON.stringify(content), err => {
        if(err){
            console.log('An Error Has Occurred:')
            console.error(err)
            res.status(500)
        }
        else{
            // console.log(JSON.stringify(content))
            console.log('Writing successful.')
            res.status(200)
        }
    })

    res.redirect('/')

})

app.use('*', (req, res) => { //Catch all inelligible pathways.
    res.status(404).sendFile(path.join(assetPath, '', '404.html')) //static page located in "public"
})

app.use((err, req, res, next) => { //Error Handling
    console.error(err)
    res.status(err.statusCode || 500).redirect('/') .send(err.message)
    //Update status code then send the error message and redirect to home

}) 

//Server Config: 

const PORT = 3000

app.listen(PORT, () => {
    console.log('Running on port: ', PORT)
})

