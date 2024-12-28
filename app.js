const express = require('express')
const app = express()
const path = require('node:path')


//Default data
const content = [
    {name: 'Albert', date: new Date(), message: 'Hello, all!'},
    {name: 'Leslie', date: new Date(), message: 'How is everyone doing?'},
    {name: 'Kurtis', date: new Date(), message: 'Evening everyone.'}

]

//Set up static page useage -> "public" dir
const assetPath = path.join(__dirname, 'public')
app.use(express.static(assetPath))

//Set up EJS 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('index', {content: content})
})

//POST
app.post('')

app.use('*', (req, res) => { //Catch all inelligible pathways.
    res.status(404).sendFile(path.join(assetPath, '', '404.html')) //static page located in "public"
})

app.use((err, req, res, next) => { //Error Handling
    console.error(err)
    res.status(err.statusCode || 500).send(err.message) //Update status code then send the error message
}) 

//Server Config: 

const PORT = 3000

app.listen(PORT, () => {
    console.log('Running on port: ', PORT)
})

