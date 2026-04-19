import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Award, Star, Trophy, Target, BookOpen, LogOut, 
  CheckCircle2, Lock, Leaf, X
} from 'lucide-react';
import { Footer } from '../components/Footer';

const RANK_NAMES = [
  'Observer',        // Level 1
  'Connector',       // Level 2
  'Analyst',         // Level 3
  'Modeler',         // Level 4
  'System Thinker'   // Level 5
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useUser();
  const { t } = useLanguage();
  const [showGuide, setShowGuide] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const badges = [
    { id: 'beginner', name: 'Beginner', icon: <Star className="w-6 h-6" />, unlocked: (user?.completedActivities?.length ?? 0) >= 1 },
    { id: 'explorer', name: 'Explorer', icon: <Target className="w-6 h-6" />, unlocked: (user?.completedActivities?.length ?? 0) >= 3 },
    { id: 'master', name: 'Master', icon: <Trophy className="w-6 h-6" />, unlocked: (user?.completedActivities?.length ?? 0) >= 5 },
    { id: 'champion', name: 'Champion', icon: <Award className="w-6 h-6" />, unlocked: (user?.completedActivities?.length ?? 0) >= 8 }
  ];

  useEffect(() => {
    console.log('Dashboard useEffect: user=', user?.uid, 'loading=', loading);
    if (!loading && !user) {
      console.log('Dashboard: No user found and not loading, redirecting to login');
      setShouldRedirect(true);
    } else if (user) {
      console.log('Dashboard: User found, staying on dashboard', user.uid);
      setShouldRedirect(false);
    }
  }, [user, loading]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate('/');
    }
  }, [shouldRedirect, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center"
        >
          <Leaf className="w-16 h-16 text-[#2D6A4F] mx-auto mb-4" />
          <p className="text-lg font-semibold text-[#2D6A4F]">Memuat dashboard...</p>
        </motion.div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeGuide = () => {
    localStorage.setItem('synergyHasSeenGuide', 'true');
    setShowGuide(false);
  };

  const startJourney = () => {
    closeGuide();
    navigate('/problem-trigger');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-[#2D6A4F] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8" />
              <h1 className="text-2xl font-bold">SYNERGY</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-xs sm:text-base">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F4A261]" />
                <span className="font-semibold">{user?.points ?? 0} {t('dashboard.points')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#F4A261]" />
                <span className="font-semibold">{t('dashboard.level')} {user?.level ?? 1}: {RANK_NAMES[(user?.level ?? 1) - 1]}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-white hover:bg-[#40916C]"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-3xl mb-2">{t('dashboard.welcome')} {user?.name || 'Pengguna'}! 👋</h2>
            <p className="text-gray-600">{t('dashboard.subtitle')}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-gradient-to-br from-[#2D6A4F] to-[#40916C] text-white">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-10 h-10" />
                  <span className="text-3xl font-bold">{user?.progress ?? 0}%</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('dashboard.progress')}</h3>
                <Progress value={user?.progress ?? 0} className="bg-white/20" />
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-gradient-to-br from-[#2A9D8F] to-[#40916C] text-white">
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-10 h-10" />
                  <span className="text-3xl font-bold">{user?.level ?? 1}/5</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('dashboard.systemLevel')}</h3>
                <p className="text-sm opacity-90">{RANK_NAMES[(user?.level ?? 1) - 1]}</p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-6 bg-gradient-to-br from-[#F4A261] to-[#e76f51] text-white">
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="w-10 h-10" />
                  <span className="text-3xl font-bold">{user?.badges?.length ?? 0}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{t('dashboard.badges')}</h3>
                <p className="text-sm opacity-90">{t('dashboard.badgesDesc')}</p>
              </Card>
            </motion.div>
          </div>

          {/* Learning Path */}
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-[#2D6A4F]" />
              <h3 className="text-2xl font-bold">{t('dashboard.learningPath')}</h3>
            </div>

            <div className="space-y-4">
              <LearningModule 
                title={t('dashboard.module1.title')}
                description={t('dashboard.module1.desc')}
                completed={(user?.completedActivities ?? []).includes('problem-trigger')}
                onClick={() => navigate('/problem-trigger')}
              />
              <LearningModule 
                title={t('dashboard.module2.title')}
                description={t('dashboard.module2.desc')}
                completed={(user?.completedActivities ?? []).includes('system-viz')}
                onClick={() => navigate('/system-visualization')}
              />
              <LearningModule 
                title={t('dashboard.module3.title')}
                description="Pilih dan kenali komponen dalam sistem plastik"
                completed={(user?.completedActivities ?? []).includes('drag-drop')}
                onClick={() => navigate('/drag-drop-activity')}
              />
              <LearningModule 
                title={t('dashboard.module4.title')}
                description={t('dashboard.module4.desc')}
                completed={(user?.completedActivities ?? []).includes('connections')}
                onClick={() => navigate('/connection-activity')}
              />
              <LearningModule 
                title={t('dashboard.module5.title')}
                description={t('dashboard.module5.desc')}
                completed={(user?.completedActivities ?? []).includes('dynamic')}
                onClick={() => navigate('/dynamic-analysis')}
              />
              <LearningModule 
                title={t('dashboard.module6.title')}
                description={t('dashboard.module6.desc')}
                completed={(user?.completedActivities ?? []).includes('simulation')}
                onClick={() => navigate('/system-simulation')}
              />
              <LearningModule 
                title={t('dashboard.module7.title')}
                description={t('dashboard.module7.desc')}
                completed={(user?.completedActivities ?? []).includes('green-chem')}
                onClick={() => navigate('/green-chemistry-lab')}
              />
              <LearningModule 
                title={t('dashboard.module8.title')}
                description={t('dashboard.module8.desc')}
                completed={(user?.completedActivities ?? []).includes('reflection')}
                onClick={() => navigate('/reflection')}
              />
            </div>

            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="bg-[#2D6A4F] hover:bg-[#40916C] px-8"
                onClick={() => {
                  const nextModule = [
                    'problem-trigger',
                    'system-visualization',
                    'drag-drop-activity',
                    'connection-activity',
                    'dynamic-analysis',
                    'system-simulation',
                    'green-chemistry-lab',
                    'reflection'
                  ].find(module => !(user?.completedActivities ?? []).includes(module));
                  
                  navigate(`/${nextModule || 'problem-trigger'}`);
                }}
              >
                Mulai Belajar 🚀
              </Button>
            </div>
          </Card>

          {/* Badges Section */}
          {(user?.badges?.length ?? 0) > 0 && (
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">{t('dashboard.achievements')} 🏆</h3>
              <div className="flex flex-wrap gap-4">
                {(user?.badges ?? []).map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white rounded-full font-semibold"
                  >
                    {badge}
                  </motion.div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Guide Overlay */}
      <AnimatePresence>
        {showGuide && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-[#2D6A4F]">{t('guide.welcome')}</h2>
                    <p className="text-gray-600 mt-1">{t('guide.subtitle')}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={closeGuide}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Guide Steps */}
                <div className="space-y-6 mb-8">
                  <GuideStep
                    title={t('guide.step1.title')}
                    description={t('guide.step1.desc')}
                    delay={0.1}
                  />
                  <GuideStep
                    title={t('guide.step2.title')}
                    description={t('guide.step2.desc')}
                    delay={0.2}
                  />
                  <GuideStep
                    title={t('guide.step3.title')}
                    description={t('guide.step3.desc')}
                    delay={0.3}
                  />
                  <GuideStep
                    title={t('guide.step4.title')}
                    description={t('guide.step4.desc')}
                    delay={0.4}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                  <Button 
                    variant="ghost" 
                    onClick={closeGuide}
                    className="text-gray-600"
                  >
                    {t('guide.skip')}
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-[#2D6A4F] hover:bg-[#40916C] text-white px-8"
                    onClick={startJourney}
                  >
                    {t('guide.start')} 🚀
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
};

interface LearningModuleProps {
  title: string;
  description: string;
  completed: boolean;
  onClick: () => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ title, description, completed, onClick }) => {
  return (
    <motion.div
      whileHover={{ x: 8 }}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        completed 
          ? 'bg-green-50 border-green-300' 
          : 'bg-white border-gray-200 hover:border-[#2D6A4F]'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-1">{title}</h4>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        {completed && (
          <div className="ml-4 text-green-600 text-2xl">✓</div>
        )}
      </div>
    </motion.div>
  );
};

interface GuideStepProps {
  title: string;
  description: string;
  delay: number;
}

const GuideStep: React.FC<GuideStepProps> = ({ title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};