import { useState, useEffect } from "react"
import Value from "./Value"

const Temperature = ({ name }) => {
    const [celsius, setCelsius] = useState(25)
    const [fahrenheit, setFahrenheit] = useState(77)
    const [kelvin, setKelvin] = useState(298.15)

  // update Fahrenheit & Kelvin เมื่อ Celsius เปลี่ยน
useEffect(() => {
    setFahrenheit(celsius * 9 / 5 + 32)
    setKelvin(celsius + 273.15)
}, [celsius])

  // update Celsius & Kelvin เมื่อ Fahrenheit เปลี่ยน
useEffect(() => {
    setCelsius((fahrenheit - 32) * 5 / 9)
    setKelvin((fahrenheit - 32) * 5 / 9 + 273.15)
}, [fahrenheit])

  // update Celsius & Fahrenheit เมื่อ Kelvin เปลี่ยน
useEffect(() => {
    setCelsius(kelvin - 273.15)
    setFahrenheit((kelvin - 273.15) * 9 / 5 + 32)
}, [kelvin])

return (
    <div className="border border-black border-2 mx-auto mt-3 rounded-3 p-2" style={{ width: 'fit-content' }}>
    <h1 className="text-center">{name || 'Temperator'}</h1>
    <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="badge bg-secondary">C = {celsius.toFixed(2)}</div>
        <div className="badge bg-primary">F = {fahrenheit.toFixed(2)}</div>
        <div className="badge bg-secondary">K = {kelvin.toFixed(2)}</div>
    </div>
    <div className="d-flex gap-2">
        <Value name={'Celsius'} type="real" value={celsius} setValue={setCelsius} />
        <Value name={'Fahrenheit'} type="real" value={fahrenheit} setValue={setFahrenheit} />
        <Value name={'Kelvin'} type="real" value={kelvin} setValue={setKelvin} />
    </div>
    </div>
    )
}

export default Temperature