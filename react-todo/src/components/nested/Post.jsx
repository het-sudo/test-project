import React from 'react'
import Commentlist from './Commentlist'

function Post({title,content,author,comments}) {
  return (
    <div>
        <h1>{title}</h1>
        <h1>{content}</h1>
        <h1>{author}</h1>
        <Commentlist comments={comments}/>
    </div>
  )
}

export default Post