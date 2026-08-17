const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendAdminEmail = async (order) => {
  const itemsHtml = (order.items || [])
    .map(
      (item) => `
        <li>
          ${item.product.name}
          (x${item.quantity})
          - ₹${item.product.price}
        </li>
      `
    )
    .join("");

  const { data, error } = await resend.emails.send({
    from: "Book Shop <onboarding@resend.dev>",
    to: [process.env.ADMIN_EMAIL],

    subject: `🛍️ New Order Received (Order ID: ${order._id})`,

    html: `
      <h2>New Order Received</h2>

      <p>
        <b>User phone:</b>
        ${order.user.phone}
      </p>

      <p>
        <b>User email:</b>
        ${order.user.email}
      </p>

      <p>
        <b>User name:</b>
        ${order.user.name}
      </p>

      <p>
        <b>Order ID:</b>
        ${order._id}
      </p>

      <p>
        <b>Total:</b>
        ₹${order.totalAmount}
      </p>

      <p>
        <b>Shipping Address:</b>
        ${order.shippingAddress}
      </p>

      <p>
        <b>Payment Status:</b>
        ${order.paymentStatus}
      </p>

      <p>
        <b>Placed On:</b>
        ${new Date(order.createdAt).toLocaleString()}
      </p>

      <h3>Items:</h3>

      <ul>
        ${itemsHtml}
      </ul>

      <hr>

      <p>
        <b>Book Shop</b>
      </p>
    `,
  });

  if (error) {
    console.error("❌ Resend email error:", error);
    throw new Error(error.message);
  }

  console.log("✅ Admin email sent:", data.id);

  return data;
};

module.exports = sendAdminEmail;