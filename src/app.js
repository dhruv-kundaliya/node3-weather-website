const path = require('path')
const express = require('express')
const hbs = require('hbs')
const Geocode = require('./utils/geocode')
const temperature = require('./utils/temp')
const { send } = require('process')

const app = express()

//Define paths for express config
const try_public_path = path.join(__dirname , '../try_public')
const viewspath = path.join(__dirname, '../tamplates/views')
const partialspath = path.join(__dirname, '../tamplates/partials')

//setup handle bar and views location
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve
app.use(express.static(try_public_path))

app.get('',(req, res)=>{
    res.render('index', {
        title : 'Weather',
        name : 'Dhruv Kundaliya'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Dhruv Kundaliya'
    })
})
app.get('/product',(req,res)=>{
    if (!req.query.search) {
       return res.send({
            error : 'You must provide a search term '
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help',
        name : 'Dhruv Kundaliya',
        number : 9998121095,
        text : ''
    })
})
/*app.get('/weather', (req,res)=>{
    if (!req.query.address) {
        return res.send({
            error : 'not pass address'
        })
    }
    Geocode(req.query.address, (error,data)=>{
        if(error){
           return res,send({
            error : 'error in function'
           })
        }
        res.send({
            data
        })
    })
})*/
app.get('/weather',(req, res)=>{
    if (req.query.address) {
        Geocode(req.query.address, (error,data)=> {
            if (data) {
                const { latitude , longitude} = data
                temperature(`${latitude},${longitude}`, (error,response)=>{
                    if(response){
                        res.send({
                            data : response,
                            location : req.query.address
                        })
                    }
                })
            }
            else{
                return res.send({
                    error : 'error'
                })
            }  
          })
    }
    else{
        res.send({
            error : 'not give address'
        })
    }
 
})

app.listen(3000,()=>{
    console.log('server started on 3000')
})