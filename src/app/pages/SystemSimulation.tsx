import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { Footer } from '../components/Footer';
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import video4 from "../../assets/video4.mp4";
import video5 from "../../assets/video5.mp4";

const STAGES = [
  {
    id: 1,
    title: 'Tahap 1: Produksi Meningkat',
    description: 'Produksi plastik global naik dari 400 juta menjadi 530 juta ton selama 5 tahun',
    visual: 'production',
    narration: 'Seiring meningkatnya permintaan, pabrik memproduksi lebih banyak produk plastik. Bahan baku diekstraksi, diproses, dan diproduksi dengan tingkat yang semakin cepat.'
  },
  {
    id: 2,
    title: 'Tahap 2: Akumulasi Limbah',
    description: 'Peningkatan produksi menghasilkan lebih banyak limbah yang masuk ke lingkungan',
    visual: 'waste',
    narration: 'Sebagian besar produk plastik digunakan sebentar tetapi bertahan selama berabad-abad. Limbah terakumulasi di tempat pembuangan, saluran air, dan akhirnya samudra.'
  },
  {
    id: 3,
    title: 'Tahap 3: Pembentukan Mikroplastik',
    description: 'Plastik terdegradasi menjadi partikel kecil yang menyebar ke seluruh ekosistem',
    visual: 'microplastic',
    narration: 'Seiring waktu, potongan plastik yang lebih besar terurai menjadi mikroplastik melalui paparan UV dan pelapukan fisik. Partikel-partikel ini menyebar melalui air, tanah, dan udara.'
  },
  {
    id: 4,
    title: 'Tahap 4: Kontaminasi Rantai Makanan',
    description: 'Mikroplastik memasuki rantai makanan melalui kehidupan laut',
    visual: 'foodchain',
    narration: 'Plankton dan ikan kecil mengonsumsi mikroplastik. Ikan yang lebih besar memakan ikan kecil yang terkontaminasi, memusatkan plastik naik ke rantai makanan.'
  },
  {
    id: 5,
    title: 'Tahap 5: Dampak Kesehatan Manusia',
    description: 'Manusia mengonsumsi makanan laut dan air yang terkontaminasi',
    visual: 'human',
    narration: 'Sistem melengkapi siklusnya: manusia, yang menciptakan plastik, kini mengonsumsinya melalui makanan laut, air minum, dan bahkan udara yang kita hirup. Studi menemukan mikroplastik dalam darah, paru-paru, dan organ manusia.'
  }
];

