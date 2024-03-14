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
    // Eğer tarih seçilmediyse, ibadetleri sıfırla
    if (!tarih) {
      setIbadetler({
        sabah: false,
        ogle: false,
        ikindi: false,
        aksam: false,
        yatsi: false,
      })
      return // Geri kalan işlemleri yapmadan useEffect'ten çık
    }

    const fetchIbadetler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/ibadet-bilgisi/${tarih}`
        )
        if (response.data) {
          setIbadetler(response.data)
        }
      } catch (error) {
        console.error("İbadet bilgisi alınırken bir hata oluştu:", error)
      }
    }

    // Yeni bir tarih seçildiğinde ibadetleri sıfırla
    setIbadetler({
      sabah: false,
      ogle: false,
      ikindi: false,
      aksam: false,
      yatsi: false,
    })

    fetchIbadetler()
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
      <ul>
        {Object.keys(ibadetler).map((ibadet, index) => {
          let ibadetSayisi = ibadetler[ibadet] ? "Kılındı" : ""
          if (["sabah", "ogle", "ikindi", "aksam", "yatsi"].includes(ibadet)) {
            return (
              <li key={index}>
                {ibadet} - {ibadetSayisi}
              </li>
            )
          }
          return null // Diğer ibadetler için listeleme yapma
        })}
        {/* Tüm ibadetler boşsa gösterilecek içerik */}
        {Object.values(ibadetler).every(value => value === false) && (
          <li>Tarih için veri bulunamadı.</li>
        )}
      </ul>
      <div className="col-md-6">
        <label htmlFor="tarih">Tarih:</label>
        <input
          type="date"
          id="tarih"
          value={tarih}
          className="form-control"
          onChange={e => setTarih(e.target.value)}
        />

        <div>
          <button
            onClick={() => handleIbadetClick("sabah")}
            className="btn btn-primary"
          >
            Sabah
          </button>
          <button
            onClick={() => handleIbadetClick("ogle")}
            className="btn btn-primary"
          >
            Öğlen
          </button>
          <button
            onClick={() => handleIbadetClick("ikindi")}
            className="btn btn-primary"
          >
            İkindi
          </button>
          <button
            onClick={() => handleIbadetClick("aksam")}
            className="btn btn-primary"
          >
            Akşam
          </button>
          <button
            onClick={() => handleIbadetClick("yatsi")}
            className="btn btn-primary"
          >
            Yatsı
          </button>
        </div>

        <button className="btn btn-primary" onClick={handleIbadetKaydet}>
          İbadet Bilgisini Kaydet
        </button>
      </div>
    </div>
  )
}

export default App
