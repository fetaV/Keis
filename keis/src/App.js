import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./Signup"
import { Login } from "./Login"
import { Table } from "./Table"
import { ProfilePage } from "./ProfilePage"
import TwoAndFourEveryDayCounter from "./Vakitler"
import Ibadet from "./Ibadet"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/profilepage" element={<ProfilePage />}></Route>
          <Route
            path="/vakitler"
            element={<TwoAndFourEveryDayCounter />}
          ></Route>
          <Route path="/ibadet" element={<Ibadet />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
