import React from "react"
import { Menu } from "./Menu"
import { Profile } from "./Profile"

export const ProfilePage = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <section style={{ backgroundColor: "#eee" }}>
              <Menu />
            </section>
          </div>
          <div className="col-md-9">
            <section style={{ backgroundColor: "#eee" }}>
              <Profile />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
