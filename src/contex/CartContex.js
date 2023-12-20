import { useState, useContext, createContext, useEffect } from "react";


const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);


  useEffect(()=>{
    let existingcart=localStorage.getItem("cart");
    if(existingcart) setcart(JSON.parse(existingcart))

  },[])



  
  return (
    <CartContext.Provider value={[cart, setcart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
