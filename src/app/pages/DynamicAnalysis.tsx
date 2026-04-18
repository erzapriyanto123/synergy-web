import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowRight, TrendingUp, Check, X } from 'lucide-react';
import { Footer } from '../components/Footer';

const DATA = [
  { year: '2021', production: 380 },
  { year: '2022', production: 400 },
  { year: '2023', production: 425 },
  { year: '2024', production: 455 },
  { year: '2025', production: 490 },
  { year: '2026', production: 530 }
];

interface Prediction {
  component: string;
  correct: 'increase' | 'decrease' | 'stable';
  userAnswer: 'increase' | 'decrease' | 'stable' | null;
}

const PREDICTIONS: Prediction[] = [
  { component: 'Limbah', correct: 'increase', userAnswer: null },
  { component: 'Ekonomi', correct: 'increase', userAnswer: null },
  { component: 'Dampak Sosial', correct: 'increase', userAnswer: null },
  { component: 'Kualitas Lingkungan', correct: 'decrease', userAnswer: null },
  { component: 'Stabilitas Iklim', correct: 'decrease', userAnswer: null }
];

export const DynamicAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity, addPoints } = useUser();
  const [predictions, setPredictions] = useState<Prediction[]>(PREDICTIONS);
  const [reasoning, setReasoning] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handlePrediction = (component: string, answer: 'increase' | 'decrease' | 'stable') => {
    setPredictions(prev =>
      prev.map(p => p.component === component ? { ...p, userAnswer: answer } : p)
    );
  };

  const handleSubmit = () => {
    let correctCount = 0;
    predictions.forEach(p => {
      if (p.userAnswer === p.correct) {
        correctCount++;
      }
    });
    
    const earnedPoints = correctCount * 5;
    setScore(earnedPoints);
    addPoints(earnedPoints);
    setSubmitted(true);
  };

  const handleContinue = () => {
    completeActivity('dynamic');
    updateProgress(50);
    navigate('/system-simulation');
  };

  const allAnswered = predictions.every(p => p.userAnswer !== null);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#2D6A4F] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">SYNERGY - Analisis Dinamis</h1>
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
            <h2 className="text-4xl font-bold mb-4">Analisis Sistem Dinamis</h2>
            <p className="text-xl text-gray-600">
              Sistem berubah seiring waktu. Prediksi bagaimana komponen akan merespons peningkatan produksi.
            </p>
          </div>

          {/* Scenario */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-10 h-10" />
              <h3 className="text-2xl font-bold">Skenario</h3>
            </div>
            <p className="text-xl mb-2">
              Produksi plastik terus meningkat selama 5 tahun ke depan dengan tingkat pertumbuhan saat ini.
            </p>
            <p className="text-lg opacity-90">
              Analisis grafik di bawah dan prediksi dampaknya terhadap komponen sistem lainnya.
            </p>
          </div>

          {/* Graph */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Proyeksi Produksi Plastik (Juta Ton)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={DATA}>
                <CartesianGrid key="grid" strokeDasharray="3 3" />
                <XAxis key="xaxis" dataKey="year" />
                <YAxis key="yaxis" />
                <Tooltip key="tooltip" />
                <Legend key="legend" />
                <Line 
                  key="production-line"
                  type="monotone" 
                  dataKey="production" 
                  stroke="#e76f51" 
                  strokeWidth={3}
                  name="Produksi (Juta Ton)"
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-4 text-gray-600">
              <p className="font-semibold">Peningkatan 32% dari 2021 ke 2026</p>
            </div>
          </div>

          {/* Predictions */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold mb-6">Buat Prediksi Anda</h3>
            <p className="text-gray-600 mb-6">
              Untuk setiap komponen, prediksi apakah akan meningkat, menurun, atau tetap stabil:
            </p>

            <div className="space-y-6">
              {predictions.map((prediction, idx) => (
                <motion.div
                  key={prediction.component}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-2 border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold">{prediction.component}</h4>
                    {submitted && (
                      <div className="flex items-center gap-2">
                        {prediction.userAnswer === prediction.correct ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <Check className="w-5 h-5" />
                            <span className="font-semibold">Benar! +5 poin</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <X className="w-5 h-5" />
                            <span className="font-semibold">Jawaban Benar: {prediction.correct}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePrediction(prediction.component, 'increase')}
                      disabled={submitted}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        prediction.userAnswer === 'increase'
                          ? 'bg-green-500 text-white border-green-600'
                          : 'bg-white border-gray-300 hover:border-green-500'
                      } ${submitted ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                      <div className="font-semibold">Meningkat</div>
                    </button>
                    <button
                      onClick={() => handlePrediction(prediction.component, 'stable')}
                      disabled={submitted}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        prediction.userAnswer === 'stable'
                          ? 'bg-yellow-500 text-white border-yellow-600'
                          : 'bg-white border-gray-300 hover:border-yellow-500'
                      } ${submitted ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="text-2xl mb-1">━</div>
                      <div className="font-semibold">Stabil</div>
                    </button>
                    <button
                      onClick={() => handlePrediction(prediction.component, 'decrease')}
                      disabled={submitted}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        prediction.userAnswer === 'decrease'
                          ? 'bg-red-500 text-white border-red-600'
                          : 'bg-white border-gray-300 hover:border-red-500'
                      } ${submitted ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 rotate-180" />
                      <div className="font-semibold">Menurun</div>
                    </button>
                  </div>

                  {/* Reasoning */}
                  {!submitted && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold mb-2">
                        Jelaskan alasan Anda (opsional):
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                        placeholder="Mengapa Anda berpikir komponen ini akan berubah seperti itu?"
                        value={reasoning[prediction.component] || ''}
                        onChange={(e) => setReasoning({ ...reasoning, [prediction.component]: e.target.value })}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {!submitted && allAnswered && (
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-[#2D6A4F] hover:bg-[#40916C] px-12"
                  onClick={handleSubmit}
                >
                  Kirim Prediksi
                </Button>
              </div>
            )}

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-lg mb-3">Insight Berpikir Sistem:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Limbah meningkat</strong> karena produksi dan konsumsi yang lebih banyak menciptakan lebih banyak limbah</li>
                    <li>• <strong>Ekonomi berkembang</strong> karena aktivitas industri yang meningkat dan pekerjaan baru</li>
                    <li>• <strong>Dampak sosial meningkat</strong> melalui masalah kesehatan dan keadilan lingkungan</li>
                    <li>• <strong>Kualitas lingkungan menurun</strong> dari polusi dan kerusakan ekosistem</li>
                    <li>• <strong>Stabilitas iklim menurun</strong> karena emisi yang lebih tinggi dari produksi</li>
                  </ul>
                  <p className="mt-4 font-semibold text-blue-800">
                    Perhatikan bagaimana satu perubahan (peningkatan produksi) menciptakan efek ganda di seluruh sistem!
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-[#2D6A4F]">
                    Skor: {score} / 25 poin
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-[#2D6A4F] hover:bg-[#40916C]"
                    onClick={handleContinue}
                  >
                    Selanjutnya → Simulasi Sistem: Perjalanan Plastik
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};