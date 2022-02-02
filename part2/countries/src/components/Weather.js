import axios from "axios"
import { useState, useEffect } from "react"
import { getDirectionByDegree } from "../Utils"
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
    const [temp, setTemp] = useState('')
    const [icon, setIcon] = useState('')
    const [speed, setSpeed] = useState('')
    const [degree, setDegree] = useState('')

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
            .then(response => {
                setTemp(response.data.main.temp)
                setSpeed(response.data.wind.speed)
                setDegree(response.data.wind.deg)
                setIcon(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
            })
    }, [capital])

    return (
        <>
            <h2>Weather in {capital}</h2>
            <p><b>temperature: </b> {temp} Celcius</p>
            <img src={icon} alt="icon" />
            <p><b>wind: </b>{speed} mph direction {getDirectionByDegree(degree)}</p>
        </>
    )
}
export default Weather