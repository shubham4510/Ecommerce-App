import React, { createContext, useCallback, useEffect, useState,useMemo } from "react";
import toast from "react-hot-toast";

export const ShopContext = createContext(null);
const url = `http://localhost:4000`;

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null);
  const [cart,setCart] = useState([]); //Cart state
  const [showSearchBar,setShowSearchBar] = useState(false)



    // ADD PRODUCT
    const addProduct = async (productData) => {
      try {
  
          const response = await fetch(`${url}/api/product/add`, {
              method: "POST",
              body: productData, // ✅ Send FormData directly
          });
  
          if (!response.ok) {
              throw new Error("All fields are required");
          }
  
          const data = await response.json();
          return data;
      } catch (error) {
          toast.error(error.message, {
              duration: 3000,
              position: "bottom-right",
          });
      }
  };
  
    //PLACE ORDER
    const placeOrder = async (orderData)=>{
      try {
        const response = await fetch(`${url}/api/order/add`,{
          method:"POST",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
          },
          body: JSON.stringify(orderData)
        })

        if(!response.ok){
          throw new Error("All fields are required and email should be unique")
        }

        const data = await response.json()
        setCart([]); // Clears the cart
        localStorage.removeItem("cart");
        toast.success(data.message,{
          duration:3000,
          position:"bottom-right"
        })
        return data;
      } catch (error) {
        return toast.error(error.message, {
          duration: 3000,
          position: "bottom-right",
        });
      }
    };

    //COUNT ITEM IN CART
    const totalQuantity = useMemo(() => {
      return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]); // Only updates when cart changes


    //COUNT TOTAL REVENUE
    const totalPrice = useMemo(() => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]); // Recomputes only when `cart` changes

    //User Signup
    const signup = async (userDetails) => {
      try {
        const response = await fetch(`${url}/api/user/signup`, {
          method: "POST",
          headers: {
            "Accept": "application/jsond",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        });
    
        if (!response.ok) throw new Error("Invalid credentials");
    
        const data = await response.json();
        toast.success(data.message, { duration: 3000, position: "bottom-right" });
        return data;
      } catch (error) {
        toast.error(error.message, { duration: 3000, position: "bottom-right" });
        return null; // Return null if there's an error
      }
    };
    
    //FETCH ORDERS
    const fetchOrders = async () => {
      try {
          const response = await fetch(`${url}/api/order/get`, {
              method: "GET",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json();
          if (data.success) {
              return data.orders  
          }
      } catch (error) {
          console.error("Error fetching orders:", error);
          return toast(error.message)
      }
  };
    //FETCH FULL ORDER DETAILS
    const fetchFullOrderDetails = async () => {
      try {
          const response = await fetch(`${url}/api/order/details/get`, {
              method: "GET",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json();
          if (data.success) {
              return data.orders  
          }
      } catch (error) {
          console.error("Error fetching orders:", error);
          return toast(error.message)
      }
  };

  
    

    //User Login
    const login = async (userDetails)=>{
      try {
        const response = await fetch(`${url}/api/user/login`,{
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          method:"POST",
          body:JSON.stringify(userDetails)
        })
        if(!response.ok){
          throw new Error("Invalid credentials")
        }

        const data = await response.json()
         setUser(data.user.role)
        if(data.success){
          toast.success("Login successfully",{
            duration:3000,
            position:"bottom-right"
          })
        }
        return data
        
      } catch (error) {
        return toast.error(error.message)

      }
    }

    //REMOVE PRODUCT
    const deleteProduct = async (id) => {
      try {
        const response = await fetch(`${url}/api/product/delete/${id}`,
         { method:'DELETE',
          credentials:'include',
        })
        const data = await response.json()

        if(data){
          return toast.success(data.message,{
            position:'bottom-right',
            duration:3000
          })
        }else{
          throw new Error("Unable to delete product")
        }
        
      } catch (error) {
        return toast.error(error.message,{
        duration:3000,
        position:'bottom-right'
        })
      }
    }

    //Logout
    const logout = async () => {
      try {
        const response = await fetch(`${url}/api/user/logout`, {
          method: 'DELETE',
          credentials: 'include', // Make sure the cookie is included
        });
    
        if (response.ok) {
          // Handle successful logout, e.g., redirect to the login page
          window.location.href = '/login';  // Or use any other navigation method you prefer
          setUser(null);
          setCart([]); // Clears the cart
          localStorage.removeItem("cart");
        } else {
          throw new Error("Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error.message);
      }
    };
    
    
    

    // Add to Cart
    const addToCart = (product) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === product._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
            // If new product, add with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      });
    };
  
    // Remove from Cart
    const removeFromCart = (productId) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item._id !== productId);
        if (updatedCart.length === 0) {
          localStorage.removeItem("cart");
        } else {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
        return updatedCart;
      });
    };
    
    
  
    // Update Quantity
    const updateQuantity = (productId, quantity) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    };
    
    const updateOrderStatus = async (orderId,itemId,status) => {
      try {
        const response = await fetch(`${url}/api/order/status`,{
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body: JSON.stringify({orderId,itemId,status})})
          if(!response.ok){
            throw new Error("Failed to update order status")
          }
          const data = await response.json()
          return data.message;
        } catch (error) {
        return toast.error(error.message,{
          duration:3000,
          position:'bottom-right'
        })
      }
    }

  const getAllProducts = async () => {
    try {
      const result = await fetch(`${url}/api/product/all`);
      const data = await result.json();
      if (data && data.products?.length) {
        return data.products;
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getProductById = useCallback(
    (id) => products.find((product) => product._id === id),
    [products]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
      setLoading(false);
    };
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);

    fetchProducts();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);
  

  const contextValue = {
    products,
    getAllProducts,
    url,
    getProductById,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    signup,
    login,
    logout,
    user,
    totalQuantity,
    totalPrice,
    placeOrder,
    fetchOrders,
    deleteProduct,
    fetchFullOrderDetails,
    addProduct,
    updateOrderStatus,
    showSearchBar,
    setShowSearchBar
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
