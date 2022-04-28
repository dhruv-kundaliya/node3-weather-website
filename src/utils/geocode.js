const request = require('request')

const Geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoiZGhydXYtMjAxMCIsImEiOiJjbDI3ZXM3OGIwYWY2M2RtamZkZmQ4MnJ6In0.9rIPW0lxlP3eyiT2T2YJnw&limit=1'
  
    request({url : url,json : true},(error,response)=>{
      if (error) {
        callback('unable to connect',undefined)
      }
      else if (response.body.features.length == 0){
        callback('unable to find location',undefined)
      }
      else{
        callback('data retrive sucsessfully',{
          latitude : response.body.features[0].center[0],
          longitude : response.body.features[0].center[1]
        })
      }
    })
  }
module.exports = Geocode