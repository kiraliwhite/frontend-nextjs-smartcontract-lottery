import { useEffect, useState, useRef } from "react"

const Time = () => {
  const [countDown, setCountDown] = useState(60)
  const [delay, setDelay] = useState(1000)
  const [isTime, setIsTime] = useState(true)

  //這是別人寫的hook
  function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

  //當isTime為true時,就會執行這個useInterval
  useInterval(
    () => {
      if (countDown <= 0) {
        nextInterval()
        //console.log(`setCountDown ${setCountDown}`)
      } else {
        setCountDown(countDown - 1)
      }
    },
    isTime ? delay : null
  )

  useEffect(() => {
    nextInterval()
  }, [])

  function tomorrow() {
    const today = new Date()
    // to return the date number(1-31) for the specified date
    //console.log("today => ",today)
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    //console.log(tomorrow)
    return tomorrow
  }

  function nextInterval() {
    const y = tomorrow().getFullYear()
    const m = tomorrow().getMonth() //0對應1月 1對應2月,要轉字串時要+1
    const d = tomorrow().getDate()
    //拼出明天日期的字串,固定在指定的開獎時間
    const tomorrowTime = `${y}-${m + 1}-${d}T12:00:00.00`
    //console.log(tomorrowTime)
    //將字串轉成日期格式
    const nextDate = new Date(`${tomorrowTime}`)
    //明天日期的秒數
    const nextSeconds = Math.floor(nextDate.getTime() / 1000)
    //console.log(nextSeconds)
    const today = new Date()
    const todaySeconds = Math.floor(today.getTime() / 1000)
    //console.log(todaySeconds)
    let interval = nextSeconds - todaySeconds
    //console.log(interval)
    //如果間隔大於86400 則減去,代表快接近中午12點
    if (interval > 86400) {
      interval = interval - 86400
      //console.log(interval)
    }
    setCountDown(interval)
  }

  function convertSecFormat(seconds) {
    let sec = seconds % 60
    let secS = sec.toString()
    if (sec < 10) {
      secS = "0" + secS
    }
    return secS
  }

  function convertSecToMin(seconds) {
    let minutes = Math.floor(seconds / 60)
    minutes = minutes % 60
    let minutesS = minutes.toString()
    if (minutes < 10) {
      minutesS = "0" + minutesS
    }
    return minutesS
  }

  function convertSecToHour(seconds) {
    let hours = Math.floor(seconds / 3600)
    let hoursS = hours.toString()
    if (hours < 10) {
      hoursS = "0" + hoursS
    }
    return hoursS
  }

  return (
    <div className="p-5">
    <div className="p-5 ring-1 bg-slate-50 ring-black/5 rounded-lg text-2xl antialiased font-mono	text-white bg-gradient-to-r from-violet-700 to-fuchsia-400	
">
      開獎時間: {convertSecToHour(countDown)} : {convertSecToMin(countDown)} :{" "}
      {convertSecFormat(countDown)}
    </div>
    </div>
  )
}

export default Time
