import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, X } from 'lucide-react';
import { Footer } from '../components/Footer';

interface Principle {
  id: number;
  title: string;
  description: string;
  example: string;
  plasticApplication: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: 1,
    title: '1. Pencegahan',
    description: 'Lebih baik mencegah terbentuknya limbah daripada harus mengolah atau membersihkannya setelah terbentuk',
    example: 'Merancang proses produksi yang menghasilkan limbah seminimal mungkin (zero waste manufacturing).',
    plasticApplication: 'Mengurangi produksi dan penggunaan plastik sekali pakai melalui desain produk yang dapat digunakan kembali (reuse) atau sistem isi ulang (refill), sehingga jumlah limbah plastik yang dihasilkan menjadi lebih sedikit.'
  },
  {
    id: 2,
    title: '2. Ekonomi Atom',
    description: 'Kimia hijau mengedepankan nilai ekonomi tinggi. Nilai ekonomi atom diukur berdasarkan jumlah bahan kimia yang berhasil diubah menjadi produk',
    example: 'Reaksi yang menggabungkan semua atom dari reaktan ke dalam produk',
    plasticApplication: 'Produksi polimer melalui polimerisasi adisi, seperti pembentukan polietilena dari etena, yang menghasilkan sangat sedikit produk samping sehingga penggunaan bahan baku menjadi lebih efisien'
  },
  {
    id: 3,
    title: '3. Pengurangan Dampak Sintesis Berbahaya',
    description: 'Merancang sintesis untuk menggunakan dan menghasilkan zat dengan toksisitas rendah atau tanpa toksisitas',
    example: 'Mengganti pelarut organik berbahaya dengan air atau pelarut ramah lingkungan.',
    plasticApplication: 'Memproduksi plastik tanpa katalis beracun atau aditif berbahaya, menghindari penggunaan monomer beracun seperti vinil klorida berlebih'
  },
  {
    id: 4,
    title: '4. Mendesain Bahan Kimia Lebih Aman',
    description: 'Merancang produk kimia agar tetap berfungsi dengan baik tetapi memiliki dampak negatif yang lebih rendah terhadap kesehatan dan lingkungan.',
    example: 'Membuat bioplastik yang tidak beracun',
    plasticApplication: 'Mengembangkan material plastik yang tidak melepaskan zat aditif berbahaya selama digunakan maupun setelah menjadi limbah.'
  },
  {
    id: 5,
    title: '5. Penggunaan Pelarut yang Lebih Aman',
    description: 'Mengurangi penggunaan pelarut dan zat tambahan atau menggantinya dengan bahan yang lebih aman.',
    example: 'Menggunakan air atau CO₂ sebagai pelarut',
    plasticApplication: 'Menggunakan proses polimerisasi berbasis air (water-based polymerization) atau proses tanpa pelarut (solvent-free process) sehingga limbah pelarut berbahaya dapat dikurangi.'
  },
  {
    id: 6,
    title: '6. Efisiensi Energi',
    description: 'Memilih metode yang paling tidak boros energi. Menghindari pemanasan dan pendinginan, serta kondisi bertekanan dan vakum (suhu dan tekanan optimal) yang efisien',
    example: 'Reaksi berlangsung pada suhu ruang tanpa pemanasan berlebih',
    plasticApplication: 'Mengembangkan proses produksi dan daur ulang plastik yang membutuhkan energi lebih rendah sehingga emisi gas rumah kaca dapat dikurangi.'
  },
  {
    id: 7,
    title: '7. PenggunaanBahan Baku Terbarukan',
    description: 'Menggunakanbahan baku dari sumber terbarukan (dari nabati) dibandingkan bahan kimia setara lainnya yang berasal dari sumber petrokimia',
    example: 'Menggunakan pati jagung atau tebu sebagai bahan baku bioplastik.',
    plasticApplication: 'Mengembangkan bioplastik berbahan pati, selulosa, ganggang, atau limbah biomassa sebagai alternatif plastik berbasis minyak bumi.'
  },
  {
    id: 8,
    title: '8. Penggunaan Bahan Turunan Kimia',
    description: 'Perlu menghindari penggunaan bahan turunan kimia bila memungkinkan',
    example: 'Sintesis langsung tanpa gugus pelindung',
    plasticApplication: 'Merancang proses sintesis polimer dengan tahapan yang lebih sederhana sehingga penggunaan bahan kimia tambahan dan pembentukan limbah dapat diminimalkan.'
  },
  {
    id: 9,
    title: '9. Penggunaan Kataliss',
    description: 'Penggunaan katalis diutamakan karena dapat membantu meningkatkan selektivitas, meminimalkan limbah, dan mengurangi waktu reaksi dan kebutuhan energi',
    example: 'Menggunakan enzim atau katalis logam yang dapat digunakan kembali.',
    plasticApplication: 'Menggunakan katalis atau biokatalis dalam sintesis maupun daur ulang plastik sehingga proses berlangsung lebih cepat, membutuhkan energi lebih rendah, dan menghasilkan limbah yang lebih sedikit.'
  },
  {
    id: 10,
    title: '10. Mendesain Produk untuk Degradasi',
    description: 'Mengupayakan mendesain produk yang terdegradasi yang akan mengurangi timbulnya limbah dan polusi yang dapat merusak lingkungan',
    example: 'Plastik biodegradable yang dapat terurai di tanah atau kompos tanpa meninggalkan mikroplastik berbahaya',
    plasticApplication: 'Mengembangkan plastik biodegradable yang dapat terdegradasi sesuai lingkungan penggunaannya sehingga tidak menumpuk sebagai sampah jangka panjang.'
  },
  {
    id: 11,
    title: '11. Analisis Real-time untuk Pencegahan Polusi',
    description: 'Memantau reaksi secara langsung (real-time) untuk mendeteksi dan mencegah terbentuknya zat berbahaya sejak awal',
    example: 'Sensor yang dapat mendeteksi adanya zat berbahaya atau produk sampingan selama proses produksi',
    plasticApplication: 'Menggunakan sistem pemantauan otomatis pada proses produksi plastik untuk mengendalikan emisi dan mencegah pelepasan bahan kimia berbahaya ke lingkungan'
  },
  {
    id: 12,
    title: '12. Kimia Aman untuk Pencegahan Kecelakaan',
    description: 'Memilih bahan kimia dan kondisi proses yang lebih aman sehingga mengurangi risiko kebakaran, ledakan, atau kebocoran bahan berbahaya',
    example: 'Menggunakan bahan kimia yang tidak mudah terbakar, tidak mudah meledak, dan tidak beracun',
    plasticApplication: 'Menggunakan bahan baku, pelarut, dan kondisi operasi yang lebih aman dalam industri plastik untuk melindungi pekerja, masyarakat, dan lingkungan dari risiko kecelakaan kimia.'
  }
];

