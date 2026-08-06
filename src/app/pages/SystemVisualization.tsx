import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { Footer } from '../components/Footer';
import systemDiagram from "../../assets/systemDiagram.png";

interface SystemNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  description: string;
  example: string;
  impacts: string[];
  systemNote?: string;
}

const NODES: SystemNode[] = [
  // Baris atas
  {
    id: 'ekonomi',
    label: 'Ekonomi',
    x: 12,
    y: 18,
    color: '#fbbf24',
    description: 'Plastik memiliki nilai ekonomi yang tinggi karena biaya produksinya rendah dan aplikasinya sangat luas, mulai dari kemasan, otomotif, kesehatan, hingga elektronik. Industri plastik memberikan kontribusi terhadap pertumbuhan ekonomi dan penciptaan lapangan kerja. Namun, pencemaran plastik juga menimbulkan biaya ekonomi yang besar, seperti biaya pembersihan lingkungan, kerusakan sektor perikanan, pariwisata, dan kesehatan masyarakat Konsep ekonomi sirkular dikembangkan untuk mempertahankan nilai material plastik melalui penggunaan kembali, perbaikan, dan daur ulang sehingga mengurangi kebutuhan bahan baku baru',
    example: 'Nilai industri plastik global mencapai sekitar US$580 miliar per tahun',
    impacts: ['Mendorong pertumbuhan industri', 'Penciptaan lapangan kerja', 'Mendorong penerapan ekonomi sirkular']
  },
  {
    id: 'produksi',
    label: 'Produksi',
    x: 32,
    y: 15,
    color: '#40916C',
    description: 'Produksi plastik merupakan proses pembuatan plastik di pabrik menggunakan bahan baku fosil, terutama minyak bumi dan gas alam, menjadi polimer sintetis melalui serangkaian proses kimia. Bahan baku tersebut diolah di kilang petrokimia menghasilkan monomer seperti etena (C₂H₄) dan propilena (C₃H₆). Monomer kemudian mengalami reaksi polimerisasi, yaitu penggabungan banyak molekul kecil menjadi rantai panjang yang disebut polimer, misalnya etena menjadi polietilena (PE). Panjang rantai polimer dan kuatnya ikatan karbon-karbon (C–C) menyebabkan plastik memiliki sifat ringan, kuat, tahan korosi, dan sulit terdegradasi secara alami. Sebagian besar plastik konvensional membutuhkan waktu puluhan hingga ratusan tahun untuk terurai sehingga berpotensi menimbulkan akumulasi limbah di lingkungan.',
    example: 'Produksi plastik dunia telah melampaui 400 juta ton per tahun, dengan sekitar 98% masih menggunakan bahan baku berbasis bahan bakar fosil.',
    impacts: ['Meningkatkan konsumsi minyak bumi dan gas alam', 'Menyebabkan emisi gas rumah kaca selama proses produksi', 'Menambah jumlah plastik yang berpotensi menjadi limbah setelah digunakan']
  },
  {
    id: 'konsumsi',
    label: 'Konsumsi',
    x: 54,
    y: 15,
    color: '#ff6b35',
    description: 'Konsumsi merupakan tahap penggunaan produk plastik oleh masyarakat maupun industri. Plastik sekali pakai banyak digunakan karena ringan, murah, praktis, dan tahan air. Namun, sebagian besar produk tersebut hanya digunakan beberapa menit, sedangkan plastiknya tetap berada di lingkungan selama ratusan tahun apabila tidak dikelola dengan baik. Peningkatan konsumsi plastik berkaitan erat dengan pertumbuhan penduduk, urbanisasi, pola hidup praktis, dan perkembangan industri makanan serta minuman',
    example: 'Sekitar 1 juta botol plastik dibeli setiap menit di seluruh dunia.',
    impacts: ['Volume sampah plastik meningkat', 'Terbentuk kebiasaan memakai barang sekali pakai', 'Meningkatkan kebutuhan sistem pengelolaan limbah']
  },
  {
    id: 'limbah',
    label: 'Limbah',
    x: 76,
    y: 18,
    color: '#6b7280',
    description: 'Limbah plastik merupakan sisa produk plastik yang sudah tidak digunakan lagi. Berbeda dengan limbah organik, sebagian besar plastik tidak dapat diuraikan oleh mikroorganisme karena memiliki struktur polimer yang stabil. Akibatnya, plastik lebih banyak mengalami fragmentasi menjadi potongan kecil hingga berukuran kurang dari 5 mm yang disebut mikroplastik. Pengelolaan limbah yang tidak memadai menyebabkan plastik banyak berakhir di tempat pembuangan akhir, sungai, maupun lautan.',
    example: 'Jutaan ton sampah plastik masuk ke laut setiap tahun',
    impacts: ['Pencemaran tanah dan air', 'Terbentuknya mikroplastik', 'Menurunkan kualitas lingkungan'],
    systemNote: '🎯 Catatan sistemik: Limbah memengaruhi lingkungan dan sosial.'
  },
  // Baris tengah
  {
    id: 'sosial',
    label: 'Sosial',
    x: 10,
    y: 43,
    color: '#c084fc',
    description: 'Penggunaan plastik mempengaruhi perilaku masyarakat, kesehatan, dan kualitas hidup. Kemudahan memperoleh plastik sekali pakai mendorong budaya konsumsi instan. Selain itu, paparan bahan kimia tertentu dari plastik maupun mikroplastik berpotensi mempengaruhi kesehatan manusia, meskipun dampak jangka panjangnya masih terus diteliti. Masyarakat yang tinggal di sekitar kawasan industri plastik atau lokasi pembuangan limbah memiliki risiko paparan polutan yang lebih tinggi dibandingkan wilayah lain',
    example: 'Beberapa penelitian menunjukkan masyarakat di sekitar fasilitas produksi plastik memiliki risiko gangguan kesehatan yang lebih tinggi akibat paparan polusi industri',
    impacts: ['Gangguan kesehatan', 'Menurunnya kualitas hidup masyarakat.']
  },
  {
    id: 'kebijakan',
    label: 'Kebijakan',
    x: 43,
    y: 43,
    color: '#a78bfa',
    description: 'Kebijakan merupakan instrumen pemerintah untuk mengendalikan produksi, konsumsi, dan pengelolaan plastik. Kebijakan dapat berupa larangan plastik sekali pakai, tanggung jawab produsen (Extended Producer Responsibility/EPR), standar daur ulang, maupun insentif bagi penggunaan material ramah lingkungan. Kebijakan yang efektif mampu mengubah perilaku konsumen sekaligus mendorong inovasi industri menuju sistem yang lebih berkelanjutan.',
    example: 'Lebih dari 120 negara telah menerapkan berbagai bentuk pembatasan terhadap kantong plastik sekali pakai.',
    impacts: ['Industri mengubah proses produksi', 'Masyarakat mengurangi penggunaan plastik', 'Mendorong inovasi material alternatif meningkat', 'Mengubah praktik produksi industri.'],
    systemNote: '🎯 Catatan Sistemik: Kebijakan berfungsi sebagai pengendali sistem yang dapat mempercepat atau memperlambat perubahan pada komponen lain seperti industri, konsumsi masyarakat, limbah, dan kondisi iklim.'
  },
  {
    id: 'siklus-hidup',
    label: 'Siklus Hidup',
    x: 78,
    y: 43,
    color: '#fbbf24',
    description: 'Siklus hidup plastik mencakup seluruh tahapan mulai dari ekstraksi bahan baku, produksi, distribusi, penggunaan, hingga pengelolaan akhir berupa daur ulang, pembakaran, penimbunan, atau kebocoran ke lingkungan. Analisis siklus hidup (Life Cycle Assessment/LCA) digunakan untuk menilai dampak lingkungan pada setiap tahapan sehingga dapat diketahui titik yang paling membutuhkan perbaikan. Pendekatan ini menunjukkan bahwa dampak lingkungan plastik tidak hanya terjadi ketika menjadi sampah, tetapi juga sejak proses produksi yang menggunakan energi dan bahan bakar fosil.',
    example: 'Sebagian besar plastik hanya digunakan dalam waktu singkat, tetapi tetap berada di lingkungan selama ratusan tahun',
    impacts: ['Jika tidak dikelola, plastik bertahan sangat lama', 'Akumulasi limbah', 'Mikroplastik dapat terbentuk']
  },
  // Baris bawah
  {
    id: 'lingkungan',
    label: 'Lingkungan',
    x: 22,
    y: 70,
    color: '#4ade80',
    description: 'Lingkungan merupakan sistem ekologi yang menerima dampak langsung dari pencemaran plastik. Sampah plastik dapat merusak habitat, mengganggu organisme, dan memasuki rantai makanan melalui mikroplastik. Hewan laut sering salah mengira plastik sebagai makanan sehingga menyebabkan gangguan pencernaan, kelaparan, bahkan kematian. Mikroplastik juga ditemukan pada air minum, udara, tanah, hingga berbagai organisme laut sehingga menjadi perhatian global terhadap kesehatan ekosistem',
    example: 'Mikroplastik ditemukan di 90% burung laut dan kehidupan laut',
    impacts: ['Kehilangan keanekaragaman hayati', 'Kerusakan habitat', 'Kontaminasi rantai makanan']
  },
  {
    id: 'teknologi',
    label: 'Teknologi',
    x: 43,
    y: 72,
    color: '#38bdf8',
    description: 'Perkembangan teknologi berperan penting dalam mengurangi dampak lingkungan akibat plastik melalui inovasi bahan, proses produksi, dan pengelolaan limbah. Contohnya meliputi plastik berbasis biomassa, plastik biodegradable, teknologi daur ulang mekanik dan kimia, serta penggunaan katalis yang lebih efisien sesuai prinsip green chemistry. Teknologi tidak hanya berfungsi mengatasi limbah, tetapi juga mencegah terbentuknya limbah sejak tahap desain material.',
    example: 'Plastik biodegradable yang lebih mudah terurai',
    impacts: ['Efisiensi daur ulang', 'Material alternatif', 'Potensi inovasi']
  },
  {
    id: 'keberlanjutan',
    label: 'Keberlanjutan',
    x: 72,
    y: 68,
    color: '#2D6A4F',
    description: 'Keberlanjutan merupakan upaya memenuhi kebutuhan saat ini tanpa mengurangi kemampuan generasi mendatang memenuhi kebutuhannya. Dalam pengelolaan plastik, keberlanjutan dicapai melalui penerapan prinsip green chemistry, ekonomi sirkular, penggunaan kembali (reuse), pengurangan penggunaan (reduce), daur ulang (recycle), dan pengembangan material yang lebih ramah lingkungan. Pendekatan ini bertujuan mengurangi konsumsi sumber daya alam, emisi, serta pembentukan limbah sejak tahap perancangan produk.',
    example: 'Penerapan ekonomi sirkular diperkirakan dapat mengurangi limbah plastik hingga sekitar 80% pada tahun 2040 apabila diterapkan secara luas.',
    impacts: ['Sampah berkurang', 'Lingkungan lebih terjaga untuk generasi berikutnya'],
    systemNote: '🎯 Catatan Sistemik: Keberlanjutan adalah tujuan akhir dari perbaikan sistem'
  }
];

