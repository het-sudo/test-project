import React, { useState } from 'react'

function Products() {
  const products=[
    {id:1,name:"laptop",category:"electronics",price:200},
    {id:2,name:"phone",category:"electronics",price:2000},
    {id:3,name:"shirt",category:"clothing",price:20000},
  ]

  const [category,setcategory]=useState("all")
  const [sort,setsort]=useState("none")
  
  let filtered=[...products]
  
  if(filtered!=='all')

    filtered=filtered.filter(p=>p.category===category)

  if(sort==='low')
    filtered.sort((a,b)=>a.price-b.price)

  else if(sort==='high')
    filtered.sort((a,b)=>b.price-a.price)
  return (
    <div>
     <h1>Products Filter</h1>
    <select value={category} onChange={(e)=>setcategory(e.target.value)} name="" id="">
  <option value="all">All</option>
  <option value="electronics">Electronics</option>
  <option value="clothing">clothing</option>

    </select>

    <select value={sort} onChange={(e)=>setsort(e.target.value)} name="" id="">
  <option value="none">none</option>
  <option value="high">desc</option>
  <option value="low">asc</option>

    </select>

    

{
  filtered.length===0?
  (<>No products</> ): (
   filtered.map((p)=>
  <li key={p.id}>{p.name} - {p.price}</li>
  )
  )
}
     


    </div>
  )
}

export default Products