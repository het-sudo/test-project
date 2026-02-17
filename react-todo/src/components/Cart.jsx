import React, { useState } from 'react'
import "../App.css";


function Cart() {
 const products = [
     { id: 1, name: "Shirt", price: 500 },
     { id: 2, name: "Shoes", price: 1200 },
     { id: 3, name: "Watch", price: 2000 }
   ];
 
   const [cart, setCart] = useState([]);
 
   const addToCart = (product) => {
     const existingItem = cart.find((item) => item.id === product.id);
 
     if (existingItem) {
       setCart( cart.map((item) =>item.id === product.id? { ...item, quantity: item.quantity + 1 } : item
         )
       );
     } else {
       setCart([...cart, { ...product, quantity: 1 }]);
     }
   };
   

   const increaseQty = (id) => {
     setCart(cart.map((item) =>item.id === id ? { ...item, quantity: item.quantity + 1 } : item
       )
     );
   };


 
   const decreaseQty = (id) => {
     setCart(cart.map((item) =>item.id === id ? { ...item, quantity: item.quantity - 1 }: item)
         .filter((item) => item.quantity > 0)
     );
   };
 
   const totalPrice = cart.reduce(
     (total, item) => total + item.price * item.quantity,
   );
 
   return (
     <div className="container">
       <h2>Products</h2>
 
       <div className="products">
         {products.map((product) => (
           <div key={product.id} className="card">
             <h4>{product.name}</h4>
             <p>₹{product.price}</p>
             <button onClick={() => addToCart(product)}>
               Add to Cart
             </button>
           </div>
         ))}
       </div>
 
       <h2>Cart</h2>
 
       {cart.length === 0 ? (
         <p>Cart is empty</p>
       ) : (
         <div>
           {cart.map((item) => (
             <div key={item.id} className="cart-item">
               <span>
                 {item.name} (₹{item.price})
               </span>
 
               <div>
                 <button onClick={() => decreaseQty(item.id)}>-</button>
                 <span>{item.quantity}</span>
                 <button onClick={() => increaseQty(item.id)}>+</button>
               </div>
             </div>
           ))}
 
           <h3>Total: ₹{totalPrice}</h3>
         </div>
       )}
     </div>
   );
}

export default Cart