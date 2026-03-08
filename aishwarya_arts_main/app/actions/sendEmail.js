"use server";
import nodemailer from "nodemailer";

export async function sendEmail(formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const message = formData.get("message");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `New Inquiry from ${firstName} ${lastName} - Aishwarya Arts`,
    text: `
      Name: ${firstName} ${lastName}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #b45309;">New Gallery Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="margin-top: 20px;"><strong>Message:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("SMTP Error:", error);
    return { success: false, error: "Failed to send email" };
  }
}