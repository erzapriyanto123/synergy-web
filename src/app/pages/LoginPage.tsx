import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Info, X } from 'lucide-react';
import earthImage from "../../assets/earthImage.png";
import umLogo from "../../assets/umLogo.png";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, login, user, loading } = useUser();
  const { t } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showLearningObjectives, setShowLearningObjectives] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    email: '',
    password: ''
  });

  // Show learning objectives when user is successfully logged in
  useEffect(() => {
    console.log('LoginPage useEffect: user=', user?.uid, 'isLoggingIn=', isLoggingIn);
    if (user && isLoggingIn) {
      console.log('User logged in successfully, showing learning objectives');
      setShowLearningObjectives(true);
      setIsLoggingIn(false);
      setIsSubmitting(false);
    }
  }, [user, isLoggingIn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    setError(null);
    setIsSubmitting(true);
    try {
      if (isRegister) {
        console.log('Attempting registration');
        await register(formData.name, formData.class, formData.email, formData.password);
      } else {
        console.log('Attempting login with email:', formData.email);
        await login(formData.email, formData.password);
        console.log('Login function completed successfully');
      }
      // Set flag to trigger navigation when user state updates
      console.log('Setting isLoggingIn to true');
      setIsLoggingIn(true);
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      setError(error.message || 'An error occurred');
      setIsLoggingIn(false);
      setIsSubmitting(false);
    }
  };

  const handleCloseLearningObjectives = () => {
    setShowLearningObjectives(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2D6A4F] via-[#40916C] to-[#2A9D8F]">
      {/* Guide Modal */}
      <AnimatePresence>
        {showGuide && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuide(false)}
            >
              <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white p-6 rounded-t-xl flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Panduan Penggunaan Website</h2>
                    <p className="text-sm opacity-90 mt-1">Platform SYNERGY - Systems Thinking Education</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowGuide(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="p-8 space-y-6">
                  {/* Step 1 */}
                  <div className="border-l-4 border-[#2D6A4F] pl-4">
                    <h3 className="text-xl font-bold text-[#2D6A4F] mb-2">1. Registrasi Akun</h3>
                    <p className="text-gray-700">
                      Siswa membuat akun dengan mengisi nama, kelas, email, dan password.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="border-l-4 border-[#40916C] pl-4">
                    <h3 className="text-xl font-bold text-[#40916C] mb-2">2. Login</h3>
                    <p className="text-gray-700">
                      Siswa masuk ke website menggunakan email dan password yang telah didaftarkan.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="border-l-4 border-[#2A9D8F] pl-4">
                    <h3 className="text-xl font-bold text-[#2A9D8F] mb-2">3. Dashboard</h3>
                    <p className="text-gray-700">
                      Setelah login, siswa melihat dashboard yang menampilkan progres belajar, level berpikir sistem, dan tombol "Lanjutkan Belajar".
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="border-l-4 border-[#F4A261] pl-4">
                    <h3 className="text-xl font-bold text-[#F4A261] mb-2">4. Mengikuti Alur Pembelajaran</h3>
                    <p className="text-gray-700 mb-3">
                      Siswa mengikuti tahapan pembelajaran yang meliputi:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2D6A4F] font-bold">•</span>
                        <span className="text-gray-700">
                          <strong>Pemantik Masalah:</strong> Mengamati fenomena pertumbuhan produksi plastik.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2D6A4F] font-bold">•</span>
                        <span className="text-gray-700">
                          <strong>Visualisasi Sistem:</strong> Mempelajari hubungan antar komponen sistem plastik.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2D6A4F] font-bold">•</span>
                        <span className="text-gray-700">
                          <strong>Aktivitas Sistem:</strong> Mengidentifikasi dan menghubungkan komponen sistem serta memberi label hubungan (+) atau (−).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2D6A4F] font-bold">•</span>
                        <span className="text-gray-700">
                          <strong>Analisis Dinamis:</strong> Menganalisis perubahan komponen sistem berdasarkan skenario.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2D6A4F] font-bold">•</span>
                        <span className="text-gray-700">
                          <strong>Simulasi Sistem:</strong> Memahami dampak plastik seperti mikroplastik dalam rantai makanan.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2D6A4F] font-bold">•</span>
                        <span className="text-gray-700">
                          <strong>Solusi Green Chemistry:</strong> Mempelajari prinsip Green Chemistry untuk memperbaiki sistem plastik.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Step 5 */}
                  <div className="border-l-4 border-[#2D6A4F] pl-4">
                    <h3 className="text-xl font-bold text-[#2D6A4F] mb-2">5. Refleksi dan Hasil</h3>
                    <p className="text-gray-700">
                      Siswa menjawab pertanyaan refleksi dan melihat poin, badge, serta level berpikir sistem yang diperoleh setelah menyelesaikan pembelajaran.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#40916C]/10 border border-[#40916C] rounded-lg p-4 mt-6">
                    <p className="text-sm text-gray-700 text-center">
                      <strong className="text-[#2D6A4F]">💡 Tips:</strong> Ikuti setiap tahapan secara berurutan untuk pengalaman belajar yang optimal!
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setShowGuide(false)}
                      className="bg-[#2D6A4F] hover:bg-[#40916C]"
                    >
                      Mengerti, Tutup Panduan
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Learning Objectives Modal */}
      <AnimatePresence>
        {showLearningObjectives && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => handleCloseLearningObjectives()}
            >
              <motion.div
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white p-6 rounded-t-xl flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Tujuan Pembelajaran</h2>
                    <p className="text-sm opacity-90 mt-1">Platform SYNERGY - Systems Thinking Education</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleCloseLearningObjectives()}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="p-8 space-y-6">
                  {/* Introduction */}
                  <div className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#40916C]/10 border-2 border-[#2D6A4F]/30 rounded-lg p-6 mb-6">
                    <h3 className="text-2xl font-bold text-[#2D6A4F] mb-3">Selamat Datang di SYNERGY! 🎓</h3>
                    <p className="text-gray-700 mb-2">
                      Setelah menyelesaikan pembelajaran ini, siswa mampu:
                    </p>
                  </div>

                  {/* Objective 1 */}
                  <div className="border-l-4 border-[#2D6A4F] pl-4 bg-[#2D6A4F]/5 py-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#2D6A4F] text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#2D6A4F] mb-2">Mengidentifikasi komponen sistem plastik</h3>
                        <p className="text-gray-700 text-sm">
                          Mengenali berbagai elemen yang membentuk sistem plastik seperti produksi, konsumsi, limbah, teknologi, dan lingkungan.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Objective 2 */}
                  <div className="border-l-4 border-[#40916C] pl-4 bg-[#40916C]/5 py-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#40916C] text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#40916C] mb-2">Menjelaskan hubungan antar komponen</h3>
                        <p className="text-gray-700 text-sm">
                          Memahami dan menjelaskan bagaimana komponen-komponen dalam sistem plastik saling terkait dan mempengaruhi satu sama lain.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Objective 3 */}
                  <div className="border-l-4 border-[#2A9D8F] pl-4 bg-[#2A9D8F]/5 py-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#2A9D8F] text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#2A9D8F] mb-2">Menganalisis dinamika sistem</h3>
                        <p className="text-gray-700 text-sm">
                          Menganalisis perubahan dan pola perilaku sistem plastik dari waktu ke waktu berdasarkan berbagai skenario dan kondisi.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Objective 4 */}
                  <div className="border-l-4 border-[#F4A261] pl-4 bg-[#F4A261]/5 py-4 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#F4A261] text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#F4A261] mb-2">Merancang solusi green chemistry</h3>
                        <p className="text-gray-700 text-sm">
                          Mengaplikasikan prinsip-prinsip kimia hijau untuk merancang solusi berkelanjutan terhadap masalah sistem plastik.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gradient-to-r from-[#40916C]/10 to-[#2A9D8F]/10 border border-[#40916C] rounded-lg p-6 mt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">🌱</span>
                      <h4 className="text-lg font-bold text-[#2D6A4F]">Pendekatan Systems Thinking</h4>
                    </div>
                    <p className="text-sm text-gray-700">
                      Pembelajaran ini menggunakan pendekatan <strong>systems thinking</strong> untuk membantu Anda memahami 
                      masalah plastik secara holistik dan menemukan solusi yang efektif melalui kimia hijau dan sustainability.
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => handleCloseLearningObjectives()}
                      className="bg-[#2D6A4F] hover:bg-[#40916C] px-8"
                      size="lg"
                    >
                      Siap Mulai Belajar! 🚀
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - Form */}
        <motion.div 
          className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-[#2D6A4F]" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D6A4F]">{t('login.title')}</h1>
              </div>
              {/* Logo UM di kanan atas sejajar dengan SYNERGY - ukuran diperbesar agar tulisan "Excellence in Learning Innovation" terbaca */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <img 
                  src={umLogo} 
                  alt="Universitas Negeri Malang" 
                  className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
                />
              </motion.div>
            </div>
            <p className="text-sm sm:text-base text-gray-600">{t('login.subtitle')}</p>
          </div>

          <div className="bg-[#40916C]/10 border-l-4 border-[#40916C] p-3 sm:p-4 mb-4 sm:mb-6 rounded">
            <p className="text-xs sm:text-sm text-gray-700">
              {t('login.welcome')}
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="name">{t('login.name')}</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>

            {isRegister && (
              <div>
                <Label htmlFor="class">{t('login.class')}</Label>
                <Input
                  id="class"
                  type="text"
                  required
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:flex-1 bg-[#2D6A4F] hover:bg-[#40916C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Memproses...' : t('login.button')}
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => setIsRegister(!isRegister)}
                className="w-full sm:flex-1"
              >
                {isRegister ? t('login.backToLogin') : t('login.register')}
              </Button>
            </div>

            <Button 
              type="button"
              variant="ghost"
              className="w-full mt-2 text-sm sm:text-base"
              onClick={() => setShowGuide(true)}
            >
              <Info className="w-4 h-4 mr-2" />
              {t('login.guide')}
            </Button>
          </form>
        </motion.div>

        {/* Right side - Earth Visual */}
        <motion.div 
          className="w-full lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 relative overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Stars background */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Earth illustration */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96">
              {/* Earth image with rotation animation */}
              <img 
                src={earthImage} 
                alt="Earth" 
                className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                style={{
                  clipPath: 'circle(50% at 50% 50%)',
                  WebkitClipPath: 'circle(50% at 50% 50%)'
                }}
              />
              
              {/* Atmosphere glow */}
              <div className="absolute -inset-4 rounded-full bg-blue-400 opacity-20 blur-2xl" />
            </div>
          </motion.div>

          {/* Message overlay */}
          <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 text-center text-white px-4 sm:px-8">
            <motion.p
              className="text-sm sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {t('login.planetMessage')}
            </motion.p>
            <motion.p
              className="text-xs sm:text-sm opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {t('login.journeyMessage')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};