export const SystemVisualization: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity, addPoints } = useUser();
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);

  const handleNodeClick = (node: SystemNode) => {
    setSelectedNode(node);
    addPoints(1);
  };

  const handleContinue = () => {
    completeActivity('system-viz');
    updateProgress(20);
    navigate('/drag-drop-activity');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#2D6A4F] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">SYNERGY - {t('systemViz.title')}</h1>
          <Button variant="ghost" className="text-white" onClick={() => navigate('/dashboard')}>
            {t('nav.back')}
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">{t('systemViz.networkTitle')}</h2>
            <p className="text-xl text-gray-600">
              {t('systemViz.instruction')}
            </p>
          </div>

          {/* Ilustrasi Diagram Sistem */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <img
              src={systemDiagram}
              alt="Ilustrasi Diagram Sistem Penggunaan Plastik Sekali Pakai"
              className="w-full max-w-4xl mx-auto rounded-lg"
            />
          </div>

          {/* System Diagram */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
            {/* Draw nodes */}
            {NODES.map((node, idx) => (
              <motion.div
                key={node.id}
                className="cursor-pointer"
  
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleNodeClick(node)}
              >
                <div
                  className="rounded-full flex items-center justify-center text-white font-semibold text-center shadow-lg border-4 border-white text-sm px-3 w-20 h-20 md:w-28 md:h-28"
                  style={{ backgroundColor: node.color }}
                >
                  {node.label}
                </div>
              </motion.div>
            ))}

          </div>
        </div>

          {/* Instructions */}
          <div className="bg-[#2D6A4F]/10 border-l-4 border-[#2D6A4F] p-6 rounded mb-8">
            <h3 className="font-bold text-lg mb-2">{t('systemViz.insightTitle')}</h3>
            <p className="text-gray-700">
              {t('systemViz.insightText')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
  <Button
    size="lg"
    className="bg-[#2D6A4F] hover:bg-[#40916C] text-white"
    onClick={() => navigate('/problem-trigger')}
  >
    Kembali
  </Button>

  <Button
    size="lg"
    className="bg-[#2D6A4F] hover:bg-[#40916C] text-white"
    onClick={handleContinue}
  >
    {t('systemViz.continue')}
  </Button>
</div>
        </motion.div>
      </div>

      {/* Node Detail Dialog */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
       <DialogContent className="max-w-2xl w-[95%] max-h-[90vh] overflow-y-auto">

  {/* Tombol silang pojok kanan */}
  <button
    onClick={() => setSelectedNode(null)}
    className="absolute top-4 right-4 text-gray-500 hover:text-black"
  >
    <X className="w-6 h-6" />
  </button>

  <DialogHeader>
    <DialogTitle className="text-2xl">
      {selectedNode?.label}
    </DialogTitle>

    <DialogDescription className="text-gray-500">
      {t('systemViz.dialogSubtitle')}
    </DialogDescription>
  </DialogHeader>
          {selectedNode && (
  <div className="space-y-6 p-4">
              <div>
               <h4 className="font-semibold text-base md:text-lg mb-2">{t('systemViz.descriptionTitle')}</h4>
                <p className="text-gray-700">{selectedNode.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">{t('systemViz.exampleTitle')}</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedNode.example}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">{t('systemViz.impactsTitle')}</h4>
                <ul className="space-y-2">
                  {selectedNode.impacts.map((impact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#2D6A4F] mt-1">▸</span>
                      <span className="text-gray-700">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {selectedNode.systemNote && (
                <div className="pt-4">
                  <p className="text-sm text-gray-500 italic">{selectedNode.systemNote}</p>
                </div>
              )}
             
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};