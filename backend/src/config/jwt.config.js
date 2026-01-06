// src/config/jwt.config.js
// ==========================================
module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE || "7d",

  // Generate token payload
  generatePayload: (user) => {
    return {
      nguoi_dung_id: user.nguoi_dung_id,
      email: user.email,
      ho_ten: user.ho_ten,
    };
  },
};

// ==========================================
