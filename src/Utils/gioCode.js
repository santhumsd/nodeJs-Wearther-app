
const request=require('request')
let gioCode=(address,callback)=>{
    if(address===undefined) return callback("please enter the address in the commend line",undefined);
    const geoConfig={
        url:`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibXNhZ3MiLCJhIjoiY2thYW9wZHN4MDNrNjJ4cXl5aTI1YW1iYiJ9.byNGdB_VkRHH3p6B66gHXg&limit=1`,
        json:true
        }
        request(geoConfig,(error,response)=>{
            if(error){
                callback("please restablish your connection",undefined)
            }
            else if(response.body.features.length==0)
            {
               
                callback("please check the address you entered",undefined)
            }
            //console.log("sab")
            else{
            callback(undefined,{
                longitude:response.body.features[0].center[0],
                lattitude:response.body.features[0].center[1],
                place_name:response.body.features[0].place_name
            })
            }
            })
}

module.exports=gioCode