export interface EmailLine {
	label: string;
	value: string;
}

interface InternalTemplateParams {
	generalLines: EmailLine[];
	companyLines: EmailLine[];
	serviceLines: EmailLine[];
}

interface UserTemplateParams {
	fullName: string;
	companyName: string;
	serviceLabel: string;
	receiverEmail: string;
	summaryLines: EmailLine[];
}

const escapeHtml = (value: string): string =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');

const linesToHtmlRows = (lines: EmailLine[]) =>
	lines
		.map(
			(line) =>
				`<tr><th align="left" style="padding:8px 10px;border:1px solid #d9e2e8;background:#f6fafc;width:35%;">${escapeHtml(line.label)}</th><td style="padding:8px 10px;border:1px solid #d9e2e8;">${escapeHtml(line.value)}</td></tr>`
		)
		.join('');

const linesToText = (title: string, lines: EmailLine[]) =>
	`${title}\n${lines.map((line) => `- ${line.label}: ${line.value}`).join('\n')}`;

export const buildInternalQuoteEmail = ({ generalLines, companyLines, serviceLines }: InternalTemplateParams) => {
	const html = `
		<div style="font-family:Arial,'Segoe UI',sans-serif;color:#10222f;line-height:1.55;background:#f4f7f9;padding:20px;">
			<div style="max-width:780px;margin:0 auto;background:#ffffff;border:1px solid #d9e2e8;border-radius:12px;overflow:hidden;">
				<div style="background:#0f2f42;color:#f6fbff;">
					<img
						src="https://ciftciler-ymm-site.vercel.app/brand/header-brand-strip.png"
						alt="\u00c7ift\u00e7iler YMM Header"
						width="780"
						height="88"
						border="0"
						style="display:block;width:100%;max-width:780px;height:auto;"
					/>
					<div style="padding:14px 18px;background:#0f2f42;border-top:1px solid #245067;">
						<h2 style="margin:0;font-size:20px;line-height:1.3;color:#ffffff;">Kurumsal \u00d6n De\u011ferlendirme Formu</h2>
						<p style="margin:6px 0 0;font-size:13px;color:#d9e8f2;">Web sitesi \u00fczerinden yeni bir talep iletildi.</p>
					</div>
				</div><div style="padding:18px;">
					<h3 style="margin:0 0 8px;color:#0c2a3a;font-size:16px;">Ba\u015fvuru \u00d6zeti</h3>
					<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:0 0 14px;">
						<tbody>${linesToHtmlRows(generalLines)}</tbody>
					</table>
					<h3 style="margin:0 0 8px;color:#0c2a3a;font-size:16px;">Kurumsal Bilgiler</h3>
					<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:0 0 14px;">
						<tbody>${linesToHtmlRows(companyLines)}</tbody>
					</table>
					<h3 style="margin:0 0 8px;color:#0c2a3a;font-size:16px;">Hizmete \u00d6zel Bilgiler</h3>
					<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
						<tbody>${linesToHtmlRows(serviceLines)}</tbody>
					</table>
				</div>
			</div>
		</div>
	`;

	const text = [
		'Kurumsal \u00d6n De\u011ferlendirme Formu',
		'',
		linesToText('Ba\u015fvuru \u00d6zeti', generalLines),
		'',
		linesToText('Kurumsal Bilgiler', companyLines),
		'',
		linesToText('Hizmete \u00d6zel Bilgiler', serviceLines)
	].join('\n');

	return { html, text };
};

