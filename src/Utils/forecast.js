const request=require('request')
let foreCast=(latt,long,callback)=>{
const url=`http://api.weatherstack.com/current?access_key=66e140485e333d4c34d24aa1a62af642&query=${latt},${long}&units=m`//units=m means celcius
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("re-establish your connection",undefined)
        }
        else if(!response.body.current.temperature){
            callback("the coardinates are wrong",undefined)
        }
        else{
            
            callback(undefined,{
                description:response.body.current.weather_descriptions[0],
                temperature:response.body.current.temperature,
                feelsLike:response.body.current.feelslike
            })
            
        }
        
    }
)}
    module.exports=foreCast