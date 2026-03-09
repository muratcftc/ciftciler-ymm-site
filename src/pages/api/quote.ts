import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { SERVICE_OPTIONS } from '../../lib/service-config';
import { commonFields, istisnaIndirimItems, serviceFields } from '../../lib/quote-fields';

export const prerender = false;

type PayloadValue = string | string[];

interface EmailLine {
	label: string;
	value: string;
}

const BASE_REQUIRED_FIELDS = [
	'serviceType',
	'adSoyad',
	'eposta',
	'telefon',
	'sirketUnvani',
	'sehir',
	'sektor',
	'ihtiyacAciklamasi',
	'onay'
];

const SERVICE_REQUIREMENTS: Record<string, { required: string[]; requiredArrays?: string[] }> = {
	tam_tasdik: {
		required: [
			'tam_tasdik_hesapDonemi',
			'tam_tasdik_yaklasikYillikCiro',
			'tam_tasdik_calisanSayisi',
			'tam_tasdik_smmmIleCalisiliyorMu',
			'tam_tasdik_grupYapisiParcasiMi',
			'tam_tasdik_faaliyetKapsami'
		]
	},
	kdv_otv_iade_tasdik: {
		required: [
			'kdv_otv_iade_tasdik_raporSikligi',
			'kdv_otv_iade_tasdik_yaklasikIadeTutari',
			'kdv_otv_iade_tasdik_oncekiSurec'
		],
		requiredArrays: ['kdv_otv_iade_tasdik_islemTurleri[]']
	},
	gelir_kurumlar_istisna_indirim_tasdiki: {
		required: [
			'gelir_kurumlar_istisna_indirim_tasdiki_ilgiliHesapDonemi',
			'gelir_kurumlar_istisna_indirim_tasdiki_belgeHazirlikDurumu'
		],
		requiredArrays: ['gelir_kurumlar_istisna_indirim_tasdiki_selectedItems[]']
	},
	vergi_danismanligi: {
		required: [
			'vergi_danismanligi_hizmetModeli',
			'vergi_danismanligi_zamanOnceligi'
		],
		requiredArrays: ['vergi_danismanligi_vergiAlani[]', 'vergi_danismanligi_danismanlikKonusu[]']
	},
	vergi_inceleme_uyusmazlik: {
		required: [
			'vergi_inceleme_uyusmazlik_surecTuru',
			'vergi_inceleme_uyusmazlik_ilgiliVergiTuru',
			'vergi_inceleme_uyusmazlik_ilgiliDonem',
			'vergi_inceleme_uyusmazlik_kisaAciklama'
		]
	}
};

const serviceLabelMap = new Map(SERVICE_OPTIONS.map((service) => [service.key, service.label]));
const istisnaItemLabelMap = new Map(istisnaIndirimItems.map((item) => [item.key, item.label]));

const fieldLabelMap = new Map<string, string>([
	['serviceType', 'Talep Konusu Hizmet'],
	['onay', 'AydÃ„Â±nlatma ve onay']
]);

const optionLabelMap = new Map<string, Map<string, string>>();

for (const field of commonFields) {
	fieldLabelMap.set(field.name, field.label);
	if (field.options?.length) {
		optionLabelMap.set(field.name, new Map(field.options.map((option) => [option.value, option.label])));
	}
}

for (const [serviceKey, fields] of Object.entries(serviceFields)) {
	for (const field of fields) {
		const prefixedName = `${serviceKey}_${field.name}`;
		fieldLabelMap.set(prefixedName, field.label);
		if (field.options?.length) {
			const map = new Map(field.options.map((option) => [option.value, option.label]));
			optionLabelMap.set(prefixedName, map);
			optionLabelMap.set(`${prefixedName}[]`, map);
		}
	}
}

fieldLabelMap.set('tam_tasdik_hesapDonemi', 'Hizmet AlÃ„Â±nmasÃ„Â± Planlanan Hesap DÃƒÂ¶nemi');
fieldLabelMap.set('gelir_kurumlar_istisna_indirim_tasdiki_ilgiliHesapDonemi', 'Ã„Â°lgili hesap dÃƒÂ¶nemi');
fieldLabelMap.set(
	'gelir_kurumlar_istisna_indirim_tasdiki_selectedItems[]',
	'Ã„Â°stisna / indirim seÃƒÂ§ili kalemleri'
);
fieldLabelMap.set('kdv_otv_iade_tasdik_islemTurleri[]', 'Ã„Â°adeye konu iÃ…Å¸lem tÃƒÂ¼rleri');
fieldLabelMap.set('vergi_danismanligi_vergiAlani[]', 'Vergi alanÃ„Â±');
fieldLabelMap.set('vergi_danismanligi_danismanlikKonusu[]', 'DanÃ„Â±Ã…Å¸manlÃ„Â±k konusu');

const redirectWithStatus = (status: 'success' | 'error', message?: string, code = 303) => {
	const params = new URLSearchParams({ status });
	if (message) params.set('message', message);

	return new Response(null, {
		status: code,
		headers: {
			Location: `/teklif-al?${params.toString()}`
		}
	});
};

