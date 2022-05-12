const request = require('request')

function temperature(address,callback){
    const url1 = 'http://api.weatherstack.com/current?access_key=9a800c450518e6a434c36c2c4eda78cb&query='+address+',&units=f'

    request({url : url1,json : true},(error,response)=>{
        if (error) {
            callback('unable to connect',undefined)
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            console.log(response.body.current.temperature)
            callback('temprature retrive sucuessfuly',`it is currently ${response.body.current.temperature} degree it feels like ${response.body.current.feelslike} degree`)
        }
    })
}
module.exports = temperature