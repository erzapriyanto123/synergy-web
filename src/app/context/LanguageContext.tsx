import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id'; // Fixed to Indonesian only

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, string> = {
  // Login Page
  'login.title': 'SYNERGY',
  'login.subtitle': 'Systems thinking for Next-gen Education in Green chemistry & sustainability',
  'login.welcome': 'Selamat Datang di SYNERGY',
  'login.name': 'Nama Anda',
  'login.class': 'Kelas',
  'login.email': 'Email',
  'login.password': 'Kata Sandi',
  'login.button': 'Mulai Perjalanan Belajar',
  'login.register': 'Daftar',
  'login.backToLogin': 'Kembali ke Login',
  'login.guide': 'Panduan',
  'login.selectLanguage': 'Pilih Bahasa',
  'login.welcomeMessage': 'Selamat datang, calon Pemikir Sistem masa depan! Jelajahi sistem plastik yang kompleks dan temukan solusi berkelanjutan melalui pemikiran sistem.',
  'login.planetMessage': 'Planet Kita Membutuhkan Pemikir Sistem',
  'login.journeyMessage': 'Bergabunglah dalam perjalanan untuk memahami dan memecahkan krisis plastik',
  
  // Dashboard
  'dashboard.title': 'SYNERGY',
  'dashboard.points': 'Poin',
  'dashboard.level': 'Level',
  'dashboard.logout': 'Keluar',
  'dashboard.welcome': 'Selamat datang kembali,',
  'dashboard.subtitle': 'Lanjutkan perjalanan Anda menjadi Pemikir Sistem',
  'dashboard.progress': 'Progres Belajar',
  'dashboard.systemLevel': 'Level Pemikiran Sistem',
  'dashboard.badges': 'Lencana Diperoleh',
  'dashboard.badgesDesc': 'Terus belajar untuk mendapatkan lebih banyak!',
  'dashboard.learningPath': 'Jalur Pembelajaran Anda',
  'dashboard.achievements': 'Pencapaian Anda',
  'dashboard.continue': 'Lanjutkan Belajar →',
  'dashboard.rank.observer': 'Pengamat',
  'dashboard.rank.connector': 'Penghubung',
  'dashboard.rank.analyst': 'Analis',
  'dashboard.rank.modeler': 'Pembuat Model',
  'dashboard.rank.systemthinker': 'Pemikir Sistem',
  'dashboard.module1.title': '1. Pengantar: Krisis Plastik',
  'dashboard.module1.desc': 'Memahami skala masalah plastik',
  'dashboard.module2.title': '2. Visualisasi Sistem',
  'dashboard.module2.desc': 'Jelajahi komponen sistem yang saling terhubung',
  'dashboard.module3.title': '3. Identifikasi Komponen Sistem',
  'dashboard.module3.desc': 'Aktivitas drag-and-drop interaktif',
  'dashboard.module4.title': '4. Koneksi Sistem',
  'dashboard.module4.desc': 'Petakan hubungan antar komponen',
  'dashboard.module5.title': '5. Analisis Dinamis',
  'dashboard.module5.desc': 'Prediksi perilaku sistem dari waktu ke waktu',
  'dashboard.module6.title': '6. Simulasi Sistem',
  'dashboard.module6.desc': 'Saksikan sistem plastik beraksi',
  'dashboard.module7.title': '7. Solusi Kimia Hijau',
  'dashboard.module7.desc': 'Temukan 12 prinsip',
  'dashboard.module8.title': '8. Refleksi & Solusi',
  'dashboard.module8.desc': 'Terapkan pemikiran sistem Anda',
  
  // Welcome Guide
  'guide.welcome': 'Selamat Datang di SYNERGY!',
  'guide.subtitle': 'Mari kita bimbing Anda melalui platform',
  'guide.step1.title': '🎯 Perjalanan Belajar Anda',
  'guide.step1.desc': 'Lengkapi 8 modul interaktif untuk memahami pemikiran sistem dan krisis plastik.',
  'guide.step2.title': '⭐ Peroleh Poin & Lencana',
  'guide.step2.desc': 'Peroleh poin untuk menyelesaikan aktivitas dan buka lencana saat Anda maju melalui level.',
  'guide.step3.title': '📈 Lacak Perjalanan Anda',
  'guide.step3.desc': 'Monitor perjalanan belajar Anda dari Pengamat hingga Pemikir Sistem di 5 level.',
  'guide.step4.title': '🌍 Buat Dampak',
  'guide.step4.desc': 'Pelajari untuk berpikir secara sistem dan temukan solusi berkelanjutan untuk krisis plastik.',
  'guide.start': 'Mulai Perjalanan Belajar',
  'guide.skip': 'Lewati Panduan',
  
  // Problem Trigger Page
  'problem.title': 'Plastik: Solusi atau Masalah?',
  'problem.title.solution': 'Solusi',
  'problem.title.problem': 'Masalah?',
  'problem.subtitle': 'Memahami Skala Masalah',
  'problem.welcome': 'Peringatan Waspada',
  'problem.intro': 'Mari kita memahami terlebih dahulu skala krisis plastik yang sedang mempengaruhi planet kita.',
  'problem.stat1950.year': '1950',
  'problem.stat1950.tons': 'Jutaan ton plastik diproduksi',
  'problem.stat1950.desc': 'Awal era plastik',
  'problem.stat2022.year': '2022',
  'problem.stat2022.tons': 'Jutaan ton plastik diproduksi',
  'problem.stat2022.desc': 'Peningkatan 200 kali lipat hanya dalam 72 tahun!',
  'problem.systemChallenge': 'Tantangan Sistem',
  'problem.systemChallenge.stat1': '1 Juta',
  'problem.systemChallenge.stat1Desc': 'Botol plastik terjual per menit di seluruh dunia',
  'problem.systemChallenge.stat2': '5 Triliun',
  'problem.systemChallenge.stat2Desc': 'Kantong plastik digunakan secara global setiap tahun',
  'problem.systemChallenge.stat3': '450 Tahun',
  'problem.systemChallenge.stat3Desc': 'Waktu yang dibutuhkan plastik untuk terurai di alam',
  'problem.question': 'Mengapa masalah plastik sulit diselesaikan?',
  'problem.answer': 'Masalah plastik tidak berdiri sendiri. Permasalahan ini melibatkan banyak faktor yang saling terhubung dan mempengaruhi',
  'problem.systemThinking': 'Karena itu, untuk memahami dan mengatasi krisis plastik, kita perlu melihatnya sebagai sebuah sistem.',
  'problem.systemThinking.title': 'Dalam berpikir sistem, kita perlu memperhatikan:',
  'problem.mindset.connections': 'Hubungan antar komponen dalam sistem plastik',
  'problem.mindset.feedback': 'Dampak yang saling memengaruhi antar komponen',
  'problem.mindset.delays': 'Perubahan yang terjadi seiring waktu dalam sistem',
  'problem.mindset.leverage': 'Bagian mana yang dapat diubah agar sistem menjadi lebih baik',
  'problem.ready': 'Siap melihat seluruh sistem?',
  'problem.continue': 'Lanjutkan',
  
  // Navigation
  'nav.dashboard': 'Dasbor',
  'nav.back': '← Dasbor',
  
  // Aktivitas Drag Drop
  'dragdrop.title': 'Identifikasi Komponen Sistem',
  'dragdrop.description': 'Seret komponen yang benar ke dalam lingkaran Sistem Plastik. Hindari pengalih perhatian!',
  'dragdrop.available': 'Komponen Tersedia',
  'dragdrop.plastic': 'Sistem Plastik',
  'dragdrop.dropped': 'Item yang Dijatuhkan:',
  'dragdrop.progress': 'Progres:',
  'dragdrop.correct': 'komponen benar',
  'dragdrop.incorrect': 'salah',
  'dragdrop.excellent': '🎉 Kerja Bagus!',
  'dragdrop.message': 'Anda telah mengidentifikasi semua komponen sistem yang benar. Anda berpikir seperti seorang analis sistem!',
  'dragdrop.next': 'Selanjutnya → Petakan Koneksi Sistem',
  'dragdrop.score': 'Skor:',
  'dragdrop.feedback.correct': 'Benar! +1 poin',
  'dragdrop.feedback.incorrect': 'Salah! -1 poin',
  'dragdrop.dragHere': 'Seret komponen yang benar ke sini',
  'dragdrop.continueMessage': 'Anda bisa melanjutkan, tetapi coba dapatkan semua komponen yang benar terlebih dahulu!',
  
  // Aktivitas Koneksi
  'connection.title': 'Petakan Koneksi Sistem',
  'connection.description': 'Hubungkan node dan beri label hubungannya. Apakah satu komponen meningkatkan (+) atau menurunkan (−) yang lain?',
  'connection.increases': 'Meningkatkan / Mempercepat',
  'connection.reduces': 'Mengurangi / Menghambat',
  'connection.howto': 'Cara menggunakan:',
  'connection.step1': 'Klik node awal (ditandai dengan warna biru)',
  'connection.step2': 'Klik node akhir untuk membuat koneksi',
  'connection.step3': 'Pilih jenis hubungan: + (meningkatkan) atau − (menurunkan)',
  'connection.step4': 'Klik "Tambah Koneksi" untuk mengirim',
  'connection.step5': 'Arahkan kursor ke node untuk melihat deskripsinya',
  'connection.from': 'Dari Node:',
  'connection.to': 'Ke Node:',
  'connection.relationship': 'Hubungan:',
  'connection.add': 'Tambah Koneksi',
  'connection.yourConnections': 'Koneksi Anda:',
  'connection.next': 'Selanjutnya → Analisis Sistem Dinamis',
  'connection.clickNode': 'Klik sebuah node',
  'connection.clickSecond': 'Klik node kedua',
  
  // Tooltip Node
  'node.production': 'Pembuatan produk plastik',
  'node.consumption': 'Penggunaan produk plastik',
  'node.waste': 'Bahan plastik yang dibuang',
  'node.recycling': 'Pengolahan limbah menjadi bahan baru',
  'node.microplastics': 'Partikel plastik kecil di lingkungan',
  'node.foodchain': 'Organisme yang mengonsumsi makanan terkontaminasi',
  'node.policy': 'Regulasi dan hukum pemerintah',
  'node.energy': 'Konsumsi daya dalam produksi',
  'node.marine': 'Kesehatan laut dan keanekaragaman hayati',
  'node.health': 'Dampak pada kesejahteraan manusia',
  'node.packaging': 'Wadah dan bahan pembungkus',
  'node.wastemanagement': 'Sistem pengumpulan dan pembuangan',
  'node.technology': 'Inovasi dalam bahan dan proses',
  'node.environment': 'Ekosistem alami dan iklim',
  'node.economy': 'Biaya dan manfaat ekonomi',
  'node.climate': 'Efek perubahan iklim global',
  'node.social': 'Dampak komunitas dan masyarakat',
  
  // Analisis Dinamis
  'dynamic.title': 'Analisis Sistem Dinamis',
  'dynamic.description': 'Sistem berubah seiring waktu. Prediksi bagaimana komponen akan merespons peningkatan produksi.',
  'dynamic.scenario': 'Skenario',
  'dynamic.scenarioText': 'Produksi plastik terus meningkat selama 5 tahun ke depan pada tingkat pertumbuhan saat ini.',
  'dynamic.analyze': 'Analisis grafik di bawah ini dan prediksi dampak pada komponen sistem lainnya.',
  'dynamic.projected': 'Proyeksi Produksi Plastik (Juta Ton)',
  'dynamic.increase': 'Peningkatan 32% dari 2021 hingga 2026',
  'dynamic.predictions': 'Buat Prediksi Anda',
  'dynamic.predictText': 'Untuk setiap komponen, prediksi apakah akan meningkat, menurun, atau tetap stabil:',
  'dynamic.increase.label': 'Meningkat',
  'dynamic.stable.label': 'Stabil',
  'dynamic.decrease.label': 'Menurun',
  'dynamic.reasoning': 'Jelaskan alasan Anda (opsional):',
  'dynamic.reasoningPlaceholder': 'Mengapa menurut Anda komponen ini akan berubah seperti ini?',
  'dynamic.submit': 'Kirim Prediksi',
  'dynamic.insight': 'Wawasan Pemikiran Sistem:',
  'dynamic.next': 'Selanjutnya → Simulasi Sistem: Perjalanan Plastik',
  'dynamic.score': 'Skor:',
  'dynamic.points': 'poin',
  'dynamic.correct': 'Benar! +5 poin',
  'dynamic.correctAnswer': 'Benar:',
  'dynamic.wasteIncrease': 'Limbah meningkat karena lebih banyak produksi dan konsumsi menciptakan lebih banyak pembuangan',
  'dynamic.economyGrows': 'Ekonomi tumbuh karena peningkatan aktivitas industri dan pekerjaan',
  'dynamic.socialIncreases': 'Dampak sosial meningkat melalui masalah kesehatan dan kekhawatiran keadilan lingkungan',
  'dynamic.environmentDecreases': 'Kualitas lingkungan menurun akibat polusi dan kerusakan ekosistem',
  'dynamic.climateDecreases': 'Stabilitas iklim menurun karena emisi yang lebih tinggi dari produksi',
  'dynamic.rippleEffect': 'Perhatikan bagaimana satu perubahan (peningkatan produksi) menciptakan efek riak di seluruh sistem!',
  
  // Simulasi Sistem
  'simulation.title': 'Simulasi Sistem: Perjalanan Plastik',
  'simulation.description': 'Saksikan bagaimana dampak menyebar di berbagai tingkat sistem',
  'simulation.stage': 'Tahap',
  'simulation.previous': '← Sebelumnya',
  'simulation.next': 'Selanjutnya →',
  'simulation.reflection.title': 'Refleksi Kritis 🤔',
  'simulation.reflection.question': 'Bagaimana peningkatan produksi dapat menimbulkan mikroplastik sebagai dampak tersembunyi yang pada akhirnya mempengaruhi manusia?',
  'simulation.reflection.placeholder': 'Jelaskan bagaimana produksi mengarah pada mikroplastik dan dampaknya pada manusia...',
  'simulation.reflection.submit': 'Kirim Refleksi (+10 poin)',
  'simulation.reflection.excellent': '✓ Refleksi Luar Biasa! +10 poin',
  'simulation.reflection.keyInsights': 'Wawasan Sistem Kunci:',
  'simulation.continue': 'Selanjutnya → Solusi Kimia Hijau',
  'simulation.stage1.title': 'Tahap 1: Produksi Meningkat',
  'simulation.stage1.desc': 'Produksi plastik global meningkat dari 400 juta menjadi 530 juta ton selama 5 tahun',
  'simulation.stage1.narration': 'Seiring permintaan tumbuh, pabrik memproduksi lebih banyak produk plastik. Bahan baku diekstraksi, diproses, dan diproduksi dengan laju yang semakin cepat.',
  'simulation.stage2.title': 'Tahap 2: Akumulasi Limbah',
  'simulation.stage2.desc': 'Peningkatan produksi menyebabkan lebih banyak limbah masuk ke lingkungan',
  'simulation.stage2.narration': 'Sebagian besar produk plastik digunakan sebentar tetapi bertahan selama berabad-abad. Limbah menumpuk di tempat pembuangan akhir, saluran air, dan akhirnya samudra.',
  'simulation.stage3.title': 'Tahap 3: Pembentukan Mikroplastik',
  'simulation.stage3.desc': 'Plastik terdegradasi menjadi partikel kecil yang menyebar ke seluruh ekosistem',
  'simulation.stage3.narration': 'Seiring waktu, potongan plastik yang lebih besar terurai menjadi mikroplastik melalui paparan UV dan pelapukan fisik. Partikel-partikel ini menyebar melalui air, tanah, dan udara.',
  'simulation.stage4.title': 'Tahap 4: Kontaminasi Rantai Makanan',
  'simulation.stage4.desc': 'Mikroplastik memasuki rantai makanan melalui kehidupan laut',
  'simulation.stage4.narration': 'Plankton dan ikan kecil mengonsumsi mikroplastik. Ikan yang lebih besar memakan ikan kecil yang terkontaminasi, mengkonsentrasikan plastik ke atas rantai makanan.',
  'simulation.stage5.title': 'Tahap 5: Dampak Kesehatan Manusia',
  'simulation.stage5.desc': 'Manusia mengonsumsi makanan laut dan air yang terkontaminasi',
  'simulation.stage5.narration': 'Sistem menyelesaikan siklusnya: manusia, yang menciptakan plastik, sekarang mengonsumsinya melalui makanan laut, air minum, dan bahkan udara yang kita hirup. Studi menemukan mikroplastik dalam darah, paru-paru, dan organ manusia.',
  'simulation.insight1': 'Produksi → Limbah: Lebih banyak pembuatan plastik menciptakan lebih banyak produk yang dibuang',
  'simulation.insight2': 'Limbah → Mikroplastik: Paparan UV dan pelapukan memecah plastik menjadi partikel kecil',
  'simulation.insight3': 'Mikroplastik → Lingkungan: Partikel menyebar melalui air, tanah, dan udara',
  'simulation.insight4': 'Lingkungan → Rantai Makanan: Kehidupan laut dan organisme mengonsumsi bahan yang terkontaminasi',
  'simulation.insight5': 'Rantai Makanan → Manusia: Kita mengonsumsi makanan laut, air, dan menghirup udara yang mengandung mikroplastik',
  'simulation.insight6': 'Dampak Tersembunyi: Hubungan antara produksi dan kesehatan manusia tidak langsung tetapi tidak terhindarkan',
  
  // Lab Kimia Hijau
  'greenchem.title': 'Solusi Kimia Hijau',
  'greenchem.description': 'Jelajahi 12 Prinsip yang dapat mengubah sistem plastik',
  'greenchem.principles': '12 Prinsip Kimia Hijau',
  'greenchem.clickHex': 'Klik setiap heksagon untuk menemukan bagaimana prinsip-prinsip ini dapat menyelesaikan krisis plastik',
  'greenchem.spotlight': 'Sorotan Solusi Plastik: Evolusi Sistem',
  'greenchem.past': 'Masa Lalu (1950-2000)',
  'greenchem.present': 'Sekarang (2000-2026)',
  'greenchem.future': 'Masa Depan (2026+)',
  'greenchem.transforms': '🎯 Kimia Hijau Mengubah Sistem:',
  'greenchem.next': 'Lanjutkan ke Refleksi Akhir',
  'greenchem.principle': 'Prinsip',
  'greenchem.example': 'Contoh Umum',
  'greenchem.application': 'Aplikasi pada Sistem Plastik',
  'greenchem.pointsExplore': '+1 poin untuk menjelajahi prinsip ini!',
  'greenchem.materials': 'Bahan',
  'greenchem.production': 'Produksi',
  'greenchem.endoflife': 'Akhir Masa Pakai',
  
  // Umum
  'common.continue': 'Lanjutkan',
  'common.submit': 'Kirim',
  'common.back': 'Kembali',
  
  // System Visualization Page
  'systemViz.title': 'Visualisasi Sistem',
  'systemViz.networkTitle': 'Jaringan Sistem Plastik',
  'systemViz.instruction': 'Klik pada simpul mana pun untuk menjelajahi perannya dalam sistem. Setiap komponen terhubung.',
  'systemViz.insightTitle': '💡 Wawasan Berpikir Sistem',
  'systemViz.insightText': 'Perhatikan bagaimana setiap komponen saling terhubung. Perubahan di satu bagian sistem memengaruhi banyak bagian lainnya. Inilah esensi dari berpikir sistem - memahami hubungan, bukan hanya bagian-bagian individual.',
  'systemViz.continue': 'Lanjutkan',
  'systemViz.dialogSubtitle': 'Jelajahi peran dan dampak komponen ini dalam sistem plastik.',
  'systemViz.descriptionTitle': 'Deskripsi',
  'systemViz.exampleTitle': 'Contoh Nyata',
  'systemViz.impactsTitle': 'Dampak Sistemik',
  'systemViz.pointsEarned': '+1 poin karena menjelajahi komponen ini!',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language] = useState<Language>('id'); // Always Indonesian

  const setLanguage = (lang: Language) => {
    // Do nothing - language is fixed to Indonesian
  };

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
];