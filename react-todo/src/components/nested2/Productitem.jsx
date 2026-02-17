import React from 'react'

function Productitem({products}) {

  return (
    <div>
     {products.name} - {products.price}
    </div>
  )
}

export default Productitem