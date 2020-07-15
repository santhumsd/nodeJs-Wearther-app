const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const gioCode=require('../src/Utils/gioCode');
const foreCast=require('../src/Utils/foreCast');
console.log(__dirname);
console.log(__filename);
//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//console.log(express.static(publicDirectoryPath))
//set up handle bars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath)//here views is the default folder which view engine set to but we can override or rename the views folder by setting the path to the views
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render("index",{
        title:"weather APP",
        name:"Santhosh MS",
        href:"/CSSFolder/style.css",
        image:"/Images/1.jpg",
    });//no need to mention the .hbs
})
app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Santhosh MS",
        href:"/CSSFolder/style.css",
        helpText:"some helpgull text will be available soon"
    })
})
app.get('/help/*',(req,res)=>{
    res.render("404Error",{
        message:"Help article not found",
        href:"/CSSFolder/style.css"
    })
})
app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About",
        href:"/CSSFolder/style.css",
        image:"/Images/1.jpg",
        name:"Santhosh",
        age:24
    })
})
app.get('/weather',(req,res)=>{
   // res.attachment('/Images/1.jpg')//on forecast call the image will be downloaded
   if(!req.query.address){
    return res.send(
        {
            error:"you must provide address."
        }
    )
}
   gioCode(req.query.address,(error,{lattitude,longitude,place_name}={})=>{//destructuring
   
    if(error){
        console.log(error)
        return  res.send(
            {
                error
            }
        )
    } 
     foreCast(lattitude,longitude,(error,{description,temperature,feelsLike}={})=>{
         if(error){
             console.log(error)//ereturn will not execute the next stmt it will stops here after printing the
             return res.send(
                {
                    error
                }
            )
            } 
             console.log(`${description}-its currently ${temperature} degrees out there. It feels like ${feelsLike} degrees out.`)
             //console.log(`its currently ${response.body.current.temperature} degrees out there. there is a ${response.body.current.precip}% chance of rain.`)
             res.send(
                {
                forecast:`${description}-its currently ${temperature} degrees out there. It feels like ${feelsLike} degrees out.`,
                address:place_name,
                location:req.query.address
                }
                   )
            })
        console.log(place_name)
 
    
    }
 )
if(!req.query.address){
    return res.send(
        {
            error:"you must provide address."
        }
    )
}
   
})

app.get('*',(req,res)=>{
    res.render("404Error",{
        message:"404-Page not found",
        href:"/CSSFolder/style.css"
    })
})
app.listen(4000,()=>{
    console.log('listening at port 3000')
})
// const http = require('http')
// const url = 'http://api.weatherstack.com/current?access_key=66e140485e333d4c34d24aa1a62af642&query=40,-75&units=m'

// const request = http.request(url, (response) => {
//     let data = ''

//     response.on('data', (chunk) => {
//         data = data + chunk.toString()
//     })

//     response.on('end', () => {
//         const body = JSON.parse(data)
//         console.log(body)
//     })

// })

// request.on('error', (error) => {
//     console.log('An error', error)
// })

// request.end()