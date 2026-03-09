---
name: teklif-formu-kurgula
description: Hizmete göre değişen, nitelikli müşteri bilgisi toplayan teklif formu akışları tasarlar.
---

# Amaç
Çiftçiler YMM web sitesindeki teklif alma sürecini hizmete özel sorularla yapılandırmak.

# Ne zaman kullanılır
- Teklif al sayfası tasarlanırken
- Yeni hizmet tipi form akışı eklenirken
- Mevcut form daha nitelikli lead toplamak için revize edilirken

# Ana prensip
Form tek bir genel form gibi görünse de, hizmet seçimine göre farklı soru setleri göstermelidir.

# Temel akış
1. Kullanıcı hizmet türünü seçer
2. Ortak bilgiler alınır
3. Seçilen hizmete özel alanlar gösterilir
4. Gerekirse ek açıklama alanı açılır
5. Başvuru özeti oluşturulur

# Ortak alanlar
- Ad soyad
- Şirket unvanı
- Telefon
- E-posta
- Şehir
- Sektör
- Tercih edilen hizmet
- Kısa ihtiyaç açıklaması

# Hizmete özel örnekler

## Tam Tasdik
- Hizmet alınacak yıl
- Yaklaşık ciro aralığı
- Grup şirketi var mı
- İmalat / ihracat faaliyeti var mı
- Mevcut mali müşavir / iç ekip yapısı
- Şirketin çalışan sayısı veya ölçek bilgisi

## KDV İadesi
- İade türü
- Aylık / dönemsel iade sıklığı
- Yaklaşık iade hacmi
- İhracat var mı
- İmalat var mı
- Önceden iade süreci yürütüldü mü

## Vergi Danışmanlığı
- Konu başlığı
- Süreklilik mi tek seferlik mi
- Aciliyet durumu
- Karar aşamasındaki işlem türü
- İlgili vergisel risk alanı

## Vergi İnceleme / Dava Süreci
- İnceleme veya ihtilaf aşaması
- Hangi vergi / dönem
- Tebligat veya rapor mevcut mu
- Süreçte zaman baskısı var mı

# Kurallar
- Gereksiz soru sorma
- Her hizmette karar vermeye yardımcı bilgi topla
- Formu uzatmak için değil nitelik artırmak için soru ekle
- Kullanıcıyı yormadan bilgi toplama dengesi kur

# Teknik yaklaşım
- Soru setlerini ayrı veri yapılarında tut
- Form render mantığını modüler kur
- Yeni hizmet eklemek kolay olmalı