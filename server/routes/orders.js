const express = require("express");
const router = express.Router();
const db = require("../db");

// สร้างออเดอร์ใหม่ พร้อม shippingMethod
router.post("/", async (req, res) => {
  const { items, address, shippingMethod, totalPrice, userId } = req.body;

  if (!shippingMethod) {
    return res.status(400).json({ message: "Shipping method is required" });
  }

  try {
    // บันทึก order (ตัวอย่างใช้ SQLite/MySQL)
    const result = await db.query(
      "INSERT INTO orders (user_id, address, shipping_method, total_price, created_at) VALUES (?, ?, ?, ?, datetime('now'))",
      [userId, address, shippingMethod, totalPrice]
    );
    const orderId = result.insertId || result.lastID;

    // (ถ้ามีตาราง order_items ให้บันทึกสินค้าด้วย)
    // for (const item of items) {
    //   await db.query(
    //     "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
    //     [orderId, item.productId, item.quantity, item.price]
    //   );
    // }

    res.status(201).json({ success: true, orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await db.query('SELECT * FROM orders');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

// Get a specific order by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const order = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
      if (order.length > 0) {
          res.status(200).json(order[0]);
      } else {
          res.status(404).json({ error: "Order not found" });
      }
  } catch (error) {
      res.status(500).json({ error: "Failed to retrieve order" });
  }
});

// Update an order
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
      const result = await db.query("UPDATE orders SET quantity = ? WHERE id = ?", [quantity, id]);
      if (result.affectedRows > 0) {
          res.status(200).json({ message: "Order updated successfully" });
      } else {
          res.status(404).json({ error: "Order not found" });
      }
  } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
  }
});

// Delete an order
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query("DELETE FROM orders WHERE id = ?", [id]);
      if (result.affectedRows > 0) {
          res.status(200).json({ message: "Order deleted successfully" });
      } else {
          res.status(404).json({ error: "Order not found" });
      }
  } catch (error) {
      res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;