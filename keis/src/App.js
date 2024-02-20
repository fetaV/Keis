import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./Signup"
import { Login } from "./Login"
import { Table } from "./Table"
import { ProfilePage } from "./ProfilePage"

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/table" element={<Table />}></Route>
          <Route path="/profilepage" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
