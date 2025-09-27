const express = require("express");
const router = express.Router();

const order = require("../Models/OrderModel");

// CRUD operation

// Create

router.post("/order", async (req, res) => {
  try {
    const data = req.body;
    const newOrder = new order(data);
    await newOrder.save();
    res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (err) {
    console.log("Order creating error", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Read

router.get("/order", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const orderData = await order.find({ userEmail: email });
    if (!order || order.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order Data not found",
      });
    }
    res.status(200).json({
      success: true,
      Data: orderData,
    });
  } catch (err) {
    console.log("Order creating error", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.put("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updateOrder = await order.findByIdAndUpdate(id, updateData, {
        new: true, // return update document
        runValidators: true // validate based on scheam
    })

    if(!updateOrder) {
        return res.status(400).json({
            success: false,
            message: "Order not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: updateOrder
    })
  } catch (err) {
    console.error("Update Error", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//  DELETE

router.delete("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const delteOrder = await order.findByIdAndDelete({ _id: id });
    if (!delteOrder) {
      return res.status(400).json({ message: "Order not found to dlete" });
    }
    res.status(204).json({
      success: true,
      message: "Order delted Successfully",
    });
  } catch (err) {
    console.log("Order deleting error", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;