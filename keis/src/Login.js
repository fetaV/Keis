import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post("http://localhost:4001/login", { email, password })
      .then(result => {
        console.log(result)
        if (result.status === 200) {
          navigate("/profilepage")
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          toast.error("Kullanıcı adı veya Parola hatalı.")
          return false
        }
      })
  }
  return (
    <div>
      <h1>Login</h1>
      <>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-4">
              <form>
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
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={email !== "" && password !== "" ? false : true}
                >
                  Submit
                </button>
                <Link to="/" type="submit" className="btn btn-primary">
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
