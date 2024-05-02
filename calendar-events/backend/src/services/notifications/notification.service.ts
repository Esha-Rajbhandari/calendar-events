import "dotenv/config";
import cron from "node-cron";
import nodemailer from "nodemailer";

const getTransporterConfig = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });
};

const sendNotification = (event) => {
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    subject: `Reminder: ${event.event_name}`,
    text: `You have an event "${event.event_name}" starting at ${event.event_start_time}`,
  };

  const transporter = getTransporterConfig();
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const scheduleNotification = (events) => {
  events.forEach((ev) => {
    console.log(`Notification scheduled for: ${ev.event_name}`);
    cron.schedule(`*/15 * * * *`, () => {
      sendNotification(ev);
    });
  });
};