export const GreenChemistryLab: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity, addPoints } = useUser();
  const [selectedPrinciple, setSelectedPrinciple] = useState<Principle | null>(null);
  const [systemStage, setSystemStage] = useState<'past' | 'present' | 'future'>('past');

  const handlePrincipleClick = (principle: Principle) => {
    setSelectedPrinciple(principle);
    addPoints(1);
  };

  const handleContinue = () => {
    completeActivity('green-chem');
    updateProgress(80);
    navigate('/reflection');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#2D6A4F] text-white px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <h1 className="text-lg sm:text-2xl font-bold text-center sm:text-left">SYNERGY - Solusi Kimia Hijau</h1>
          <Button variant="ghost" className="text-white text-sm sm:text-base" onClick={() => navigate('/dashboard')}>
            ← Dashboard
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Section Pembuka */}
          <motion.div
            className="bg-gradient-to-br from-[#2D6A4F] via-[#40916C] to-[#2A9D8F] rounded-3xl shadow-2xl p-8 sm:p-12 mb-12 sm:mb-16 overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-32 -translate-x-32" />

            <div className="max-w-4xl mx-auto relative z-10">
              <motion.div
                className="flex items-center justify-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
                  <Leaf className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <h2 className="text-4xl sm:text-6xl font-bold text-white">Green Chemistry</h2>
              </motion.div>

              <motion.p
                className="text-base sm:text-xl text-white/90 text-center mb-8 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Green chemistry adalah konsep dalam ilmu kimia yang berfokus pada perancangan produk dan proses yang lebih aman, efisien, serta meminimalkan dampak negatif terhadap lingkungan.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="bg-white/20 backdrop-blur-md rounded-xl p-5 text-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl mb-2">♻️</div>
                  <p className="text-sm sm:text-base font-semibold text-white">Mengurangi limbah sejak awal</p>
                </motion.div>
                <motion.div
                  className="bg-white/20 backdrop-blur-md rounded-xl p-5 text-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl mb-2">🛡️</div>
                  <p className="text-sm sm:text-base font-semibold text-white">Menggunakan bahan yang lebih aman</p>
                </motion.div>
                <motion.div
                  className="bg-white/20 backdrop-blur-md rounded-xl p-5 text-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl mb-2">🌱</div>
                  <p className="text-sm sm:text-base font-semibold text-white">Mendukung keberlanjutan sistem</p>
                </motion.div>
              </motion.div>

              <motion.p
                 className="
    text-sm sm:text-lg 
    text-white text-center italic 
    bg-white/10 backdrop-blur-sm 
    rounded-2xl sm:rounded-full
    px-4 sm:px-8 
    py-3 sm:py-4 
    max-w-[90%] sm:max-w-full 
    mx-auto 
    leading-relaxed
  "
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Hal ini diwujudkan melalui 12 prinsip yang menjadi dasar dalam menciptakan solusi berkelanjutan, termasuk dalam mengatasi masalah plastik.
              </motion.p>
            </div>
          </motion.div>

          {/* Honeycomb Grid */}
          <div className="mb-12 sm:mb-16">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="inline-block bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-transparent bg-clip-text mb-3">
                <h3 className="text-3xl sm:text-4xl font-bold px-4">
                  12 Prinsip Kimia Hijau
                </h3>
              </div>
              <p className="text-center text-base sm:text-lg text-gray-600 px-4 max-w-2xl mx-auto">
                Klik setiap heksagon untuk menemukan bagaimana prinsip ini dapat memecahkan krisis plastik
              </p>
            </motion.div>
            
            {/* Desktop Hexagon Grid */}
            <div className="hidden lg:flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 shadow-inner">
              <div className="relative" style={{ width: '660px', height: '420px' }}>
                {PRINCIPLES.map((principle, idx) => {
                  // Desktop honeycomb positioning
                  const positions = [
                    { x: 220, y: 20 },
                    { x: 360, y: 20 },
                    { x: 160, y: 100 },
                    { x: 300, y: 100 },
                    { x: 440, y: 100 },
                    { x: 100, y: 180 },
                    { x: 240, y: 180 },
                    { x: 380, y: 180 },
                    { x: 520, y: 180 },
                    { x: 160, y: 260 },
                    { x: 300, y: 260 },
                    { x: 440, y: 260 },
                  ];
                  
                  const pos = positions[idx];
                  
                  return (
                    <motion.div
                      key={principle.id}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                      onClick={() => handlePrincipleClick(principle)}
                    >
                      <Hexagon 
                        number={principle.id}
                        color={`hsl(${(idx * 30) % 360}, 70%, 55%)`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile/Tablet Grid - Simple 3 columns */}
            <div className="lg:hidden grid grid-cols-3 gap-3 sm:gap-5 max-w-md mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 shadow-lg">
              {PRINCIPLES.map((principle, idx) => (
                <motion.div
                  key={principle.id}
                  className="cursor-pointer group flex justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePrincipleClick(principle)}
                >
                  <Hexagon
                    number={principle.id}
                    color={`hsl(${(idx * 30) % 360}, 70%, 55%)`}
                    size="small"
                  />
                </motion.div>
              ))}
            </div>

            {/* Teks di bawah hexagon */}
            <motion.div
              className="mt-8 px-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="bg-gradient-to-r from-[#2D6A4F]/10 via-[#40916C]/10 to-[#2A9D8F]/10 rounded-2xl p-6 border-l-4 border-[#2D6A4F]">
                <p className="text-center text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
                  ✨ Prinsip-prinsip ini bekerja bersama untuk mengubah permasalahan plastik khususnya plastik sekali pakai, dari produksi hingga akhir masa pakai.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Penghubung ke Sistem */}
          <motion.div
            className="relative mb-12 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-[#2A9D8F]/20 via-[#40916C]/20 to-[#2D6A4F]/20 rounded-3xl p-8 border-2 border-[#2A9D8F]/30 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#2A9D8F]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#40916C]/10 rounded-full blur-2xl" />

              <div className="relative z-10 text-center">
                <div className="inline-block bg-[#2A9D8F] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  🔗 Koneksi Permasalahan
                </div>
                <p className="text-lg sm:text-xl text-gray-800 font-semibold max-w-3xl mx-auto leading-relaxed">
                  Solusi ini tidak berdiri sendiri, tetapi bekerja pada berbagai bagian komponen permasalahan yang saling terhubung.
                </p>
              </div>
            </div>
          </motion.div>

          {/* System Evolution Timeline */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl mb-12 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-transparent bg-clip-text mb-2">
                <h3 className="text-2xl sm:text-4xl font-bold px-2">
                  Transformasi Daur Hidup Plastik Sekali Pakai
                </h3>
              </div>
              <p className="text-base sm:text-lg text-gray-600">melalui Green Chemistry</p>
            </div>
            
            <div className="text-center mb-4">
  <span className={`
    inline-block px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300
    ${systemStage === 'past' && 'bg-red-100 text-red-600'}
    ${systemStage === 'present' && 'bg-orange-100 text-orange-600'}
    ${systemStage === 'future' && 'bg-green-100 text-green-600'}
  `}>
    {systemStage === 'past' && '1950 - 2000'}
    {systemStage === 'present' && '2000 - 2026'}
    {systemStage === 'future' && '2026+'}
  </span>
</div>


            {/* Stage Selector */}
            <div className="flex justify-center mb-10 px-4">
  <div className="relative w-full max-w-xl">

    {/* Background */}
    <div className="bg-gray-100 rounded-2xl p-1 flex shadow-inner">

      {[
        { key: 'past', label: 'Masa Lalu', color: 'red' },
        { key: 'present', label: 'Sekarang', color: 'orange' },
        { key: 'future', label: 'Masa Depan', color: 'green' }
      ].map((item) => (
        <button
          key={item.key}
          onClick={() => setSystemStage(item.key as any)}
          className={`flex-1 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 relative z-10
          ${
            systemStage === item.key
              ? `text-white`
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {item.label}
        </button>
      ))}

      {/* ACTIVE SLIDER */}
      <div
        className={`absolute top-1 bottom-1 w-1/3 rounded-xl transition-all duration-300 shadow-lg
        ${
          systemStage === 'past'
            ? 'left-1 bg-gradient-to-r from-red-500 to-red-600'
            : systemStage === 'present'
            ? 'left-1/3 bg-gradient-to-r from-orange-500 to-orange-600'
            : 'left-2/3 bg-gradient-to-r from-green-500 to-green-600'
        }`}
      />
    </div>

  </div>
</div>

            {/* Timeline Content */}
            <motion.div
              key={systemStage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              {systemStage === 'past' && (
                <>
                  <TimelineCard
                    title="Material"
                    content="100% plastik berbasis minyak bumi (tidak bisa diperbarui)"
                    icon="🛢️"
                    color="red"
                  />
                  <TimelineCard
                    title="Produksi"
                    content="Proses boros energi dan beracun"
                    icon="🏭"
                    color="red"
                  />
                  <TimelineCard
                    title="Akhir Masa Pakai"
                    content="Linear: buat → pakai → buang (sulit terurai di alam)"
                    icon="🗑️"
                    color="red"
                  />
                </>
              )}
              
              {systemStage === 'present' && (
                <>
                  <TimelineCard
                    title="Material"
                    content="Campuran minyak bumi dan bio/bahan alami (10%)"
                    icon="🌱"
                    color="orange"
                  />
                  <TimelineCard
                    title="Produksi"
                    content="Daur ulang terbatas dan belum maksimal (9%), alternatif berkembang"
                    icon="♻️"
                    color="orange"
                  />
                  <TimelineCard
                    title="Akhir Masa Pakai"
                    content="Sirkularitas terbatas, kesadaran meningkat"
                    icon="🔄"
                    color="orange"
                  />
                </>
              )}
              
              {systemStage === 'future' && (
                <>
                  <TimelineCard
                    title="Material"
                    content="Bahan baku terbarukan, polimer biodegradable"
                    icon="🌿"
                    color="green"
                  />
                  <TimelineCard
                    title="Produksi"
                    content="Proses lebih aman, hemat energi, dan tidak mencemari lingkungan"
                    icon="✨"
                    color="green"
                  />
                  <TimelineCard
                    title="Akhir Masa Pakai"
                    content="Desain untuk degradasi & reuse: plastik dirancang untuk bisa digunakan ulang atau terurai"
                    icon="🔁"
                    color="green"
                  />
                </>
              )}
            </motion.div>

            {systemStage === 'future' && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-6 sm:mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden"
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-5">
                    <div className="bg-green-600 text-white px-5 py-2 rounded-full font-bold text-base sm:text-lg flex items-center gap-2">
                      <span>🎯</span>
                      <span>Kimia Hijau Mengubah dan Mengatasi PermasalahanPlastik</span>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm sm:text-base text-gray-800">
                    {[
                      { icon: '🚫', text: 'Pencegahan (Prinsip 1) menghentikan masalah sebelum dimulai' },
                      { icon: '🛡️', text: 'Bahan kimia lebih aman (Prinsip 4) melindungi kesehatan manusia dan lingkungan' },
                      { icon: '⚡', text: 'Produksi hemat energi (Prinsip 6) mengurangi jejak karbon' },
                      { icon: '🌾', text: 'Bahan baku terbarukan (Prinsip 7) menggantikan bahan bakar fosil' },
                      { icon: '♻️', text: 'Desain untuk degradasi (Prinsip 10) memecahkan masalah limbah' },
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 hover:bg-white/80 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                      >
                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                        <span className="font-medium">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Section Penutup */}
          <motion.div
            className="bg-gradient-to-br from-[#2D6A4F] via-[#40916C] to-[#2A9D8F] rounded-3xl shadow-2xl p-8 sm:p-12 mb-10 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-20 -translate-x-20" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <span className="text-sm sm:text-base font-semibold">🔗 Kesimpulan</span>
              </motion.div>

              <motion.h3
                className="text-3xl sm:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Dampak Terintegrasi
              </motion.h3>

              <motion.p
                className="text-lg sm:text-xl leading-relaxed bg-white/10 backdrop-blur-sm rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Ketika prinsip-prinsip green chemistry diterapkan secara bersama, perubahan tidak hanya terjadi pada satu bagian, tetapi menyebar ke seluruh permasalahan.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
  className="flex flex-col sm:flex-row justify-center gap-5"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.5 }}
>

  {/* Tombol Kembali */}
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      size="lg"
      className="bg-white border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white px-10 py-6 text-lg rounded-full shadow-lg transition-all duration-300"
      onClick={() => navigate(-1)}
    >
      ⬅️ Kembali
    </Button>
  </motion.div>

  {/* Tombol Lanjut */}
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      size="lg"
      className="bg-white border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white px-10 py-6 text-lg rounded-full shadow-lg transition-all duration-300"
      onClick={handleContinue}
    >
      🌱 Refleksi Akhir
    </Button>
  </motion.div>

</motion.div>
        </motion.div>
      </div>

      {/* Principle Detail Dialog */}
      <Dialog open={!!selectedPrinciple} onOpenChange={() => setSelectedPrinciple(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#2D6A4F]/20" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between pr-8">
              <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-transparent bg-clip-text">
                {selectedPrinciple?.title}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPrinciple(null)}
                className="absolute right-4 top-4 hover:bg-red-100 hover:text-red-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedPrinciple && (
            <div className="space-y-5 sm:space-y-7 px-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-5 border-l-4 border-[#2D6A4F]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-[#2D6A4F] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    📋
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#2D6A4F]">Prinsip</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{selectedPrinciple.description}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-4 sm:p-5 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    💡
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-blue-700">Contoh Umum</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{selectedPrinciple.example}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-5 border-l-4 border-green-500 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    ♻️
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-green-700">Penerapan pada Sistem Plastik</h4>
                </div>
                <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">{selectedPrinciple.plasticApplication}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

interface HexagonProps {
  number: number;
  color: string;
  size?: 'small' | 'large';
}

const Hexagon: React.FC<HexagonProps> = ({ number, color, size = 'large' }) => {
  const hexWidth = size === 'small' ? 50 : 100;
  const hexHeight = size === 'small' ? 57.5 : 115;

  return (
    <div className="relative group" style={{ width: `${hexWidth}px`, height: `${hexHeight}px` }}>
      <svg viewBox="0 0 100 115" className="w-full h-full drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300">
        {/* Shadow/Glow effect */}
        <defs>
          <filter id={`glow-${number}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <polygon
          points="50,5 95,30 95,80 50,105 5,80 5,30"
          fill={color}
          stroke="white"
          strokeWidth="4"
          className="transition-all duration-300 group-hover:stroke-[6] group-hover:filter"
          filter={`url(#glow-${number})`}
        />
        <text
          x="50"
          y="65"
          textAnchor="middle"
          fill="white"
          fontSize="32"
          fontWeight="bold"
          className="transition-all duration-300 group-hover:scale-110"
          style={{ transformOrigin: 'center' }}
        >
          {number}
        </text>
      </svg>
    </div>
  );
};

interface TimelineCardProps {
  title: string;
  content: string;
  icon: string;
  color: 'red' | 'orange' | 'green';
}

const TimelineCard: React.FC<TimelineCardProps> = ({ title, content, icon, color }) => {
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    orange: 'from-orange-500 to-orange-600',
    green: 'from-green-500 to-green-600'
  };

  const shadowClasses = {
    red: 'shadow-red-500/40',
    orange: 'shadow-orange-500/40',
    green: 'shadow-green-500/40'
  };

  return (
    <motion.div
      className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-6 sm:p-8 text-white shadow-xl ${shadowClasses[color]} relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <motion.div
          className="text-6xl sm:text-7xl mb-5 text-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {icon}
        </motion.div>
        <h4 className="font-bold text-xl sm:text-2xl mb-3 text-center">{title}</h4>
        <p className="text-sm sm:text-base text-center opacity-95 leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
};