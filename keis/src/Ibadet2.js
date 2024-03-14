// react kodum
import React, { useState } from "react"
import axios from "axios"

function App() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleAddData = async () => {
    try {
      const startDateObj = new Date(startDate)
      const endDateObj = new Date(endDate)
      const year = startDateObj.getFullYear()

      const newData = {
        months: {},
      }

      // Yalnızca seçilen ay içine istenen veriler ekleniyor
      for (
        let date = new Date(startDate);
        date <= endDateObj;
        date.setDate(date.getDate() + 1)
      ) {
        const month = date.getMonth()
        const monthName = getMonthName(month)
        const formattedDate = formatDate(date)
        if (!newData.months[monthName]) {
          newData.months[monthName] = { days: {} }
        }
        newData.months[monthName].days[formattedDate] = {
          sabah: false,
          ogle: false,
          ikindi: false,
          aksam: false,
          yatsi: false,
        }
      }

      await axios.post(`http://localhost:4001/api/addData/${year}`, newData)
      console.log("Data added successfully")
    } catch (error) {
      console.error("Error adding data:", error)
    }
  }

  // Sayısal ayı isimle eşleştiren fonksiyon
  const getMonthName = month => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return monthNames[month]
  }

  // Tarihi "YYYY-MM-DD" formatına dönüştüren yardımcı fonksiyon
  const formatDate = date => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  return (
    <div>
      <h1>Data Entry App</h1>
      <label htmlFor="start-date">Start Date:</label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <label htmlFor="end-date">End Date:</label>
      <input
        type="date"
        id="end-date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />
      <button onClick={handleAddData}>Add Data</button>
    </div>
  )
}

export default App
