export const SERVICE_OPTIONS = [
	{ key: 'tam_tasdik', label: 'Tam Tasdik' },
	{ key: 'kdv_otv_iade_tasdik', label: 'KDV / ÖTV İadesi Tasdik Hizmetleri' },
	{
		key: 'gelir_kurumlar_istisna_indirim_tasdiki',
		label: 'Gelir / Kurumlar Vergisi İstisna ve İndirim Tasdiki'
	},
	{ key: 'vergi_danismanligi', label: 'Vergi Danışmanlığı' },
	{ key: 'vergi_inceleme_uyusmazlik', label: 'Vergi İnceleme ve Vergi Uyuşmazlık Süreçleri' }
] as const;

export type ServiceKey = (typeof SERVICE_OPTIONS)[number]['key'];
