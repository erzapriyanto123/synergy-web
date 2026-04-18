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
    description: 'Sistem ekonomi yang mendorong dan dipengaruhi oleh penggunaan plastik',
    example: 'Industri plastik global bernilai $580 miliar per tahun',
    impacts: ['Kekuatan pasar', 'Penciptaan lapangan kerja', 'Pertumbuhan ekonomi vs keberlanjutan']
  },
  {
    id: 'produksi',
    label: 'Produksi',
    x: 32,
    y: 15,
    color: '#40916C',
    description: 'Produksi adalah proses pembuatan plastik di pabrik menggunakan bahan baku minyak bumi melalui proses kimia. Plastik sebagian besar dibuat dari minyak bumi dan gas alam yang mengandung senyawa hidrokarbon. Hidrokarbon tersusun dari atom karbon (C) dan hidrogen (H). Senyawa kecil seperti etena (C₂H₄) atau propilena (C₃H₆) disebut monomer, yaitu bahan dasar pembentuk plastik. Plastik terbentuk melalui reaksi kimia yang disebut polimerisasi, yaitu proses penggabungan banyak molekul monomer menjadi rantai panjang yang disebut polimer. Contohnya: Etena → Polietilena (PE). Semakin panjang rantai polimer, semakin kuat dan sulit plastik terurai di alam. Karena ikatan kimia dalam polimer sangat stabil, plastik dapat bertahan puluhan hingga ratusan tahun di lingkungan.',
    example: 'Pabrik memproduksi 400 juta ton plastik per tahun menggunakan bahan bakar fosil',
    impacts: ['Menggunakan energi dalam jumlah besar', 'Menghasilkan asap dan gas', 'Jumlah plastik yang beredar semakin banyak']
  },
  {
    id: 'konsumsi',
    label: 'Konsumsi',
    x: 54,
    y: 15,
    color: '#ff6b35',
    description: 'Penggunaan produk plastik oleh individu dan industri',
    example: '1 juta botol plastik dibeli setiap menit di seluruh dunia',
    impacts: ['Sampah plastik bertambah', 'Terbentuk kebiasaan memakai barang sekali pakai']
  },
  {
    id: 'limbah',
    label: 'Limbah',
    x: 76,
    y: 18,
    color: '#6b7280',
    description: 'Limbah adalah sisa atau buangan dari suatu usaha dan/atau kegiatan manusia, baik domestik (rumah tangga) maupun industri, yang sudah tidak memiliki nilai atau manfaat ekonomis. Limbah plastik adalah plastik yang sudah tidak terpakai dan dibuang.',
    example: 'Penumpukan sampah plastik di TPA, sungai, dan laut.',
    impacts: ['Pencemaran tanah dan air', 'Hewan dapat memakan plastik'],
    systemNote: '🎯 Catatan sistemik: Limbah memengaruhi lingkungan dan sosial.'
  },
  // Baris tengah
  {
    id: 'sosial',
    label: 'Sosial',
    x: 10,
    y: 43,
    color: '#c084fc',
    description: 'Dampak pada kesehatan manusia, perilaku, dan komunitas',
    example: 'Komunitas dekat fasilitas plastik menghadapi tingkat kanker 50% lebih tinggi',
    impacts: ['Gangguan kesehatan', 'Pola hidup konsumtif semakin kuat']
  },
  {
    id: 'kebijakan',
    label: 'Kebijakan',
    x: 43,
    y: 43,
    color: '#a78bfa',
    description: 'Kebijakan merupakan aturan, regulasi, atau keputusan yang dibuat pemerintah atau lembaga untuk mengatur aktivitas produksi, konsumsi, dan pengelolaan lingkungan.',
    example: '127 negara telah melarang kantong plastik sekali pakai',
    impacts: ['Industri mengubah proses produksi', 'Masyarakat mengurangi penggunaan plastik', 'Inovasi material alternatif meningkat', 'Sistem pengelolaan limbah menjadi lebih terarah'],
    systemNote: '🎯 Catatan Sistemik: Kebijakan berfungsi sebagai pengendali sistem yang dapat mempercepat atau memperlambat perubahan pada komponen lain seperti industri, konsumsi masyarakat, limbah, dan kondisi iklim.'
  },
  {
    id: 'siklus-hidup',
    label: 'Siklus Hidup',
    x: 78,
    y: 43,
    color: '#fbbf24',
    description: 'Siklus hidup adalah perjalanan plastik sejak diproduksi, digunakan, hingga dibuang atau didaur ulang. Plastik tidak mudah terurai karena mikroorganisme sulit memutus ikatan kimia pada rantai polimer. Plastik hanya mengalami proses degradasi fisik akibat cahaya matahari, panas, dan gesekan sehingga berubah menjadi mikroplastik.',
    example: 'Kantong plastik rata-rata digunakan 12 menit, namun bertahan 450+ tahun',
    impacts: ['Jika tidak dikelola, plastik bertahan sangat lama', 'Mikroplastik dapat terbentuk']
  },
  // Baris bawah
  {
    id: 'lingkungan',
    label: 'Lingkungan',
    x: 22,
    y: 70,
    color: '#4ade80',
    description: 'Ekosistem alami yang terdampak oleh polusi plastik',
    example: 'Mikroplastik ditemukan di 90% burung laut dan kehidupan laut',
    impacts: ['Kehilangan keanekaragaman hayati', 'Kerusakan habitat', 'Kontaminasi rantai makanan']
  },
  {
    id: 'teknologi',
    label: 'Teknologi',
    x: 43,
    y: 72,
    color: '#38bdf8',
    description: 'Inovasi dalam produksi, daur ulang, dan alternatif',
    example: 'Plastik biodegradable yang lebih mudah terurai',
    impacts: ['Efisiensi daur ulang', 'Material alternatif', 'Potensi inovasi']
  },
  {
    id: 'keberlanjutan',
    label: 'Keberlanjutan',
    x: 72,
    y: 68,
    color: '#2D6A4F',
    description: 'Keseimbangan jangka panjang antara kebutuhan manusia dan kesehatan lingkungan',
    example: 'Model ekonomi sirkular mengurangi limbah plastik hingga 80%',
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
              alt="Ilustrasi Diagram Sistem Plastik"
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

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-[#2D6A4F] hover:bg-[#40916C]"
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