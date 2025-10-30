import { useState,useEffect } from "react"

const Timer = () => {
  const [second, setSecond] = useState(59)
  const [running, setRunning] = useState(false)

    useEffect(() => {
        let interval = null
        if (running){
            interval = setInterval(() =>{
                setSecond(second + 1)
            },1000)
        }
        return () => clearInterval(interval)
    },[running,second])
    const runClick = () => {
        setRunning(!running)
    }
  
    const resetClick = () => {
    setRunning(false)
    setSecond(0)
  }

  const convertToString = (sec) => {
    const SECONDS_IN_DAY = 86400
    const SECONDS_IN_HOUR = 3600
    const SECONDS_IN_MINUTE = 60

    const day = Math.floor(sec / SECONDS_IN_DAY)
    const hour = Math.floor((sec % SECONDS_IN_DAY) / SECONDS_IN_HOUR)
    const minute = Math.floor((sec % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    const remainSecond = sec % SECONDS_IN_MINUTE

    return day + "d " + hour + "h " + minute + "m " + remainSecond + "s"
  }

    return (
        <div className="border border-black border-2 mx-auto mt-3 rounded-3 p-2" style={{ width: 'fit-content' }}>
            <h1>timer</h1>
            <input value={convertToString(second)} readOnly></input>
            <div className="d-flex justify-content-between align-items-center pt-2">
                <button className="btn btn-danger" onClick={resetClick}> <i className="bi bi-arrow-counterclockwise"></i>&nbsp;RESET</button>
                <button className="btn btn-success" onClick={runClick}><i className="bi bi-play"></i>&nbsp;RUN</button>
            </div>
        </div>
    )
}
export default Timer