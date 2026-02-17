import React from 'react'

function Comment({author,text,timestamp}) {
  return (
    <div>
        <h1>{author}</h1>
        <h1>{text}</h1>
        <h1>{timestamp}</h1>
    </div>
  )
}

export default Comment