# Implementasi Terjemahan SYNERGY

## ✅ Yang Sudah Diimplementasikan:

### 1. LanguageContext dengan Bahasa Indonesia
- **File**: `/src/app/context/LanguageContext.tsx`
- **Bahasa yang tersedia**: 
  - 🇬🇧 English
  - 🇮🇩 **Bahasa Indonesia** (BARU!)
  - 🇪🇸 Español
  - 🇫🇷 Français
  - 🇩🇪 Deutsch
  - 🇨🇳 中文
  - 🇯🇵 日本語
  - 🇸🇦 العربية
  - 🇵🇹 Português
  - 🇷🇺 Русский
  - 🇮🇳 हिन्दी

### 2. Halaman Login
- **File**: `/src/app/pages/LoginPage.tsx`
- **Status**: ✅ Sudah menggunakan terjemahan
- **Fitur**: Dropdown pemilih bahasa dengan bendera emoji

### 3. App.tsx
- **File**: `/src/app/App.tsx`
- **Status**: ✅ Sudah membungkus dengan LanguageProvider

## 📝 Cara Menggunakan Terjemahan di Halaman Lain:

Untuk menerapkan terjemahan ke halaman lain, ikuti pola ini:

```typescript
// 1. Import useLanguage di bagian atas
import { useLanguage } from '../context/LanguageContext';

// 2. Dapatkan fungsi t() di dalam component
export const MyComponent: React.FC = () => {
  const { t } = useLanguage();
  
  // 3. Gunakan t('key') untuk mengganti teks
  return (
    <div>
      <h1>{t('dragdrop.title')}</h1>
      <p>{t('dragdrop.description')}</p>
    </div>
  );
};
```

## 🎯 Kunci Terjemahan Utama untuk Setiap Halaman:

### DragDropActivity
- `dragdrop.title` - Identifikasi Komponen Sistem
- `dragdrop.description` - Deskripsi aktivitas
- `dragdrop.next` - Tombol next
- `dragdrop.score` - Skor
- `dragdrop.feedback.correct` - Benar! +1 poin
- `dragdrop.feedback.incorrect` - Salah! -1 poin

### ConnectionActivity
- `connection.title` - Petakan Koneksi Sistem
- `connection.description` - Deskripsi
- `connection.next` - Tombol next
- `connection.add` - Tambah Koneksi
- `node.*` - Deskripsi setiap node

### DynamicAnalysis
- `dynamic.title` - Analisis Sistem Dinamis
- `dynamic.scenario` - Skenario
- `dynamic.submit` - Kirim Prediksi
- `dynamic.next` - Tombol next

### SystemSimulation
- `simulation.title` - Simulasi Sistem: Perjalanan Plastik
- `simulation.stage1.title` hingga `simulation.stage5.title`
- `simulation.reflection.question` - Pertanyaan refleksi
- `simulation.continue` - Lanjutkan

### GreenChemistryLab
- `greenchem.title` - Solusi Kimia Hijau
- `greenchem.principles` - 12 Prinsip Kimia Hijau
- `greenchem.next` - Lanjutkan

## 🌐 Contoh Terjemahan Bahasa Indonesia yang Sudah Tersedia:

```typescript
'dragdrop.title': 'Identifikasi Komponen Sistem'
'dragdrop.description': 'Seret komponen yang benar ke dalam lingkaran Sistem Plastik...'
'dragdrop.next': 'Selanjutnya → Petakan Koneksi Sistem'

'connection.title': 'Petakan Koneksi Sistem'
'connection.description': 'Hubungkan node dan beri label hubungannya...'
'connection.next': 'Selanjutnya → Analisis Sistem Dinamis'

'dynamic.title': 'Analisis Sistem Dinamis'
'dynamic.next': 'Selanjutnya → Simulasi Sistem: Perjalanan Plastik'

'simulation.title': 'Simulasi Sistem: Perjalanan Plastik'
'simulation.reflection.question': 'Bagaimana peningkatan produksi dapat menimbulkan mikroplastik...'
'simulation.continue': 'Selanjutnya → Solusi Kimia Hijau'

'greenchem.title': 'Solusi Kimia Hijau'
'greenchem.principles': '12 Prinsip Kimia Hijau'
```

## ✨ Fitur Tambahan:

1. **Persistensi Bahasa**: Pilihan bahasa disimpan di localStorage
2. **Fallback**: Jika terjemahan tidak ditemukan, akan menggunakan bahasa Inggris
3. **Emoji Bendera**: Setiap bahasa memiliki emoji bendera untuk identifikasi visual

## 🔧 Langkah Selanjutnya:

Untuk menerapkan terjemahan ke semua halaman:

1. Import `useLanguage` di setiap file halaman
2. Dapatkan `{ t }` dari `useLanguage()`
3. Ganti semua teks hardcoded dengan `t('key')`
4. Pastikan semua key terjemahan sudah tersedia di `LanguageContext.tsx`

Semua terjemahan sudah lengkap di file LanguageContext untuk:
- Login Page ✅
- Drag Drop Activity ✅
- Connection Activity ✅
- Dynamic Analysis ✅
- System Simulation ✅
- Green Chemistry Lab ✅

Tinggal menerapkan `t()` function ke masing-masing komponen!