export const buildUserAutoReplyEmail = ({
	fullName,
	companyName,
	serviceLabel,
	receiverEmail,
	summaryLines
}: UserTemplateParams) => {
	const html = `
		<div style="font-family:Arial,'Segoe UI',sans-serif;color:#10222f;line-height:1.6;background:#f4f7f9;padding:20px;">
			<div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #d9e2e8;border-radius:12px;overflow:hidden;">
				<div style="background:#0f2f42;color:#ffffff;">
					<img
						src="https://ciftciler-ymm-site.vercel.app/brand/header-brand-strip.png"
						alt="\u00c7ift\u00e7iler YMM Header"
						width="720"
						height="81"
						border="0"
						style="display:block;width:100%;max-width:720px;height:auto;"
					/>
					<div style="padding:12px 20px;border-top:1px solid #245067;background:#0f2f42;">
						<p style="margin:0;font-size:15px;line-height:1.4;font-weight:600;color:#ffffff;">Kurumsal \u00d6n De\u011ferlendirme Talebiniz Al\u0131nd\u0131</p>
					</div>
				</div><div style="padding:18px 20px;">
					<p style="margin:0 0 12px;">Say\u0131n ${escapeHtml(fullName || 'Yetkili')},</p>
					<p style="margin:0 0 10px;">
						${escapeHtml(companyName || '\u015eirketiniz')} ad\u0131na iletilen <strong>${escapeHtml(serviceLabel)}</strong> talebiniz taraf\u0131m\u0131za ula\u015fm\u0131\u015ft\u0131r.
					</p>
					<p style="margin:0 0 10px;">
						Talebiniz, \u00f6n de\u011ferlendirme kapsam\u0131nda incelenecek; gerekli g\u00f6r\u00fclmesi halinde taraf\u0131n\u0131za ilave bilgi veya belge talebi i\u00e7in ileti\u015fime ge\u00e7ilecektir.
					</p>
					<h3 style="margin:14px 0 8px;color:#0c2a3a;font-size:16px;">Talep \u00d6zeti</h3>
					<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:0 0 14px;">
						<tbody>${linesToHtmlRows(summaryLines)}</tbody>
					</table>
					<p style="margin:0 0 8px;">
						Ek bilgi veya d\u00fczeltme iletmek isterseniz bu e-postay\u0131 yan\u0131tlayabilirsiniz.
					</p>
					<p style="margin:0;color:#4c6577;">
						\u0130leti\u015fim: <a href="mailto:${escapeHtml(receiverEmail)}" style="color:#0f3a51;text-decoration:none;">${escapeHtml(receiverEmail)}</a>
					</p>
				</div>
				<div style="padding:14px 20px;background:#f1f5f8;border-top:1px solid #d9e2e8;">
					<p style="margin:0 0 6px;font-size:12px;color:#28495d;font-weight:600;">\u00c7ift\u00e7iler Yeminli Mali M\u00fc\u015favirlik A.\u015e.</p>
					<p style="margin:0 0 3px;font-size:12px;color:#496477;">E-posta: <a href="mailto:bilgi@ciftcilerymm.org" style="color:#0f3a51;text-decoration:none;">bilgi@ciftcilerymm.org</a></p>
					<p style="margin:0 0 3px;font-size:12px;color:#496477;">Web: <a href="https://ciftcilerymm.org" style="color:#0f3a51;text-decoration:none;">ciftcilerymm.org</a></p>
					<p style="margin:0;font-size:11px;color:#5c7485;">Bu ileti 3568 say\u0131l\u0131 Kanun kapsam\u0131nda genel bilgilendirme niteli\u011findedir.</p>
				</div>
			</div>
		</div>
	`;

	const text = [
		`Say\u0131n ${fullName || 'Yetkili'},`,
		'',
		`${companyName || '\u015eirketiniz'} ad\u0131na iletilen "${serviceLabel}" talebiniz taraf\u0131m\u0131za ula\u015fm\u0131\u015ft\u0131r.`,
		'Talebiniz \u00f6n de\u011ferlendirme kapsam\u0131nda incelenecek, gerekli g\u00f6r\u00fclmesi halinde taraf\u0131n\u0131za ileti\u015fim sa\u011flanacakt\u0131r.',
		'',
		linesToText('Talep \u00d6zeti', summaryLines),
		'',
		'Ek bilgi veya d\u00fczeltme iletmek isterseniz bu e-postay\u0131 yan\u0131tlayabilirsiniz.'
	].join('\n');

	return { html, text };
};