export const SystemSimulation: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity, addPoints } = useUser();
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1);
    }
  };

 const handleSubmitReflection = () => {
  if (reflection.trim()) {
    addPoints(10);
    setSubmitted(true);
  }
};

  const handleContinue = () => {
    completeActivity('simulation');
    updateProgress(60);
    navigate('/green-chemistry-lab');
  };

  const stage = STAGES[currentStage];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#2D6A4F] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">SYNERGY - Simulasi Sistem</h1>
          <Button variant="ghost" className="text-white" onClick={() => navigate('/dashboard')}>
            ← Dasbor
          </Button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Simulasi Sistem: Perjalanan Plastik</h2>
            <p className="text-xl text-gray-600">
              Saksikan bagaimana dampak menyebar ke berbagai tingkat sistem
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {STAGES.map((s, idx) => (
                <div key={s.id} className="flex-1 text-center">
                  <div className={`text-sm font-semibold ${
                    idx <= currentStage ? 'text-[#2D6A4F]' : 'text-gray-400'
                  }`}>
                    Tahap {s.id}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2D6A4F] to-[#40916C]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStage + 1) / STAGES.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Main Simulation Area */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8"
              >
                {/* Stage Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-3">{stage.title}</h3>
                  <p className="text-xl text-gray-600">{stage.description}</p>
                </div>

                {/* Visual Representation */}
                <div className="mb-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-12 min-h-96 flex items-center justify-center">
                  <SimulationVisual type={stage.visual} />
                </div>

                {/* Narration */}
                <div className="bg-[#2D6A4F]/10 border-l-4 border-[#2D6A4F] p-6 rounded">
                  <p className="text-lg text-gray-700 leading-relaxed">{stage.narration}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="bg-gray-50 px-8 py-6 flex items-center justify-between border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStage === 0}
              >
                ← Sebelumnya
              </Button>

              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-600">
                  {currentStage + 1} / {STAGES.length}
                </span>
              </div>

              <Button
                onClick={handleNext}
                disabled={currentStage === STAGES.length - 1}
                className="bg-[#2D6A4F] hover:bg-[#40916C]"
              >
                Selanjutnya →
              </Button>
            </div>
          </div>

          {/* Reflection Question */}
          {currentStage === STAGES.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Refleksi Kritis 🤔</h3>
              <p className="text-lg mb-6 text-gray-700">
                Bagaimana peningkatan produksi dapat memunculkan mikroplastik sebagai dampak tersembunyi yang pada akhirnya mempengaruhi manusia?
              </p>

              <textarea
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 min-h-32"
                placeholder="Jelaskan bagaimana produksi mengarah ke mikroplastik dan dampaknya pada manusia..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                disabled={submitted}
              />

              {!submitted ? (
                <Button
                  onClick={handleSubmitReflection}
                  disabled={!reflection.trim()}
                  className="bg-[#2D6A4F] hover:bg-[#40916C] w-full"
                >
                  Kirim Refleksi (+10 poin)
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-6">
                    <h4 className="font-bold text-lg mb-3 text-green-800">✓ Refleksi Sangat Baik! +10 poin</h4>
                    <h5 className="font-bold mb-3">Insight Kunci Sistem:</h5>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ <strong>Produksi → Limbah:</strong> Lebih banyak manufaktur plastik menciptakan lebih banyak produk yang dibuang</li>
                      <li>✓ <strong>Limbah → Mikroplastik:</strong> Paparan UV dan pelapukan memecah plastik menjadi partikel kecil</li>
                      <li>✓ <strong>Mikroplastik → Lingkungan:</strong> Partikel menyebar melalui air, tanah, dan udara</li>
                      <li>✓ <strong>Lingkungan → Rantai Makanan:</strong> Kehidupan laut dan organisme mengonsumsi material terkontaminasi</li>
                      <li>✓ <strong>Rantai Makanan → Manusia:</strong> Kita mengonsumsi makanan laut, air, dan menghirup udara yang mengandung mikroplastik</li>
                      <li>✓ <strong>Dampak Tersembunyi:</strong> Koneksi antara produksi dan kesehatan manusia tidak langsung tetapi tidak dapat dihindari</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="bg-[#2D6A4F] hover:bg-[#40916C] w-full"
                    size="lg"
                  >
                    Selanjutnya → Solusi Kimia Hijau
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

interface SimulationVisualProps {
  type: string;
}

const SimulationVisual: React.FC<SimulationVisualProps> = ({ type }) => {
  switch (type) {
    case 'production':
      return (
        <div className="w-full h-full flex items-center justify-center">
           <div className="w-full max-w-4xl aspect-video">
        <video
          src={video1}
          autoPlay
          loop
          muted
          controls
          className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      );
    
    case 'waste':
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-video">
        <video
          src={video2}
          autoPlay
          loop
          muted
          controls
          className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      );
    
    case 'microplastic':
      return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl aspect-video">
        <video
          src={video3}
          autoPlay
          loop
          muted
          controls
          className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      );
    
    case 'foodchain':
      return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl aspect-video">
        <video
          src={video4}
          autoPlay
          loop
          muted
          controls
          className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      );
    
    case 'human':
      return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl aspect-video">
        <video
          src={video5}
          autoPlay
          loop
          muted
          controls
          className="w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      );
    
    default:
      return <div>Loading...</div>;
  }
};