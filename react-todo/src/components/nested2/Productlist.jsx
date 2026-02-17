import React from 'react'
import Productitem from './Productitem';

function Productlist({products}) {
    const product=[
        {id:1,name:"apple",price:599},
        {id:2,name:"orange",price:699},
    ];

  return (
    <div>

        {
            product.map((p)=>
            <Productitem key={p.id} products={p}/>
            )
        }
    </div>
  )
}

export default Productlist