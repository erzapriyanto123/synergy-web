import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';
import { 
  Trophy, Award, Star, Target, Sparkles, Medal, Crown, 
  CheckCircle2, BookOpen, Leaf, Home
} from 'lucide-react';
import { Footer } from '../components/Footer';

const RANK_NAMES = [
  { level: 1, name: 'Observer', description: 'Anda dapat mengidentifikasi komponen sistem', minPoints: 0 },
  { level: 2, name: 'Connector', description: 'Anda memahami hubungan antar komponen', minPoints: 10 },
  { level: 3, name: 'Analyst', description: 'Anda dapat memprediksi perilaku sistem', minPoints: 25 },
  { level: 4, name: 'Modeler', description: 'Anda dapat mensimulasikan dinamika sistem', minPoints: 40 },
  { level: 5, name: 'System Thinker', description: 'Anda dapat merancang solusi sistemik', minPoints: 60 }
];

const ACHIEVEMENTS = [
  "Memahami dinamika sistem kompleks",
  "Memetakan keterkaitan sistem",
  "Memprediksi perilaku sistem dari waktu ke waktu",
  "Menganalisis loop umpan balik dan dampak",
  "Mengeksplorasi solusi Kimia Hijau",
  "Menerapkan pemikiran sistem pada masalah nyata"
];

export const FinalReward: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return null;
  }

  const currentRank = RANK_NAMES.reduce((prev, curr) => 
    (user?.points ?? 0) >= curr.minPoints ? curr : prev
  );

  const nextRank = RANK_NAMES.find(r => r.level === currentRank.level + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D6A4F] via-[#40916C] to-[#2A9D8F] relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                background: ['#F4A261', '#2A9D8F', '#40916C', '#e76f51'][Math.floor(Math.random() * 4)]
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 20,
                opacity: 0,
                rotate: 360
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "easeIn"
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          {/* Mission Complete Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-block mb-6"
            >
              <Trophy className="w-32 h-32 text-[#F4A261] mx-auto drop-shadow-2xl" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-6xl font-bold text-white mb-4 drop-shadow-lg"
            >
              Mission Complete!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl text-white/90"
            >
              Congratulations, {user?.name || 'Pengguna'}! You've mastered systems thinking for sustainability.
            </motion.p>
          </div>

          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-12 mb-8"
          >
            {/* Current Rank */}
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-br from-[#2D6A4F] to-[#40916C] rounded-2xl px-12 py-8 mb-6">
                <h2 className="text-white text-xl mb-2">Peringkat Akhir Anda</h2>
                <div className="text-6xl font-bold text-[#F4A261] mb-2">
                  Level {currentRank.level}
                </div>
                <div className="text-3xl font-bold text-white mb-3">
                  {currentRank.name}
                </div>
                <p className="text-white/90 text-lg">
                  {currentRank.description}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <StatCard
                icon={<Star className="w-10 h-10" />}
                label="Poin Sistem"
                value={(user?.points ?? 0).toString()}
                color="from-yellow-400 to-orange-500"
              />
              <StatCard
                icon={<Award className="w-10 h-10" />}
                label="Badge Diperoleh"
                value={(user?.badges?.length ?? 0).toString()}
                color="from-green-400 to-teal-500"
              />
              <StatCard
                icon={<Trophy className="w-10 h-10" />}
                label="Progres"
                value={`${user?.progress ?? 0}%`}
                color="from-blue-400 to-purple-500"
              />
            </div>

            {/* Badges */}
            {(user?.badges?.length ?? 0) > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center">Pencapaian Anda 🏆</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {(user?.badges ?? []).map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1 + index * 0.1, type: "spring" }}
                      className="px-6 py-3 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white rounded-full font-semibold text-lg shadow-lg"
                    >
                      {badge}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Bar to Next Level */}
            {nextRank && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4 text-center">Progres ke Level Berikutnya</h3>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">{currentRank.name}</span>
                    <span className="font-semibold">{nextRank.name}</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#2D6A4F] to-[#40916C]"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (((user?.points ?? 0) - currentRank.minPoints) / ((nextRank?.minPoints ?? 0) - currentRank.minPoints)) * 100)}%`
                      }}
                      transition={{ delay: 1.2, duration: 1 }}
                    />
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {Math.max(0, (nextRank?.minPoints ?? 0) - (user?.points ?? 0))} poin lagi untuk mencapai {nextRank.name}
                  </p>
                </div>
              </div>
            )}

            {/* Final Message */}
            <div className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#40916C]/10 border-l-4 border-[#2D6A4F] rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Apa yang Telah Anda Capai:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement, index) => (
                  <AchievementItem key={index} text={achievement} />
                ))}
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-3 text-green-800">🌍 Dampak Anda</h3>
              <p className="text-gray-700 leading-relaxed">
                Sebagai seorang pemikir sistem, Anda kini memiliki alat untuk mengatasi tantangan keberlanjutan yang kompleks. 
                Anda memahami bahwa solusi nyata memerlukan perubahan sistem, bukan hanya mengobati gejala. 
                Baik itu polusi plastik, perubahan iklim, atau masalah global lainnya, Anda dapat melihat 
                keterkaitannya, memprediksi konsekuensinya, dan merancang intervensi yang menciptakan perubahan berkelanjutan.
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Siap Menerapkan Pengetahuan Anda?</h3>
              <p className="text-gray-600 mb-6">
                Lanjutkan mengeksplorasi, bagikan apa yang telah Anda pelajari, dan mulailah berpikir secara sistemik tentang 
                dunia di sekitar Anda.
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="bg-[#2D6A4F] hover:bg-[#40916C]"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Kembali ke Dasbor
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-center text-white"
          >
            <p className="text-lg mb-2">
              Thank you for being part of SYNERGY
            </p>
            <p className="text-sm opacity-75">
              Systems Thinking for Next-gen Education in Green Chemistry & Sustainability
            </p>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white text-center shadow-lg`}
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </motion.div>
  );
};

interface AchievementItemProps {
  text: string;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">
        <div className="w-6 h-6 rounded-full bg-[#2D6A4F] flex items-center justify-center">
          <span className="text-white text-sm">✓</span>
        </div>
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
};