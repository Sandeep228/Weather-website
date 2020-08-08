const request = require('request')

const forecast = ((latitude,longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=ae6b2a1a18f2493ccd03943b78f48dfb&query=' + latitude + ',' + longitude + '&unit=f'
    request({ url , json: true}, (error,{body}) => {
        if(error)
         {
          callback('unable to connect weather service',undefined)
         }
         else if(body.error)
         {
              callback('unable to find location',undefined)
         }
       else
        {
        callback(undefined, 'my location is '+ body.current.weather_descriptions[0] + ' and '+ body.current.temperature + ' and ' + body.current.feelslike)
        }
      })
})
module.exports = forecast