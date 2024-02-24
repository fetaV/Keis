import React from "react"

export const Menu = () => {
  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav
              aria-label="breadcrumb"
              className="bg-light rounded-3 p-3 mb-4"
            >
              <div class="d-flex justify-content-end">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item active" aria-current="page">
                    <h6>KEIS</h6>
                  </li>
                </ol>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">
          <div class="list-group list-group-light px-2">
            <a
              href="/profile"
              class="list-group-item list-group-item-action px-3 border-0 rounded-3 active mb-2"
            >
              Profil
            </a>
            <a
              href="/training"
              class="list-group-item list-group-item-action px-3 border-0 rounded-3  mb-2"
            >
              Antrenman
            </a>
            <a
              href="/quests"
              class="list-group-item list-group-item-action px-3 border-0 rounded-3  mb-2"
            >
              Görevler
            </a>
            <a
              href="/market"
              class="list-group-item list-group-item-action px-3 border-0 rounded-3  mb-2"
            >
              Market
            </a>
            <a
              href="/market"
              class="btn btn-outline-danger text-start px-3 border-0 rounded-3  mb-2"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
