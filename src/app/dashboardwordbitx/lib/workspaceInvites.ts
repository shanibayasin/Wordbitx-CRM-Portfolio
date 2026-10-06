import nodemailer from 'nodemailer';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

export async function sendWorkspaceInviteEmail({
  email,
  name,
  companyName,
  token,
}: {
  email: string;
  name: string;
  companyName: string;
  token: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;
  const baseUrl = process.env.APP_URL ?? process.env.NEXTAUTH_URL;

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !pass || !from || !baseUrl) {
    throw new Error('SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, and APP_URL must be configured to send workspace invites.');
  }

  const inviteUrl = new URL('/workspace-invite', baseUrl);
  inviteUrl.searchParams.set('token', token);
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(companyName);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: email,
    subject: 'Your WordbitX workspace request is approved',
    text: `Hi ${name},\n\nYour request to create a WordbitX workspace for ${companyName} has been approved. Set your password and activate your workspace using this one-time link (valid for 72 hours):\n\n${inviteUrl.toString()}\n\nIf you did not request this workspace, you can ignore this email.`,
    html: `<p>Hi ${safeName},</p><p>Your request to create a WordbitX workspace for <strong>${safeCompany}</strong> has been approved.</p><p><a href="${inviteUrl.toString()}">Set your password and activate your workspace</a></p><p>This one-time link expires in 72 hours. If you did not request this workspace, you can ignore this email.</p>`,
  });
}
