import React from 'react'
import "./User.css"

const User = () => {
  return (
    <>
    <div className="friend">
            <div className="profile">
            <div className="imgBox">
              <img src="" alt="" />
            </div>
            <p>Anil Jaiswal</p>
            </div>
            <div className="friendSign" onClick={()=>patchFriend()}>+</div>
          </div>
    </>
  )
}

export default User