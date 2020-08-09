const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')


const chalk = require('chalk')
const app = express()

const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather ',
        name: 'Sandeep Kumar'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Sandeep Kumar'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helptext: 'this is some helpful text',
        title: 'Help',
        name: 'Sandeep Kumar'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide an address'
          })
    }
    else {
        geocode( req.query.address ,(error, {latitude,longitude,location} = { }) => {
            if(error) {
              return res.send({ error  })
            }
            forecast(latitude, longitude ,(error,forecastData) => {
                if(error) {
                  return res.send({ error }) 
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})
app.get('/products',(req, res) => {
    if(!req.query.search)
    {
       return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
       products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Sandeep Kumar',
        errorMessage: 'Help article not found.'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Sandeep Kumar',
        errorMessage: 'Page not found'
    })
    
})
 app.listen(port, () => {
     console.log(chalk.blue('server is up on port' + port ))
 })