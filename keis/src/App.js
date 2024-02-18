import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"
import { FaCoins } from "react-icons/fa6"

function App() {
  const [gold, setGold] = useState(0)
  const [acceleration, setacceleration] = useState(0)
  const [speed, setspeed] = useState(0)
  const [grip, setgrip] = useState(0)
  const [durability, setdurability] = useState(0)
  const [progress, setProgress] = useState(0)
  const [working, setWorking] = useState(false)
  const toplamGuc = acceleration + speed + grip + durability
  
  const getImagePath = () => {
    const totalPower = acceleration + speed + grip + durability
    if (totalPower >= 0 && totalPower <= 2) {
      return "assets/car1.png";
    } else if (totalPower <= 4) {
      return "assets/car2.png";
    } else if (totalPower <= 6) {
      return "assets/car3.png";
    } else {
      return "assets/car4.png";
    }
  }
  const imagePath = getImagePath()

  useEffect(() => {
    let timer
    if (working && progress < 100) {
      timer = setTimeout(() => {
        setProgress(prevProgress => prevProgress + 1)
      }, 3)
    } else if (progress >= 100) {
      setGold(prevGold => prevGold + 15)
      setProgress(0)
      setWorking(false)
    }

    return () => clearTimeout(timer)
  }, [progress, working])

  const workingForGold = () => {
    // Fonksiyon çalıştığında ilerleme çubuğunu başlat
    setWorking(true)
  }

  const calculateCost = level => {
    let cost = 0
    for (let i = 0; i <= level; i++) {
      cost += Math.pow(2, i)
    }
    return cost
  }

  const decreaseacceleration = () => {
    const increaseAmount = acceleration + 1
    const cost = calculateCost(increaseAmount)
    if (gold >= cost) {
      setGold(prevGold => prevGold - cost)
      setacceleration(increaseAmount)
    }
  }

  const decreasespeed = () => {
    const increaseAmount = speed + 1
    const cost = calculateCost(increaseAmount)
    if (gold >= cost) {
      setGold(prevGold => prevGold - cost)
      setspeed(increaseAmount)
    }
  }

  const decreasegrip = () => {
    const increaseAmount = grip + 1
    const cost = calculateCost(increaseAmount)
    if (gold >= cost) {
      setGold(prevGold => prevGold - cost)
      setgrip(increaseAmount)
    }
  }

  const decreasedurability = () => {
    const increaseAmount = durability + 1
    const cost = calculateCost(increaseAmount)
    if (gold >= cost) {
      setGold(prevGold => prevGold - cost)
      setdurability(increaseAmount)
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <section style={{ backgroundColor: "#eee" }}>
              <div className="container py-5">
                <div className="row">
                  <div className="col">
                    <nav
                      aria-label="breadcrumb"
                      className="bg-light rounded-3 p-3 mb-4"
                    >
                      <div class="d-flex justify-content-end">
                        <ol class="breadcrumb mb-0">
                          <li
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            <FaCoins style={{ color: "#FFD43B" }} /> {gold}
                          </li>
                        </ol>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="row">
                  <div class="list-group list-group-light px-2">
                    <a
                      href="home"
                      class="list-group-item list-group-item-action px-3 border-0 rounded-3 active mb-2"
                    >
                      Profil
                    </a>
                    <a
                      href="home"
                      class="list-group-item list-group-item-action px-3 border-0 rounded-3  mb-2"
                    >
                      Antrenman
                    </a>
                    <a
                      href="home"
                      class="list-group-item list-group-item-action px-3 border-0 rounded-3  mb-2"
                    >
                      Görevler
                    </a>
                    <a
                      href="home"
                      class="list-group-item list-group-item-action px-3 border-0 rounded-3  mb-2"
                    >
                      Market
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="col-md-9">
            <section style={{ backgroundColor: "#eee" }}>
              <div className="container py-5">
                <div className="row">
                  <div className="col">
                    <nav
                      aria-label="breadcrumb"
                      className="bg-light rounded-3 p-3 mb-4"
                    >
                      <div class="d-flex justify-content-end">
                        <ol class="breadcrumb mb-0">
                          <li
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            <FaCoins style={{ color: "#FFD43B" }} /> {gold}
                          </li>
                        </ol>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card mb-4">
                      <div className="card-body text-center">
                        <img
                          src={imagePath}
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "100%" }}
                        />
                        <h5 className="my-3">John Smith</h5>
                        <p className="text-muted mb-1">Full Stack Developer</p>
                        <p className="text-muted mb-4">
                          Bay Area, San Francisco, CA
                        </p>
                        <div className="d-flex justify-content-center mb-2">
                          <button type="button" className="btn btn-primary">
                            Toplam Güç: {toplamGuc}
                          </button>
                          <div
                            className="btn btn-outline-primary ms-1"
                            onClick={workingForGold}
                          >
                            Çalış
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-4 mb-lg-0">
                      <div className="row">
                        <div className="">
                          <div className="card mb-4 mb-md-0">
                            <div className="card-body">
                              <p className="mb-4">
                                <span className="text-primary font-italic me-1">
                                  assigment
                                </span>{" "}
                                Project Status
                              </p>
                              <p
                                className="mb-1 d-flex justify-content-between align-items-center  "
                                style={{ fontSize: ".77rem" }}
                              >
                                <div>
                                  Acceleration (
                                  <FaCoins style={{ color: "#FFD43B" }} />{" "}
                                  {calculateCost(acceleration + 1)})
                                </div>
                                <div className="d-flex  align-items-center  ">
                                  {acceleration}
                                  <div className="btn" onClick={decreaseacceleration}>
                                    +
                                  </div>
                                </div>
                              </p>
                              <div
                                className="progress rounded"
                                style={{ height: 5 }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${acceleration}%` }}
                                  aria-valuenow={80}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <p
                                className="mb-1 d-flex justify-content-between align-items-center  "
                                style={{ fontSize: ".77rem" }}
                              >
                                <div>
                                  Speed (
                                  <FaCoins style={{ color: "#FFD43B" }} />{" "}
                                  {calculateCost(speed + 1)})
                                </div>
                                <div className="d-flex  align-items-center  ">
                                  {speed}
                                  <div className="btn" onClick={decreasespeed}>
                                    +
                                  </div>
                                </div>
                              </p>
                              <div
                                className="progress rounded"
                                style={{ height: 5 }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${speed}%` }}
                                  aria-valuenow={80}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <p
                                className="mb-1 d-flex justify-content-between align-items-center  "
                                style={{ fontSize: ".77rem" }}
                              >
                                <div>
                                  Grip (
                                  <FaCoins style={{ color: "#FFD43B" }} />{" "}
                                  {calculateCost(grip + 1)})
                                </div>
                                <div className="d-flex  align-items-center  ">
                                  {grip}
                                  <div className="btn" onClick={decreasegrip}>
                                    +
                                  </div>
                                </div>
                              </p>
                              <div
                                className="progress rounded"
                                style={{ height: 5 }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${grip}%` }}
                                  aria-valuenow={80}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                              <p
                                className="mb-1 d-flex justify-content-between align-items-center  "
                                style={{ fontSize: ".77rem" }}
                              >
                                <div>
                                  Durability (
                                  <FaCoins style={{ color: "#FFD43B" }} />{" "}
                                  {calculateCost(durability + 1)})
                                </div>
                                <div className="d-flex  align-items-center  ">
                                  {durability}
                                  <div className="btn" onClick={decreasedurability}>
                                    +
                                  </div>
                                </div>
                              </p>
                              <div
                                className="progress rounded"
                                style={{ height: 5 }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{ width: `${durability}%` }}
                                  aria-valuenow={80}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Full Name</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">Johnatan Smith</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Email</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              example@example.com
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Phone</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">(097) 234-5678</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Mobile</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">(098) 765-4321</p>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <p className="mb-0">Address</p>
                          </div>
                          <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              Bay Area, San Francisco, CA
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card mb-4 mb-md-0">
                          <div className="card-body">
                            <p className="mb-4">
                              <span className="text-primary font-italic me-1">
                                assigment
                              </span>{" "}
                              Project Status
                            </p>
                            <p
                              className="mb-1 d-flex justify-content-between align-items-center  "
                              style={{ fontSize: ".77rem" }}
                            >
                              <div>
                                Acceleration (<FaCoins style={{ color: "#FFD43B" }} />{" "}
                                {calculateCost(acceleration + 1)})
                              </div>
                              <div className="d-flex  align-items-center  ">
                                {acceleration}
                                <div className="btn" onClick={decreaseacceleration}>
                                  +
                                </div>
                              </div>
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${acceleration}%` }}
                                aria-valuenow={80}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              Website Markup
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "72%" }}
                                aria-valuenow={72}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              One Page
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "89%" }}
                                aria-valuenow={89}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              Mobile Template
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "55%" }}
                                aria-valuenow={55}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              Backend API
                            </p>
                            <div
                              className="progress rounded mb-2"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "66%" }}
                                aria-valuenow={66}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card mb-4 mb-md-0">
                          <div className="card-body">
                            <p className="mb-4">
                              <span className="text-primary font-italic me-1">
                                assigment
                              </span>{" "}
                              Project Status
                            </p>
                            <p className="mb-1" style={{ fontSize: ".77rem" }}>
                              Web Design
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "80%" }}
                                aria-valuenow={80}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              Website Markup
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "72%" }}
                                aria-valuenow={72}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              One Page
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "89%" }}
                                aria-valuenow={89}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              Mobile Template
                            </p>
                            <div
                              className="progress rounded"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "55%" }}
                                aria-valuenow={55}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <p
                              className="mt-4 mb-1"
                              style={{ fontSize: ".77rem" }}
                            >
                              Backend API
                            </p>
                            <div
                              className="progress rounded mb-2"
                              style={{ height: 5 }}
                            >
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "66%" }}
                                aria-valuenow={66}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          style={{
            backgroundColor: "lightgray",
            height: "20px",
            width: `${progress}%`,
          }}
        ></div>
        <FaCoins /> {gold}
        <div className="row">
          <div className="col-md-2">
            <div>
              <div>
                Acceleration (<FaCoins style={{ color: "#FFD43B" }} />{" "}
                {calculateCost(acceleration + 1)})
              </div>
              <div className="btn" onClick={decreaseacceleration}>
                +
              </div>
              {acceleration}
            </div>
            <div>
              <div>
                Speed (<FaCoins style={{ color: "#FFD43B" }} />{" "}
                {calculateCost(speed + 1)})
              </div>
              <div className="btn" onClick={decreasespeed}>
                +
              </div>
              {speed}
            </div>
            <div>
              <div>
                Grip (<FaCoins style={{ color: "#FFD43B" }} />{" "}
                {calculateCost(grip + 1)})
              </div>
              <div className="btn" onClick={decreasegrip}>
                +
              </div>
              {grip}
            </div>
            <div>
              <div>
                Durability (<FaCoins style={{ color: "#FFD43B" }} />{" "}
                {calculateCost(durability + 1)})
              </div>
              <div className="btn" onClick={decreasedurability}>
                +
              </div>
              {durability}
            </div>
          </div>
          <div className="btn" onClick={workingForGold}>
            Çalış
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
