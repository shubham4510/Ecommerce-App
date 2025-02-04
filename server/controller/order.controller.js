const Order = require('../model/order.model')

const getAllOrders = async (req,res) => {
    try {
        const allOrders = await Order.find().select("items")

        return res.status(200).json({
            success:true,
            message:"All orders list",
            orders:allOrders
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while fetching orders",
            error:error.message
        })
    }
}

const getFullOrderDetails = async (req,res) => {
    try {
        const allOrders = await Order.find()

        return res.status(200).json({
            success:true,
            message:"All orders list",
            orders:allOrders
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while fetching orders",
            error:error.message
        })
    }
}

const addOrder = async (req,res) => {
    
    try {
        let {firstName, lastName, email,street,city,state,zipcode,country,phone,totalQuantity,totalRevenue,items} = req.body
        
        // Trim all string values
        firstName = firstName?.trim();
        lastName = lastName?.trim();
        email = email?.trim();
       street = street?.trim();
       city = city?.trim();
       state = state?.trim();
       zipcode = zipcode?.trim();
       country = country?.trim();
       phone = parseInt(phone.trim());
       
       // Check for missing values
        if(!(firstName && lastName && email && street && city && state && zipcode && country && phone)){
       return res.status(400).json({
               success: false,
               message: "All fields are required"
           });
       }


         // Validate items (to store ordered products)
         if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one item is required in the order",
            });
        }

         // Create new order
         const newOrder = await Order.create({
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode,
            country,
            phone,
            totalQuantity,
            totalRevenue,
            status: "Order Placed",  // Initial Status
            items,
        });


        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder,  // Send order back for tracking
        });
   
        
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"Error while placing orders",
            error:error.message
        })
    }
}

const getStatusOfOrders = async (req,res)=>{
    try {
        const statusOfOrders = await Order.find().select('status')

        return res.status(200).json({
            success:true,
            message:"Status list here",
            allStatus:statusOfOrders
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while getting orders status",
            error:error.message
        })
    }
}
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, itemId, status } = req.body;

        if (!orderId || !itemId || !status) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "items._id": itemId },  // Find the order and item inside it
            { $set: { "items.$.status": status } },  // Update the item's status
            { new: true }  // Return updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order or Item not found" });
        }

        res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });

    } catch (error) {
        console.error("Error updating item status:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


module.exports = {
    addOrder,
    getAllOrders,
    getStatusOfOrders,
    updateOrderStatus,
    getFullOrderDetails
}