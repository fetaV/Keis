import React, { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [tarih, setTarih] = useState("")
  const [ibadetler, setIbadetler] = useState({
    sabah: false,
    ogle: false,
    ikindi: false,
    aksam: false,
    yatsi: false,
  })

  useEffect(() => {
    const fetchIbadetler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/ibadet/${tarih}`
        )
        if (response.data) {
          setIbadetler(response.data)
        }
      } catch (error) {
        console.error("İbadet bilgisi alınırken bir hata oluştu:", error)
      }
    }

    if (tarih) {
      fetchIbadetler()
    }
  }, [tarih])

  const handleIbadetKaydet = async () => {
    try {
      await axios.post("http://localhost:4001/ibadet-kaydet", {
        tarih,
        ibadetler,
      })
      alert("İbadet bilgisi başarıyla kaydedildi.")
      setTarih("") // Formu sıfırla
    } catch (error) {
      alert("İbadet bilgisi kaydedilirken bir hata oluştu.")
    }
  }

  const handleIbadetClick = ibadet => {
    setIbadetler(prevState => ({
      ...prevState,
      [ibadet]: !prevState[ibadet],
    }))
  }

  return (
    <div>
      <label htmlFor="tarih">Tarih:</label>
      <input
        type="date"
        id="tarih"
        value={tarih}
        onChange={e => setTarih(e.target.value)}
      />

      <div>
        <button
          onClick={() => handleIbadetClick("sabah")}
          className={ibadetler.sabah ? "active" : ""}
        >
          Sabah
        </button>
        <button
          onClick={() => handleIbadetClick("ogle")}
          className={ibadetler.ogle ? "active" : ""}
        >
          Öğlen
        </button>
        <button
          onClick={() => handleIbadetClick("ikindi")}
          className={ibadetler.ikindi ? "active" : ""}
        >
          İkindi
        </button>
        <button
          onClick={() => handleIbadetClick("aksam")}
          className={ibadetler.aksam ? "active" : ""}
        >
          Akşam
        </button>
        <button
          onClick={() => handleIbadetClick("yatsi")}
          className={ibadetler.yatsi ? "active" : ""}
        >
          Yatsı
        </button>
      </div>

      <button onClick={handleIbadetKaydet}>İbadet Bilgisini Kaydet</button>
    </div>
  )
}

export default App
