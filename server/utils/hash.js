const bcrypt = require("bcrypt");
exports.hashPassword = (pw) => bcrypt.hash(pw, 10);
exports.comparePassword = (pw, hash) => bcrypt.compare(pw, hash);

// สมัคร
const hash = await hashPassword(password);
// ล็อกอิน
const match = await comparePassword(password, user.password);