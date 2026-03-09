// src/lib/email/templates.ts

export type QuotePayload = {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
};

function escapeHtml(value: string = ""): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nl2br(value: string = ""): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function row(label: string, value?: string) {
  if (!value?.trim()) return "";
  return `
    <tr>
      <td style="padding:10px 0; width:180px; color:#6b7280; font-size:14px; vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0; color:#111827; font-size:14px; font-weight:600; vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

export function renderInternalQuoteEmail(data: QuotePayload) {
  const subject = `Yeni Teklif Talebi – ${data.fullName}`;

  const html = `
  <!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${escapeHtml(subject)}</title>
    </head>
    <body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial,Helvetica,sans-serif; color:#111827;">
      <div style="width:100%; background:#f3f4f6; padding:32px 16px;">
        <div style="max-width:720px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">
          
          <div style="padding:24px 28px; background:#111827;">
            <div style="font-size:13px; letter-spacing:.08em; text-transform:uppercase; color:#d1d5db;">
              Çiftçiler Yeminli Mali Müşavirlik A.Ş.
            </div>
            <h1 style="margin:10px 0 0; font-size:24px; line-height:1.3; color:#ffffff;">
              Yeni teklif / ön değerlendirme talebi
            </h1>
          </div>

          <div style="padding:28px;">
            <p style="margin:0 0 20px; font-size:15px; line-height:1.7; color:#374151;">
              Web sitesi üzerinden yeni bir form gönderimi alındı.
            </p>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${row("Ad Soyad", data.fullName)}
              ${row("Şirket / Kurum", data.company)}
              ${row("E-posta", data.email)}
              ${row("Telefon", data.phone)}
              ${row("Talep Konusu", data.service)}
            </table>

            ${
              data.message?.trim()
                ? `
            <div style="margin-top:28px; padding-top:20px; border-top:1px solid #e5e7eb;">
              <div style="font-size:13px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.04em; margin-bottom:10px;">
                Mesaj
              </div>
              <div style="font-size:14px; line-height:1.8; color:#111827;">
                ${nl2br(data.message)}
              </div>
            </div>
            `
                : ""
            }
          </div>

          <div style="padding:18px 28px; background:#f9fafb; border-top:1px solid #e5e7eb; font-size:12px; color:#6b7280;">
            Bu e-posta, ciftcilerymm.org üzerindeki teklif formu gönderiminden otomatik oluşturulmuştur.
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  const text = `
Yeni teklif / ön değerlendirme talebi

Ad Soyad: ${data.fullName}
Şirket / Kurum: ${data.company ?? "-"}
E-posta: ${data.email}
Telefon: ${data.phone ?? "-"}
Talep Konusu: ${data.service ?? "-"}

Mesaj:
${data.message ?? "-"}
  `.trim();

  return { subject, html, text };
}

export function renderAutoReplyEmail(data: QuotePayload) {
  const subject = `Talebiniz Alındı – Çiftçiler YMM`;

  const html = `
  <!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${escapeHtml(subject)}</title>
    </head>
    <body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial,Helvetica,sans-serif; color:#111827;">
      <div style="width:100%; background:#f3f4f6; padding:32px 16px;">
        <div style="max-width:720px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden;">
          
          <div style="padding:28px; background:#111827;">
            <div style="font-size:13px; letter-spacing:.08em; text-transform:uppercase; color:#d1d5db;">
              Çiftçiler Yeminli Mali Müşavirlik A.Ş.
            </div>
            <h1 style="margin:10px 0 0; font-size:24px; line-height:1.3; color:#ffffff;">
              Talebiniz tarafımıza ulaşmıştır
            </h1>
          </div>

          <div style="padding:28px;">
            <p style="margin:0 0 16px; font-size:15px; line-height:1.8; color:#374151;">
              Merhaba ${escapeHtml(data.fullName)},
            </p>

            <p style="margin:0 0 16px; font-size:15px; line-height:1.8; color:#374151;">
              Çiftçiler Yeminli Mali Müşavirlik A.Ş. web sitesi üzerinden ilettiğiniz talep tarafımıza ulaşmıştır.
            </p>

            <p style="margin:0 0 24px; font-size:15px; line-height:1.8; color:#374151;">
              Gönderdiğiniz bilgiler ön değerlendirme amacıyla incelenecek olup, gerekli görülmesi halinde sizinle iletişime geçilecektir.
            </p>

            <div style="margin:28px 0 0; padding:20px; border:1px solid #e5e7eb; border-radius:12px; background:#f9fafb;">
              <div style="font-size:13px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.04em; margin-bottom:12px;">
                Talep Özeti
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${row("Ad Soyad", data.fullName)}
                ${row("Şirket / Kurum", data.company)}
                ${row("E-posta", data.email)}
                ${row("Telefon", data.phone)}
                ${row("Talep Konusu", data.service)}
              </table>

              ${
                data.message?.trim()
                  ? `
                <div style="margin-top:16px; padding-top:16px; border-top:1px solid #e5e7eb;">
                  <div style="font-size:13px; font-weight:700; color:#6b7280; margin-bottom:8px;">
                    Mesaj
                  </div>
                  <div style="font-size:14px; line-height:1.8; color:#111827;">
                    ${nl2br(data.message)}
                  </div>
                </div>
              `
                  : ""
              }
            </div>

            <p style="margin:24px 0 0; font-size:15px; line-height:1.8; color:#374151;">
              Talebinizle ilgili ek bilgi paylaşmak veya düzeltme yapmak isterseniz bu e-postayı yanıtlayarak bizimle iletişime geçebilirsiniz.
            </p>

            <p style="margin:28px 0 0; font-size:15px; line-height:1.8; color:#374151;">
              Saygılarımızla,<br />
              <strong>Çiftçiler Yeminli Mali Müşavirlik A.Ş.</strong>
            </p>
          </div>

          <div style="padding:18px 28px; background:#f9fafb; border-top:1px solid #e5e7eb;">
            <div style="font-size:13px; line-height:1.8; color:#6b7280;">
              Antalya<br />
              bilgi@ciftcilerymm.org<br />
              ciftcilerymm.org
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  const text = `
Merhaba ${data.fullName},

Çiftçiler Yeminli Mali Müşavirlik A.Ş. web sitesi üzerinden ilettiğiniz talep tarafımıza ulaşmıştır.

Gönderdiğiniz bilgiler ön değerlendirme amacıyla incelenecek olup, gerekli görülmesi halinde sizinle iletişime geçilecektir.

Talep Özeti
Ad Soyad: ${data.fullName}
Şirket / Kurum: ${data.company ?? "-"}
E-posta: ${data.email}
Telefon: ${data.phone ?? "-"}
Talep Konusu: ${data.service ?? "-"}

Mesaj:
${data.message ?? "-"}

Talebinizle ilgili ek bilgi paylaşmak veya düzeltme yapmak isterseniz bu e-postayı yanıtlayarak bizimle iletişime geçebilirsiniz.

Saygılarımızla,
Çiftçiler Yeminli Mali Müşavirlik A.Ş.
Antalya
bilgi@ciftcilerymm.org
ciftcilerymm.org
  `.trim();

  return { subject, html, text };
}