const getDataMap = (formData: FormData): Record<string, PayloadValue> => {
	const result: Record<string, PayloadValue> = {};
	const keys = new Set(formData.keys());

	for (const key of keys) {
		const values = formData
			.getAll(key)
			.map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
			.filter(Boolean);

		if (values.length === 0) continue;
		result[key] = values.length === 1 ? values[0] : values;
	}

	return result;
};

const getArrayValue = (data: Record<string, PayloadValue>, key: string): string[] => {
	const value = data[key];
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
};

const getStringValue = (data: Record<string, PayloadValue>, key: string): string => {
	const values = getArrayValue(data, key);
	return values[0] ?? '';
};

const hasValue = (data: Record<string, PayloadValue>, key: string): boolean => {
	return getArrayValue(data, key).length > 0;
};

const resolveFieldLabel = (key: string): string => {
	if (fieldLabelMap.has(key)) return fieldLabelMap.get(key) ?? key;

	if (key.endsWith('_tutar')) {
		const itemKey = key.replace('gelir_kurumlar_istisna_indirim_tasdiki_', '').replace('_tutar', '');
		const itemLabel = istisnaItemLabelMap.get(itemKey);
		if (itemLabel) return `${itemLabel} - YaklaÃ…Å¸Ã„Â±k tutar`;
	}

	if (key.endsWith('_not')) {
		const itemKey = key.replace('gelir_kurumlar_istisna_indirim_tasdiki_', '').replace('_not', '');
		const itemLabel = istisnaItemLabelMap.get(itemKey);
		if (itemLabel) return `${itemLabel} - Not`;
	}

	return key.replace(/_/g, ' ');
};

const resolveValueLabel = (key: string, value: string): string => {
	if (!value) return '';
	if (key === 'serviceType') return serviceLabelMap.get(value) ?? value;
	if (key === 'gelir_kurumlar_istisna_indirim_tasdiki_selectedItems[]') {
		return istisnaItemLabelMap.get(value) ?? value;
	}
	const optionMap = optionLabelMap.get(key);
	return optionMap?.get(value) ?? value;
};

const formatDataForLine = (key: string, data: Record<string, PayloadValue>): string => {
	const values = getArrayValue(data, key);
	if (values.length === 0) return '';
	return values.map((value) => resolveValueLabel(key, value)).join(', ');
};

const addLine = (target: EmailLine[], label: string, value?: string) => {
	if (!value) return;
	target.push({ label, value });
};

const getServiceLines = (serviceType: string, data: Record<string, PayloadValue>): EmailLine[] => {
	const lines: EmailLine[] = [];
	const prefix = `${serviceType}_`;

	addLine(lines, 'Talep Konusu Hizmet', resolveValueLabel('serviceType', serviceType));

	if (serviceType === 'tam_tasdik') {
		addLine(lines, resolveFieldLabel('tam_tasdik_hesapDonemi'), formatDataForLine('tam_tasdik_hesapDonemi', data));
	}

	if (serviceType === 'gelir_kurumlar_istisna_indirim_tasdiki') {
		addLine(
			lines,
			resolveFieldLabel('gelir_kurumlar_istisna_indirim_tasdiki_ilgiliHesapDonemi'),
			formatDataForLine('gelir_kurumlar_istisna_indirim_tasdiki_ilgiliHesapDonemi', data)
		);
		addLine(
			lines,
			resolveFieldLabel('gelir_kurumlar_istisna_indirim_tasdiki_selectedItems[]'),
			formatDataForLine('gelir_kurumlar_istisna_indirim_tasdiki_selectedItems[]', data)
		);

		for (const itemKey of getArrayValue(data, 'gelir_kurumlar_istisna_indirim_tasdiki_selectedItems[]')) {
			const amountKey = `${prefix}${itemKey}_tutar`;
			const noteKey = `${prefix}${itemKey}_not`;
			addLine(lines, resolveFieldLabel(amountKey), formatDataForLine(amountKey, data));
			addLine(lines, resolveFieldLabel(noteKey), formatDataForLine(noteKey, data));
		}
	}

	const mappedFields = serviceFields[serviceType as keyof typeof serviceFields] ?? [];
	for (const field of mappedFields) {
		const fieldKey = field.type === 'multi-select' ? `${prefix}${field.name}[]` : `${prefix}${field.name}`;
		addLine(lines, resolveFieldLabel(fieldKey), formatDataForLine(fieldKey, data));
	}

	const extraKeys = Object.keys(data)
		.filter((key) => key.startsWith(prefix))
		.filter((key) => !lines.some((line) => line.label === resolveFieldLabel(key)))
		.filter((key) => !key.endsWith('_kalemSecici') && !key.endsWith('_ekle'));

	for (const key of extraKeys) {
		addLine(lines, resolveFieldLabel(key), formatDataForLine(key, data));
	}

	return lines;
};

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
				`<tr><th align="left" style="padding:8px 10px;border:1px solid #d9e2e8;background:#f6fafc;">${escapeHtml(line.label)}</th><td style="padding:8px 10px;border:1px solid #d9e2e8;">${escapeHtml(line.value)}</td></tr>`
		)
		.join('');

