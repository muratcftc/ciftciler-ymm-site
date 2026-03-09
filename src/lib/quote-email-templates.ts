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
				<div style="padding:16px 18px;background:linear-gradient(140deg,#0f2f42 0%,#15445b 100%);color:#f6fbff;">
					<h2 style="margin:0;font-size:20px;">Kurumsal \u00d6n De\u011ferlendirme Formu</h2>
					<p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Web sitesi \u00fczerinden yeni bir talep iletildi.</p>
				</div>
				<div style="padding:18px;">
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
				<div style="padding:16px 18px;background:linear-gradient(140deg,#0f2f42 0%,#15445b 100%);color:#f6fbff;">
					<h2 style="margin:0;font-size:20px;">\u00c7ift\u00e7iler YMM</h2>
					<p style="margin:6px 0 0;font-size:13px;opacity:0.9;">Kurumsal \u00d6n De\u011ferlendirme Talebiniz Al\u0131nd\u0131</p>
				</div>
				<div style="padding:18px;">
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
