const path=require("path")
var hbs=require("hbs")
const express=require("express")
const app=express()
const port=process.env.PORT||3000
// --------------------------------------
app.set('view engine' , 'hbs');
const viewsDirectory = path.join (__dirname , '../temp/views')
app.set('views', viewsDirectory);
// --------------------------------

const patialspath=path.join(__dirname , "../temp/partials")
hbs.registerPartials(patialspath)

// ---------------------------------
const x=path.join(__dirname , '../public')
app.use(express.static(x))
// -----------static--------------------
app.get('/' , (req,res)=>{
    res.render('index' , {
        title:"this home page",
        buttun:"enter here"
    })
})
app.get('/data1' , (req,res)=>{
    res.render('data1' , {
        title:"this data1 page",
        buttun:"enter here"
    })
})
app.get('/data2' , (req,res)=>{
    res.render('data2' , {
        title:"this data2 page",
        buttun:"enter here"
    })
})
app.get('/data3' , (req,res)=>{
    res.render('data3' , {
        title:"this data3 page",
        buttun:"enter here"
    })
})
app.get('/data4' , (req,res)=>{
    res.render('data4' , {
        title:"this data4 page",
        buttun:"enter here"
    })
})
// ---------------------------
const request=require("request")
const geocode=require('./tools/geocode')
const forecast=require('./tools/forecast')

app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must enter an address"
        })
    }
    geocode(req.query.address , (error , data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude , data.longtitude , (error , forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location:req.query.address
            })
        })
    })
})

app.get('*' , (req,res)=>{
    res.send('404 page not current found')
})

app.listen(port , ()=>{
    console.log(`this website listening by port : ${port}`)
})