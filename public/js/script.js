
let form = document.getElementById('form')
form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    weatherFunction()
    form.reset()
})
const errorp = document.getElementById('error')
const locationp = document.getElementById('location')
const forecastp = document.getElementById('forecast')

let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorp.innerText = data.error
            locationp.innerText = ''
            forecastp.innerText = ''
        }
        else {
            locationp.innerText = data.location
            forecastp.innerText = data.forecast
            errorp.innerText = ''

        }
    }
    catch(e){
        console.log(e)
    }
}