import type { ServiceKey } from './service-config';

type QuoteFieldType =
	| 'text'
	| 'email'
	| 'tel'
	| 'number'
	| 'select'
	| 'multi-select'
	| 'textarea';

export interface QuoteFieldOption {
	value: string;
	label: string;
}

export interface QuoteField {
	name: string;
	label: string;
	type: QuoteFieldType;
	required?: boolean;
	placeholder?: string;
	options?: QuoteFieldOption[];
}

export interface IstisnaIndirimItem {
	key: string;
	label: string;
}

export const commonFields: QuoteField[] = [
	{ name: 'adSoyad', label: 'Yetkili Adı Soyadı', type: 'text', required: true },
	{ name: 'eposta', label: 'Kurumsal E-posta', type: 'email', required: true, placeholder: 'ornek@sirket.com' },
	{ name: 'telefon', label: 'Kurumsal Telefon', type: 'tel', required: true, placeholder: '+90 ...' },
	{ name: 'sirketUnvani', label: 'Şirket Unvanı', type: 'text', required: true },
	{ name: 'sehir', label: 'Şirket Merkezi (Şehir)', type: 'text', required: true },
	{ name: 'sektor', label: 'Faaliyet Alanı / Sektör', type: 'text', required: true },
	{
		name: 'ihtiyacAciklamasi',
		label: 'Talep Özeti',
		type: 'textarea',
		required: true,
		placeholder: 'Talebinizi kısa ve net şekilde açıklayınız.'
	}
];

export const istisnaIndirimItems: IstisnaIndirimItem[] = [
	{ key: 'yurtdisi_istirak_kazanci', label: 'Yurtdışı iştirak kazançları istisnası' },
	{
		key: 'yurtdisi_yazilim_muhendislik_egitim_saglik_hizmet_kazanc_indirimi',
		label: 'Yurtdışına Verilen Yazılım, Mühendislik, Eğitim ve Sağlık Hizmetleri Kazanç İndirimi'
	},
	{ key: 'emisyon_primi', label: 'Emisyon primi kazancı istisnası' },
	{ key: 'tasinmaz_istirak_satis_kazanci', label: 'Taşınmaz ve iştirak hissesi satış kazancı istisnası' },
	{ key: 'serbest_bolge_kazanc', label: 'Serbest bölge kazanç istisnası' },
	{ key: 'teknoloji_gelistirme_bolgesi', label: 'Teknoloji geliştirme bölgesi kazanç istisnası' },
	{ key: 'arge_indirimi', label: 'Ar-Ge indirimi' },
	{ key: 'nakdi_sermaye_faiz', label: 'Nakdi sermaye artışı faiz indirimi' },
	{ key: 'kurumlar_vergisi_oran_indirimli_uygulama', label: 'Kurumlar Vergisi Oranının İndirimli Uygulaması' },
	{ key: 'indirimli_kurumlar_vergisi', label: 'İndirimli kurumlar vergisi (KVK 32/A)' },
	{ key: 'asgari_tamamlayici_kv', label: 'Yerel / küresel asgari tamamlayıcı KV' },
	{ key: 'diger_istisna_indirim', label: 'Diğer indirimler / istisnalar' }
];

