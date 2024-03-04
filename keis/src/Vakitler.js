import React, { useState } from "react"

function DateCalculator() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [sabahNamazi, setSabahNamazi] = useState(null)
  const [ogleNamazi, setOgleNamazi] = useState(null)
  const [ikindiNamazi, setIkindiNamazi] = useState(null)
  const [aksamNamazi, setAksamNamazi] = useState(null)
  const [yatsiNamazi, setYatsiNamazi] = useState(null)
  const [calendarDates, setCalendarDates] = useState([])
  const [prayedDates, setPrayedDates] = useState([])

  const handleCalculate = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const oneDay = 24 * 60 * 60 * 1000
    const diffDays = Math.round(Math.abs((start - end) / oneDay))

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
    let currentDate = new Date(start)
    while (currentDate <= end) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    setCalendarDates(dates)
    setPrayedDates(new Array(dates.length).fill(false))
  }

  const markDateAsPrayed = index => {
    const updatedPrayedDates = [...prayedDates]
    updatedPrayedDates[index] = true
    setPrayedDates(updatedPrayedDates)
  }

  const markNextDateAsPrayed = () => {
    const nextIndex = prayedDates.findIndex(date => !date)
    if (nextIndex !== -1) {
      markDateAsPrayed(nextIndex)
    }
    setSabahNamazi(sabahNamazi - 2)
  }

  return (
    <div>
      <h2>Tarih Aralığı Gün Hesaplayıcı</h2>
      <div>
        <label>Başlangıç Tarihi:</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>Bitiş Tarihi:</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Hesapla</button>
      <div className="calendar">
        {calendarDates.map((date, index) => (
          <div key={index} className="calendar-cell">
            <p className="calendar-date">{date.getDate()}</p>
            {prayedDates[index] && (
              <span style={{ color: "blue", fontSize: "10px" }}>
                Sabah Namazı Kılındı!
              </span>
            )}
          </div>
        ))}
      </div>
      {sabahNamazi !== null && (
        <p>
          Sabah Namazı: {sabahNamazi} rekat{" "}
          <button
            className="btn btn-primary btn-sm"
            onClick={markNextDateAsPrayed}
          >
            Kılındı
          </button>
        </p>
      )}
      {ogleNamazi !== null && <p>Öğle Namazı: {ogleNamazi} rekat</p>}
      {ikindiNamazi !== null && <p>İkindi Namazı: {ikindiNamazi} rekat</p>}
      {aksamNamazi !== null && <p>Akşam Namazı: {aksamNamazi} rekat</p>}
      {yatsiNamazi !== null && <p>Yatsı Namazı: {yatsiNamazi} rekat</p>}
    </div>
  )
}

export default DateCalculator
