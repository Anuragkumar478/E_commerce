const nodemailer = require("nodemailer");

const sendAdminEmail = async (order) => {
//   console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
// console.log("ADMIN_PASS:", process.env.ADMIN_PASS ? "LOADED" : "MISSING");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `🛍️ New Order Received (Order ID: ${order._id})`,
    html: `
      <h2>New Order Received</h2>
      <p><b>User phone:</b> ${order.user.phone}</p>
      <p><b>User email:</b> ${order.user.email}</p>
      <p><b>User name:</b> ${order.user.name}</p>
      <p><b>Order ID:</b> ${order._id}</p>
      <p><b>Total:</b> ₹${order.totalAmount}</p>
      <p><b>Shipping Address:</b> ${order.shippingAddress}</p>
      <p><b>Placed On:</b> ${new Date(order.createdAt).toLocaleString()}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items
          .map(
            (item) => `
            <li>
              ${item.product.name} (x${item.quantity}) - ₹${item.product.price}
            </li>`
          )
          .join("")}
      </ul>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendAdminEmail;
