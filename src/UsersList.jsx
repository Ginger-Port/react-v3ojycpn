import React, {memo, useCallback,useEffect, useState} from "react"

const UsersList = ({users, sorting, priceSorting}) => {

  console.log("child render")

  return (
    <>
    <div>
      <input type="text" placeholder="search name" />
      <button onClick={sorting}>Sort by <b>Asce/Desc</b></button>
      <button onClick={priceSorting}>Sort by <b>$$$</b></button>
      </div>
    <ul style={{border: "1px solid", background: "lightblue"}}>
  {
    users.length > 0 && users.map(user => (<li key={user.id} style={{listStyle: "none", margin: "0.5em 0", background: "darkslategrey", color: "white", padding: "0.1em 1em"}}>{user.name}</li>))
  }
  </ul>
    </>
  )
}

export default memo(UsersList)