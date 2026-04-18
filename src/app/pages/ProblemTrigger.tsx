import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Footer } from '../components/Footer';

export const ProblemTrigger: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity } = useUser();
  const { t } = useLanguage();
  const [count1950, setCount1950] = useState(0);
  const [count2022, setCount2022] = useState(0);

  useEffect(() => {
    // Animate counters
    const timer1 = setInterval(() => {
      setCount1950(prev => {
        if (prev < 2) return prev + 0.1;
        return 2;
      });
    }, 50);

    const timer2 = setInterval(() => {
      setCount2022(prev => {
        if (prev < 400) return prev + 8;
        return 400;
      });
    }, 50);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  const handleStart = () => {
    completeActivity('problem-trigger');
    updateProgress(10);
    navigate('/system-visualization');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#2D6A4F] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
          <Button variant="ghost" className="text-white" onClick={() => navigate('/dashboard')}>
            {t('nav.back')}
          </Button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-3 bg-red-100 text-red-700 px-6 py-3 rounded-full mb-6"
            >
              <AlertTriangle className="w-6 h-6" />
              <span className="font-semibold">{t('problem.welcome')}</span>
            </motion.div>
            <h1 className="text-5xl font-bold mb-4">
              Plastik: <span className="text-[#2D6A4F]">{t('problem.title.solution')}</span> atau <span className="text-red-600">{t('problem.title.problem')}</span>
            </h1>
            <p className="text-xl text-gray-600">
              {t('problem.intro')}
            </p>
          </div>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1200&h=600&fit=crop" 
              alt="Plastic waste accumulation"
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white"
            >
              <div className="text-6xl font-bold mb-4">{t('problem.stat1950.year')}</div>
              <div className="text-7xl font-bold mb-4 text-yellow-300">
                {count1950.toFixed(1)} M
              </div>
              <div className="text-2xl">{t('problem.stat1950.tons')}</div>
              <div className="mt-6 text-lg opacity-90">
                {t('problem.stat1950.desc')}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="text-6xl font-bold mb-4">{t('problem.stat2022.year')}</div>
              <div className="text-7xl font-bold mb-4 text-yellow-300">
                {Math.round(count2022)} M
              </div>
              <div className="text-2xl">{t('problem.stat2022.tons')}</div>
              <div className="mt-6 text-lg opacity-90">
                {t('problem.stat2022.desc')}
              </div>
              
              {/* Animated warning pulse */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-16 h-16 opacity-50" />
              </motion.div>
            </motion.div>
          </div>

          {/* Key Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white rounded-2xl p-8 shadow-lg mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#2D6A4F]">{t('problem.systemChallenge')}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <FactCard 
                number={t('problem.systemChallenge.stat1')}
                label={t('problem.systemChallenge.stat1Desc')}
                color="from-[#2D6A4F] to-[#40916C]"
              />
              <FactCard 
                number={t('problem.systemChallenge.stat2')}
                label={t('problem.systemChallenge.stat2Desc')}
                color="from-[#2A9D8F] to-[#40916C]"
              />
              <FactCard 
                number={t('problem.systemChallenge.stat3')}
                label={t('problem.systemChallenge.stat3Desc')}
                color="from-[#F4A261] to-[#e76f51]"
              />
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center bg-gradient-to-r from-[#2D6A4F] to-[#40916C] rounded-2xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-6">
              {t('problem.question')}
            </h3>
            
            <p className="text-xl mb-4 leading-relaxed">
              {t('problem.answer')}
            </p>
            
            <p className="text-xl mb-8 leading-relaxed">
              {t('problem.systemThinking')}
            </p>

            <p className="text-lg font-semibold mb-4">
              {t('problem.systemThinking.title')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm">✓ {t('problem.mindset.connections')}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm">✓ {t('problem.mindset.feedback')}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm">✓ {t('problem.mindset.delays')}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm">✓ {t('problem.mindset.leverage')}</p>
              </div>
            </div>
            
            <p className="text-lg mb-8">
              {t('problem.ready')}
            </p>
            
            <Button 
              size="lg" 
              className="bg-white text-[#2D6A4F] hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={handleStart}
            >
              {t('problem.continue')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

interface FactCardProps {
  number: string;
  label: string;
  color: string;
}

const FactCard: React.FC<FactCardProps> = ({ number, label, color }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white`}>
      <div className="text-3xl font-bold mb-3">{number}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
};