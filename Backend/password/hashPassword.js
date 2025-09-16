const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const hashed = await bcrypt.hash(password, 10); // 10 is salt rounds
  console.log("Hashed password:", hashed);
}

hashPassword("Anurag@12345");
