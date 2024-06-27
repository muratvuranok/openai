# Proje: AI Destekli Hikaye Kitabı Oluşturma Uygulaması
## Proje Amacı

Kullanıcıların evcil hayvan bilgilerini ve hikaye tercihlerini kullanarak AI destekli kısa hikaye kitabı oluşturma ve bunu web/mobil uygulama üzerinden kullanıcılara sunma.

## Genel Akış
- Kullanıcı kayıt ve giriş.
- Kullanıcıdan evcil hayvan bilgilerini al.
- Hikayenin nerede geçeceğini sor.
- Kullanıcının hikaye tercihlerini al.
- Bu bilgileri AI sistemine göndererek hikaye ve görseller oluştur.
- Oluşturulan hikayeyi ve görselleri kullanıcıya sun.
- Kullanıcı hikayeleri kaydedebilir, silebilir ve inceleyebilir.

### UX/UI Tasarımı
**Görevler:**
- Kullanıcı dostu bir arayüz tasarımı yap.
- Kullanıcının kolayca bilgi girebilmesi için form alanları oluştur.
- Hikaye ve görsellerin şık bir şekilde sunulacağı bir şablon oluştur.
- Mobil ve web arayüzlerinin uyumlu olmasını sağla.

**Adımlar:**
- `Kayıt ve Giriş Ekranı`: Kullanıcıların kayıt olabileceği ve giriş yapabileceği bir ekran oluştur.

    - Kayıt formu: Kullanıcı adı, e-posta, şifre.
    - Giriş formu: E-posta, şifre.

- `Kullanıcı Bilgi Ekranı`: Evcil hayvan bilgilerini toplamak için kullanıcıdan bilgileri iste.
    - Evcil hayvan var mı? (Evet/Hayır)
    - Eğer evet ise, adını, cinsini, rengini, yaşını sor.
    - Eğer hayır ise, hangi hayvana sahip olmak istediğini, adını, rengini sor.

- `Hikaye Tercih Ekranı`: Hikayenin nerede geçeceğini ve türünü seçtir.

    - Hikaye nerede geçsin? (Orman, Sahil, Uzay vs.)
    - Ne tür hikayelerden hoşlanırsın? (Macera, Komedi, Fantastik vs.)

### Sonuç Ekranı: AI tarafından oluşturulan hikaye ve görselleri göster.

- Hikaye metni
- Hikayeye uygun görseller

### Hikaye Yönetim Ekranı: Kullanıcının oluşturduğu hikayeleri listele ve yönet.

- Hikayeleri listele (başlık, tarih)
- Hikayeleri görüntüle, sil ve düzenle seçenekleri ekle.
- Yeni hikaye oluşturma butonu.

## Backend Geliştirme
**Görevler:**
- Kullanıcıdan alınan bilgileri AI sistemine ilet.
- AI sisteminden gelen hikaye ve görselleri işleyerek frontend'e sun.
- Kullanıcı kayıt ve giriş işlemlerini yönet.
- Kullanıcı hikayelerini saklama ve yönetme fonksiyonlarını ekle.
**Adımlar:**
- `API Tasarımı`: Kullanıcı bilgilerini toplamak, AI ile iletişim sağlamak ve kullanıcı oturumlarını yönetmek için API oluştur.

    - Kullanıcı kayıt ve giriş endpoint'leri (POST /register, POST /login)
    - Kullanıcı bilgilerini toplamak için endpoint oluştur (POST /user-info)
    - Hikaye ve görselleri almak için AI sistemine istek gönder (POST /generate-story)
    - AI'dan gelen verileri işleyip frontend'e sun (GET /story)
    - Kullanıcı hikayelerini yönetmek için endpoint'ler (GET /stories, DELETE /story/{id})

- `Veri Yönetimi`: Kullanıcı bilgilerini ve oluşturulan hikayeleri veritabanında sakla.

    - Kullanıcı bilgilerini ve oturum bilgilerini saklamak için veri modeli oluştur.
    - Kullanıcı hikayelerini saklamak için veri modeli oluştur.

## AI Entegrasyonu
**Görevler:**
- Kullanıcıdan gelen bilgilere göre hikaye ve görseller oluşturacak bir AI modeli kullan.
- AI modelinin çıktısını işleyerek uygun formatta sun.

**Adımlar:**
- `AI Modeli Seçimi`: Hikaye oluşturma ve görsel üretme için uygun AI modellerini belirle.

    - Hikaye oluşturma için metin üretim modelleri (ör. GPT-4)
    - Görsel oluşturma için görsel üretim modelleri (ör. DALL-E)
- `API Entegrasyonu`: Backend API ile AI modellerini entegre et.

    - Kullanıcı bilgilerini AI modeline gönder ve hikaye/görseller oluştur.
    - AI modelinden gelen çıktıyı uygun formatta işleyerek frontend'e sun.

## Frontend Geliştirme
**Görevler:**
- Kullanıcı arayüzünü oluştur ve backend API ile entegrasyonu sağla.
- Mobil uyumlu bir web uygulaması geliştir.
**Adımlar:**
- `Kayıt ve Giriş Sayfaları`: Kullanıcıların kayıt olabileceği ve giriş yapabileceği sayfalar oluştur.

    - Kayıt formu
    - Giriş formu

- `Form Sayfaları`: Kullanıcıdan bilgi toplamak için form sayfaları oluştur.

    - Evcil hayvan bilgileri formu
    - Hikaye tercihleri formu

- `Sonuç Sayfası`: AI tarafından oluşturulan hikaye ve görselleri kullanıcıya sun.
    - Hikaye metnini ve görselleri gösteren şablon oluştur.


- `Hikaye Yönetim Sayfası`: Kullanıcının oluşturduğu hikayeleri listele ve yönet.

    - Hikayeleri listeleme, görüntüleme, silme ve düzenleme seçenekleri ekle.
    - Yeni hikaye oluşturma butonu ekle.
## Mobil Uygulama Geliştirme

**Görevler:**
- Mobil uyumlu arayüz oluştur ve backend API ile entegrasyonu sağla.
- Kullanıcı deneyimini optimize et.
**Adımlar:**
- Kayıt ve Giriş Sayfaları: Kullanıcıların kayıt olabileceği ve giriş yapabileceği mobil sayfalar oluştur.

    - Kayıt formu
    - Giriş formu
- `Form Sayfaları`: Kullanıcıdan bilgi toplamak için mobil form sayfaları oluştur.

    - Evcil hayvan bilgileri formu
    - Hikaye tercihleri formu
- `Sonuç Sayfası`: AI tarafından oluşturulan hikaye ve görselleri mobil kullanıcıya sun.

    - Hikaye metnini ve görselleri gösteren şablon oluştur.
- `Hikaye Yönetim Sayfası`: Kullanıcının oluşturduğu hikayeleri listele ve yönet.

    - Hikayeleri listeleme, görüntüleme, silme ve düzenleme seçenekleri ekle.
    - Yeni hikaye oluşturma butonu ekle.
## Proje Yönetimi ve İlerleme
**Adımlar:**
- `Proje Planı Oluşturma`: Her departmanın görevlerini ve zaman çizelgesini belirle.
- `Takım Toplantıları`: Düzenli takım toplantıları yaparak ilerlemeyi takip et.
- `Test ve Geri Bildirim`: Uygulamayı test ederek kullanıcı geri bildirimlerini al ve iyileştirmeler yap.
