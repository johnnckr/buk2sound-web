const express = require("express");
const router = express.Router();
const { sendResetEmail } = require("../utils/email");
const db = require("../db");
const crypto = require("crypto");

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  // ตรวจสอบว่ามี email นี้ในระบบหรือไม่
  // สร้าง token สำหรับ reset password
  const token = crypto.randomBytes(32).toString("hex");
  // บันทึก token ลง db (ตัวอย่าง)
  await db.query("UPDATE users SET reset_token = ? WHERE email = ?", [token, email]);
  // ส่งอีเมล (mock)
  await sendResetEmail(email, `https://yourdomain.com/reset-password/${token}`);
  res.json({ message: "If your email exists, a reset link has been sent." });
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  // ตรวจสอบ token และอัปเดตรหัสผ่านใหม่ (hash ก่อนบันทึก)
  // ลบ token หลังใช้งาน
  res.json({ message: "Password reset successful" });
});

module.exports = router;