console.log("hey its executing in browser wow amazing!!!!")


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1');
const message2=document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{

e.preventDefault();
message1.textContent="Loding....."
message2.textContent=""
console.log(search.value)
fetch("/weather?address="+search.value)
   .then(function(res){res.json()
         .then(function(data){
            console.log(data)
             if(data.error){
                message1.textContent=data.error
                
             }
              else
              {
                message1.textContent=data.forecast
                message2.textContent=data.address
               //  console.log(data.forecast)
               //  console.log(data.address)
               //  console.log(data.location)
              }
         
             
           })
        
    })
})
