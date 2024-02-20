import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    let requestBody = {
      name,
      email,
      password,
    }
    try {
      axios
        .post("http://localhost:4001/register", requestBody)
        .then(res => {
          console.log(res.data)
          navigate("/login")
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            toast.warning("Bu email zaten kullanılıyor.")
            return false
          } else {
            console.error("API çağrısı sırasında hata oluştu: ", error.message)
          }
        })
    } catch (error) {
      console.error("API çağrısı sırasında hata oluştu: ", error.message)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputName"
                    onChange={e => {
                      setName(e.target.value)
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    onChange={e => {
                      setPassword(e.target.value)
                    }}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                  disabled={
                    email !== "" && name !== "" && password !== ""
                      ? false
                      : true
                  }
                >
                  Submit
                </button>
                <Link to="/login" type="submit" className="btn btn-primary">
                  Login
                </Link>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