const linesToText = (title: string, lines: EmailLine[]) =>
	`${title}\n${lines.map((line) => `- ${line.label}: ${line.value}`).join('\n')}`;

export const POST: APIRoute = async ({ request }) => {
	try {
		const resendApiKey = import.meta.env.RESEND_API_KEY;
		const receiverEmail = import.meta.env.FORM_RECEIVER_EMAIL;
		const senderEmail = import.meta.env.FORM_SENDER_EMAIL;

		if (!resendApiKey || !receiverEmail || !senderEmail) {
			return redirectWithStatus(
				'error',
				'Sistem yapÃ„Â±landÃ„Â±rmasÃ„Â± tamamlanmadÃ„Â±. LÃƒÂ¼tfen daha sonra tekrar deneyiniz.',
				307
			);
		}

		const formData = await request.formData();
		const data = getDataMap(formData);
		const serviceType = getStringValue(data, 'serviceType');

		if (!serviceType || !serviceLabelMap.has(serviceType)) {
			return redirectWithStatus('error', 'LÃƒÂ¼tfen geÃƒÂ§erli bir hizmet seÃƒÂ§iniz.', 307);
		}

		const missingFields = BASE_REQUIRED_FIELDS.filter((field) => !hasValue(data, field));
		const serviceRequirement = SERVICE_REQUIREMENTS[serviceType];
		if (serviceRequirement) {
			missingFields.push(...serviceRequirement.required.filter((field) => !hasValue(data, field)));
			if (serviceRequirement.requiredArrays?.length) {
				missingFields.push(...serviceRequirement.requiredArrays.filter((field) => !hasValue(data, field)));
			}
		}

		if (missingFields.length > 0) {
			return redirectWithStatus(
				'error',
				`LÃƒÂ¼tfen zorunlu alanlarÃ„Â± doldurunuz: ${resolveFieldLabel(missingFields[0])}.`,
				307
			);
		}

		const generalLines: EmailLine[] = [];
		const companyLines: EmailLine[] = [];
		const serviceLines = getServiceLines(serviceType, data);

		addLine(generalLines, 'GÃƒÂ¶nderim zamanÃ„Â±', new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' }));
		addLine(generalLines, 'Talep Konusu Hizmet', resolveValueLabel('serviceType', serviceType));

		for (const field of commonFields) {
			addLine(companyLines, field.label, formatDataForLine(field.name, data));
		}

		addLine(companyLines, 'AydÃ„Â±nlatma ve onay', hasValue(data, 'onay') ? 'OnaylandÃ„Â±' : 'OnaylanmadÃ„Â±');

		const html = `
			<div style="font-family:Arial,'Segoe UI',sans-serif;color:#10222f;line-height:1.5;">
				<h2 style="margin:0 0 12px;color:#0c2a3a;">Kurumsal Ãƒâ€“n DeÃ„Å¸erlendirme Formu</h2>
				<p style="margin:0 0 16px;color:#4c6577;">Web sitesi ÃƒÂ¼zerinden yeni bir form talebi iletilmiÃ…Å¸tir.</p>
				<h3 style="margin:14px 0 8px;color:#0c2a3a;">BaÃ…Å¸vuru Ãƒâ€“zeti</h3>
				<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:0 0 12px;">
					<tbody>${linesToHtmlRows(generalLines)}</tbody>
				</table>
				<h3 style="margin:14px 0 8px;color:#0c2a3a;">Kurumsal Bilgiler</h3>
				<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin:0 0 12px;">
					<tbody>${linesToHtmlRows(companyLines)}</tbody>
				</table>
				<h3 style="margin:14px 0 8px;color:#0c2a3a;">Hizmete Ãƒâ€“zel Bilgiler</h3>
				<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
					<tbody>${linesToHtmlRows(serviceLines)}</tbody>
				</table>
			</div>
		`;

		const text = [
			'Kurumsal Ãƒâ€“n DeÃ„Å¸erlendirme Formu',
			'',
			linesToText('BaÃ…Å¸vuru Ãƒâ€“zeti', generalLines),
			'',
			linesToText('Kurumsal Bilgiler', companyLines),
			'',
			linesToText('Hizmete Ãƒâ€“zel Bilgiler', serviceLines)
		].join('\n');

		const resend = new Resend(resendApiKey);
		await resend.emails.send({
			from: senderEmail,
			to: [receiverEmail],
			replyTo: getStringValue(data, 'eposta'),
			subject: `[Web Formu] ${resolveValueLabel('serviceType', serviceType)} - ${getStringValue(data, 'sirketUnvani')}`,
			html,
			text
		});

		return redirectWithStatus('success');
	} catch (error) {
		console.error('quote form send error', error);
		return redirectWithStatus(
			'error',
			'Talebiniz gÃƒÂ¶nderilirken teknik bir hata oluÃ…Å¸tu. LÃƒÂ¼tfen tekrar deneyiniz.',
			307
		);
	}
};
