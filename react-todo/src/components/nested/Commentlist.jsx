import React from 'react'
import Comment from './Comment'

function Commentlist({comments}) {
  return (
    <div>
        {
            comments.map((comment)=>(
                <Comment key={comment.id}
                author={comment.author}
                text={comment.text}
                timestamp={comment.timestamp}
                />
            ))
        }
    </div>
  )
}

export default Commentlist