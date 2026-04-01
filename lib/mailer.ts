import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TOMER_EMAIL = process.env.TOMER_EMAIL ?? "tomer@example.com";
const FROM_EMAIL =
  process.env.FROM_EMAIL ?? "notifications@tomersgarage.com";

export async function notifyNewEstimate(data: {
  name: string;
  phone: string;
  email?: string;
  address: string;
  service_interest?: string;
  preferred_date?: string;
  preferred_time?: string;
}) {
  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Address: ${data.address}`,
    data.service_interest ? `Service: ${data.service_interest}` : null,
    data.preferred_date ? `Preferred date: ${data.preferred_date}` : null,
    data.preferred_time ? `Preferred time: ${data.preferred_time}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await resend.emails.send({
    from: FROM_EMAIL,
    to: TOMER_EMAIL,
    subject: `New Estimate Request — ${data.name}`,
    text: `You have a new estimate request:\n\n${lines}`,
    html: `<h2>New Estimate Request</h2><pre>${lines}</pre>`,
  });
}
