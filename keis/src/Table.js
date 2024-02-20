import React, { useState, useEffect } from "react"
import axios from "axios"
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Table = () => {
  const [name] = useState("")
  const [email] = useState("")
  const [password] = useState("")
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [dataList, setDataList] = useState([])
  const [activeModalId, setActiveModalId] = useState(null)
  const userId = activeModalId

  useEffect(() => {
    axios
      .get("http://localhost:4001/register")
      .then(response => {
        setDataList(response.data)
      })
      .catch(error => {
        console.error("API çağrısı sırasında hata oluştu: ", error)
      })
  }, [])

  const openModal = (id, user) => {
    setNewName(user.name)
    setNewEmail(user.email)
    setNewPassword(user.password)
    setActiveModalId(id)
    console.log(id)
  }
  const cancelModal = id => {
    setActiveModalId(id)
    console.log(id)
  }

  const saveChanges = async () => {
    let requestBody = {
      activeModalId,
      name: newName,
      email: newEmail,
      password: newPassword,
    }

    console.log(requestBody)

    try {
      const response = await axios.put(
        `http://localhost:4001/register/${userId}`,
        requestBody
      )

      console.log(response)

      const updatedDataList = dataList.map(data => {
        if (data._id === userId) {
          console.log("1", data.name)
          return {
            ...data,

            name: name,
            email: email,
            password: password,
          }
        }
        return data
      })

      setDataList(updatedDataList)
      toast.success("Başarıyla kaydedildi")
      setActiveModalId(null)
    } catch (error) {
      console.error("API çağrısı sırasında hata oluştu: ", error)
    }
  }

  const deleteModal = async () => {
    try {
      await axios
        .delete(`http://localhost:4001/register/${userId}`)
        .then(response => {
          if (response.status === 200) {
            // Silinen kullanıcıyı filtreleyerek yeni kullanıcı listesini oluştur
            const updatedDataList = dataList.filter(data => data._id !== userId)
            setDataList(updatedDataList)
            toast.success("Kullanıcı başarıyla silindi.")
          } else {
            console.error("Kullanıcı silme işlemi başarısız oldu.")
          }
        })
      setInterval(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error("API çağrısı sırasında hata oluştu: ", error)
    }
  }

  return (
    <div>
      <>
        {/* Edit Modal Start*/}
        {dataList.map(data => (
          <div
            className="modal fade"
            id={`exampleModal${data._id}`}
            tabIndex={-1}
            aria-labelledby={`exampleModalLabel${data._id}`}
            aria-hidden="true"
            key={data._id}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id={`exampleModalLabel${data._id}`}
                  >
                    Kullanıcı Düzenle
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail2"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail2"
                        defaultValue={data.name}
                        onChange={e => {
                          e.preventDefault()
                          setNewName(e.target.value)
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        defaultValue={data.email}
                        onChange={e => {
                          setNewEmail(e.target.value)
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        defaultValue={data.password}
                        onChange={e => {
                          setNewPassword(e.target.value)
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
      <>
        {/* Delete Modal Start*/}
        {dataList.map(data => (
          <div
            className="modal fade"
            id={`exampleModal2${data._id}`}
            tabIndex={-1}
            aria-labelledby={`exampleModal2Label${data._id}`}
            aria-hidden="true"
            key={data._id}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id={`exampleModal2Label${data._id}`}
                  >
                    Are you sure delete user? <b>{data.name}</b>
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-footer d-flex justify-content-center align-items-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={deleteModal}
                    className="btn btn-danger"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>

      <h1>Table</h1>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Password</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                          alt=""
                          style={{ width: 45, height: 45 }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{user.name}</p>
                          <p className="text-muted mb-0">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">
                        {"*".repeat(user.password.length)}
                      </p>
                    </td>
                    <td>
                      <span className="btn btn-success rounded-pill d-inline">
                        Active
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                      >
                        <BsPencilSquare
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal${user._id}`}
                          size={20}
                          onClick={() => openModal(user._id, user)}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-sm btn-rounded"
                      >
                        <BsFillTrashFill
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal2${user._id}`}
                          onClick={() => cancelModal(user._id)}
                          size={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