export const serviceFields: Record<ServiceKey, QuoteField[]> = {
	tam_tasdik: [
		{
			name: 'yaklasikYillikCiro',
			label: 'Yaklaşık Yıllık Ciro',
			type: 'select',
			required: true,
			options: [
				{ value: '0-50m', label: '0-50 milyon TL' },
				{ value: '50-100m', label: '50-100 milyon TL' },
				{ value: '100-250m', label: '100-250 milyon TL' },
				{ value: '250-500m', label: '250-500 milyon TL' },
				{ value: '500-750m', label: '500-750 milyon TL' },
				{ value: '750m-1b', label: '750 milyon – 1 milyar TL' },
				{ value: '1b+', label: '1 milyar TL üzeri' }
			]
		},
		{
			name: 'calisanSayisi',
			label: 'Çalışan Sayısı',
			type: 'select',
			required: true,
			options: [
				{ value: '1-10', label: '1-10' },
				{ value: '10-50', label: '10-50' },
				{ value: '50-100', label: '50-100' },
				{ value: '100-250', label: '100-250' },
				{ value: '250+', label: '250+' }
			]
		},
		{
			name: 'smmmIleCalisiliyorMu',
			label: 'Şirketinizde SMMM ile çalışılıyor mu?',
			type: 'select',
			required: true,
			options: [
				{ value: 'evet', label: 'Evet' },
				{ value: 'hayir', label: 'Hayır' }
			]
		},
		{
			name: 'grupYapisiParcasiMi',
			label: 'Şirket bir grup yapısının parçası mı?',
			type: 'select',
			required: true,
			options: [
				{ value: 'evet', label: 'Evet' },
				{ value: 'hayir', label: 'Hayır' }
			]
		},
		{
			name: 'faaliyetKapsami',
			label: 'Faaliyet kapsamı',
			type: 'select',
			required: true,
			options: [
				{ value: 'imalat', label: 'İmalat' },
				{ value: 'insaat', label: 'İnşaat' },
				{ value: 'hayir', label: 'Hayır' }
			]
		}
	],
	kdv_otv_iade_tasdik: [
		{
			name: 'islemTurleri',
			label: 'İadeye konu işlem türleri',
			type: 'multi-select',
			required: true,
			options: [
				{ value: 'ihracat_teslimleri', label: 'İhracat teslimleri' },
				{ value: 'hizmet_ihraci', label: 'Hizmet ihracı' },
				{ value: 'indirimli_oranli', label: 'İndirimli orana tabi işlemler' },
				{ value: 'tevkifat_iade', label: 'Tevkifata tabi işlemlerden doğan iade' },
				{ value: 'tam_istisna', label: 'Tam istisna kapsamındaki işlemler' },
				{ value: 'fazla_yersiz', label: 'Fazla veya yersiz hesaplanan vergi iadesi' },
				{ value: 'otv_iadesi', label: 'ÖTV iadesi' },
				{ value: 'diger', label: 'Diğer' }
			]
		},
		{
			name: 'raporSikligi',
			label: 'İade raporunun hangi sıklıkta düzenlenmesi planlanıyor?',
			type: 'select',
			required: true,
			options: [
				{ value: '3-ay', label: '3 ay' },
				{ value: '6-ay', label: '6 ay' },
				{ value: '12-ay', label: '12 ay' },
				{ value: 'net-degil', label: 'Henüz net değil' }
			]
		},
		{
			name: 'yaklasikIadeTutari',
			label: 'Yaklaşık iade tutarı',
			type: 'select',
			required: true,
			options: [
				{ value: '0-1m', label: '0-1 milyon TL' },
				{ value: '1-5m', label: '1-5 milyon TL' },
				{ value: '5-10m', label: '5-10 milyon TL' },
				{ value: '10-25m', label: '10-25 milyon TL' },
				{ value: '25m+', label: '25 milyon TL üzeri' }
			]
		},
		{
			name: 'oncekiSurec',
			label: 'Daha önce iade süreci yürütüldü mü?',
			type: 'select',
			required: true,
			options: [
				{ value: 'evet', label: 'Evet' },
				{ value: 'hayir', label: 'Hayır' },
				{ value: 'kismen', label: 'Kısmen' }
			]
		},
		{
			name: 'ekAciklama',
			label: 'Ek Açıklama (Opsiyonel)',
			type: 'textarea',
			placeholder: 'Gerekli görüyorsanız kısa ek bilgi yazınız.'
		}
	],
	gelir_kurumlar_istisna_indirim_tasdiki: [
		{
			name: 'belgeHazirlikDurumu',
			label: 'Belgeler ve hesaplamalar hazır mı?',
			type: 'select',
			required: true,
			options: [
				{ value: 'hazir', label: 'Hazır' },
				{ value: 'kismen_hazir', label: 'Kısmen hazır' },
				{ value: 'hazir_degil', label: 'Henüz hazırlanmadı' }
			]
		}
	],
	vergi_danismanligi: [
		{
			name: 'vergiAlani',
			label: 'Vergi alanı',
			type: 'multi-select',
			required: true,
			options: [
				{ value: 'kurumlar_vergisi', label: 'Kurumlar Vergisi' },
				{ value: 'gelir_vergisi', label: 'Gelir Vergisi' },
				{ value: 'kdv', label: 'KDV' },
				{ value: 'otv', label: 'ÖTV' },
				{ value: 'damga_vergisi', label: 'Damga Vergisi' },
				{ value: 'uluslararasi', label: 'Uluslararası Vergilendirme' },
				{ value: 'diger', label: 'Diğer' }
			]
		},
		{
			name: 'hizmetModeli',
			label: 'Hizmet modeli',
			type: 'select',
			required: true,
			options: [
				{ value: 'tek_seferlik', label: 'Tek seferlik görüş' },
				{ value: 'proje_danismanligi', label: 'Belirli işlem / proje danışmanlığı' },
				{ value: 'surekli_danismanlik', label: 'Süreklilik arz eden danışmanlık' },
				{ value: 'net_degil', label: 'Henüz net değil' }
			]
		},
		{
			name: 'zamanOnceligi',
			label: 'Zaman önceliği',
			type: 'select',
			required: true,
			options: [
				{ value: 'acil', label: 'Acil' },
				{ value: 'birkac_hafta', label: 'Birkaç hafta içinde' },
				{ value: 'planlama', label: 'Planlama aşamasında' }
			]
		},
		{
			name: 'danismanlikKonusu',
			label: 'Danışmanlık konusu',
			type: 'multi-select',
			required: true,
			options: [
				{ value: 'risk_degerlendirmesi', label: 'Vergisel risk değerlendirmesi' },
				{ value: 'vergi_planlamasi', label: 'Vergi planlaması' },
				{ value: 'birlesme_bolunme', label: 'Şirket birleşme / bölünme' },
				{ value: 'yurt_disi', label: 'Yurt dışı işlemler' },
				{ value: 'izaha_davet', label: 'İzaha davet / idare bilgi talepleri' },
				{ value: 'yapilandirma', label: 'Yapılandırma / matrah artırımı' },
				{ value: 'yeni_yatirim', label: 'Yeni yatırım vergisel değerlendirme' },
				{ value: 'sozlesme_inceleme', label: 'Sözleşmelerin vergisel incelenmesi' },
				{ value: 'diger', label: 'Diğer' }
			]
		},
		{
			name: 'kisaAciklama',
			label: 'Kısa Açıklama',
			type: 'textarea',
			placeholder: 'Danışmanlık ihtiyacını kısa şekilde belirtiniz.'
		}
	],
	vergi_inceleme_uyusmazlik: [
		{
			name: 'surecTuru',
			label: 'Süreç türü',
			type: 'select',
			required: true,
			options: [
				{ value: 'vergi_incelemesi', label: 'Vergi incelemesi' },
				{ value: 'izaha_davet', label: 'İzaha davet' },
				{ value: 'uzlasma', label: 'Uzlaşma süreci' },
				{ value: 'vergi_davasi', label: 'Vergi davası' },
				{ value: 'net_degil', label: 'Henüz net değil' }
			]
		},
		{
			name: 'ilgiliVergiTuru',
			label: 'İlgili vergi türü',
			type: 'select',
			required: true,
			options: [
				{ value: 'kdv', label: 'KDV' },
				{ value: 'kurumlar', label: 'Kurumlar Vergisi' },
				{ value: 'gelir', label: 'Gelir Vergisi' },
				{ value: 'otv', label: 'ÖTV' },
				{ value: 'damga', label: 'Damga Vergisi' },
				{ value: 'birden_fazla', label: 'Birden fazla' }
			]
		},
		{
			name: 'ilgiliDonem',
			label: 'İlgili dönem',
			type: 'text',
			required: true,
			placeholder: 'Örn: 2024/01-12 veya 2023 hesap dönemi'
		},
		{
			name: 'kisaAciklama',
			label: 'Kısa açıklama',
			type: 'textarea',
			required: true,
			placeholder: 'Sürece ilişkin temel bilgileri kısaca yazınız.'
		}
	]
};
