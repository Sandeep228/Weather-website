const request = require('request')

const forecast = ((latitude,longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=ae6b2a1a18f2493ccd03943b78f48dfb&query=' + latitude + ',' + longitude + '&unit=f'
    request({ url , json: true}, (error,{body}) => {
        if(error)
         {
          callback('Unable to connect to weather service!', undefined)
         }
         else if(body.error)
         {
              callback('Unable to find location', undefined)
         }
       else
        {
        callback(undefined, body.current.weather_descriptions[0] + '  It is currently  '+ body.current.temperature + ' degrees out  ' + ' It feels like ' + body.current.feelslike + ' degrees out ' + ' The  Humditiy is ' + body.current.humidity + "%.") 
        }
      })
})
module.exports = forecast