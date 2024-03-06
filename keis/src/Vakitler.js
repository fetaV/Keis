import React, { useState } from "react"

function DateCalculator() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [calendarData, setCalendarData] = useState([])
  const [sabahNamazi, setSabahNamazi] = useState(null)
  const [ogleNamazi, setOgleNamazi] = useState(null)
  const [ikindiNamazi, setIkindiNamazi] = useState(null)
  const [aksamNamazi, setAksamNamazi] = useState(null)
  const [yatsiNamazi, setYatsiNamazi] = useState(null)

  const handleCalculate = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const oneDay = 24 * 60 * 60 * 1000
    const diffDays = Math.round(Math.abs(start - end) / oneDay)
    const multipliedSabahNamazi = diffDays * 2
    const multipliedOgleNamazi = diffDays * 4
    const multipliedIkindiNamazi = diffDays * 4
    const multipliedAksamNamazi = diffDays * 3
    const multipliedYatsiNamazi = diffDays * 4

    setSabahNamazi(multipliedSabahNamazi)
    setOgleNamazi(multipliedOgleNamazi)
    setIkindiNamazi(multipliedIkindiNamazi)
    setAksamNamazi(multipliedAksamNamazi)
    setYatsiNamazi(multipliedYatsiNamazi)

    const dates = []
    for (let i = 0; i <= diffDays; i++) {
      const currentDate = new Date(start)
      currentDate.setDate(currentDate.getDate() + i)
      dates.push({
        date: currentDate,
        prayed: {
          sabah: false,
          ogle: false,
          ikindi: false,
          aksam: false,
          yatsi: false,
        },
      })
    }

    setCalendarData(dates)
  }

  const markPrayerAsDone = (index, prayer) => {
    const updatedCalendarData = [...calendarData]
    updatedCalendarData[index].prayed[prayer] = true
    setCalendarData(updatedCalendarData)
  }

  const markNextPrayerSabah = prayer => {
    const nextIndex = calendarData.findIndex(day => !day.prayed[prayer])
    if (nextIndex !== -1) {
      markPrayerAsDone(nextIndex, prayer)
    }
    setSabahNamazi(sabahNamazi - 2)
  }
  const markNextPrayerOgle = prayer => {
    const nextIndex = calendarData.findIndex(day => !day.prayed[prayer])
    if (nextIndex !== -1) {
      markPrayerAsDone(nextIndex, prayer)
    }
    setOgleNamazi(ogleNamazi - 4)
  }
  const markNextPrayerIkindi = prayer => {
    const nextIndex = calendarData.findIndex(day => !day.prayed[prayer])
    if (nextIndex !== -1) {
      markPrayerAsDone(nextIndex, prayer)
    }
    setIkindiNamazi(ikindiNamazi - 4)
  }
  const markNextPrayerAksam = prayer => {
    const nextIndex = calendarData.findIndex(day => !day.prayed[prayer])
    if (nextIndex !== -1) {
      markPrayerAsDone(nextIndex, prayer)
    }
    setAksamNamazi(aksamNamazi - 3)
  }
  const markNextPrayerYatsi = prayer => {
    const nextIndex = calendarData.findIndex(day => !day.prayed[prayer])
    if (nextIndex !== -1) {
      markPrayerAsDone(nextIndex, prayer)
    }
    setYatsiNamazi(yatsiNamazi - 4)
  }

  return (
    <div className="container mt-5">
      <h2>Tarih Aralığı Gün Hesaplayıcı</h2>
      <div className="row mt-3 align-items-end">
        <div className="col">
          <label>Başlangıç Tarihi:</label>
          <input
            type="date"
            value={startDate}
            className="form-control"
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div className="col">
          <label>Bitiş Tarihi:</label>
          <input
            type="date"
            value={endDate}
            className="form-control"
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleCalculate}>
            Hesapla
          </button>
        </div>
      </div>
      <div className="calendar mt-4">
        {calendarData.map((day, index) => (
          <div key={index} className="calendar-cell">
            <p className="calendar-date">{day.date.getDate()}</p>
            {Object.entries(day.prayed).map(([prayer, prayed]) =>
              prayed ? (
                <span key={prayer} style={{ color: "blue", fontSize: "10px" }}>
                  {prayer} <br />
                </span>
              ) : null
            )}
          </div>
        ))}
      </div>
      {sabahNamazi !== null && (
        <p className="mt-3">Sabah Namazı: {sabahNamazi} rekat</p>
      )}
      {ogleNamazi !== null && (
        <p className="mt-3">Öğle Namazı: {ogleNamazi} rekat</p>
      )}
      {ikindiNamazi !== null && (
        <p className="mt-3">İkindi Namazı: {ikindiNamazi} rekat</p>
      )}
      {aksamNamazi !== null && (
        <p className="mt-3">Akşam Namazı: {aksamNamazi} rekat</p>
      )}
      {yatsiNamazi !== null && (
        <p className="mt-3">Yatsı Namazı: {yatsiNamazi} rekat</p>
      )}
      <div className="row mt-3">
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => markNextPrayerSabah("sabah")}
          >
            Sabah Namazı Kılındı
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => markNextPrayerOgle("ogle")}
          >
            Öğle Namazı Kılındı
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => markNextPrayerIkindi("ikindi")}
          >
            İkindi Namazı Kılındı
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => markNextPrayerAksam("aksam")}
          >
            Akşam Namazı Kılındı
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => markNextPrayerYatsi("yatsi")}
          >
            Yatsı Namazı Kılındı
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateCalculator
