import React, { useState } from 'react'

function State() {
    const [fname,setfname]=useState("")
    const [lname,setlname]=useState("")
    const [fullname,setfullname]=useState("")

    const handlefname=(e)=>{
     e.preventDefault()
     setfname(e.target.value)
     setfullname(e.target.value+''+lname);
    }

    const handlelname=(e)=>{
        e.preventDefault()
        setlname(e.target.value)
        setfullname(fname+''+e.target.value)
    }
  return (
    <div>

        enter name : <input type="text" value={fname} onChange={handlefname} />
        enter surname : <input type="text" value={lname} onChange={handlelname} />
        your name is {fullname}
    </div>
  )
}

export default State