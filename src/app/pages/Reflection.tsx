import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Footer } from "../components/Footer";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: string[];
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: "complex",
    question:
      "Mengapa masalah plastik dianggap sebagai sistem KOMPLEKS?",
    options: [
      "A. Memiliki banyak komponen yang saling terhubung",
      "B. Melibatkan berbagai pemangku kepentingan (produsen, konsumen, pemerintah)",
      "C. Perubahan di satu area mempengaruhi banyak area lain",
      "D. Semua jawaban benar",
    ],
    correct: ["Semua jawaban benar"],
    explanation:
      "Sistem kompleks memiliki banyak bagian yang saling terhubung di mana perubahan beriak ke seluruh sistem. Sistem plastik melibatkan produksi, konsumsi, limbah, lingkungan, ekonomi, teknologi, kebijakan, dan lainnya - semua saling mempengaruhi.",
  },
  {
    id: "interconnected",
    question:
      "Bagaimana sistem plastik menunjukkan KETERKAITAN?",
    options: [
      "A.Produksi terhubung dengan konsumsi dan iklim",
      "B. Limbah terhubung dengan lingkungan dan kesehatan manusia",
      "C. Teknologi terhubung dengan produksi dan pengurangan limbah",
      "DSemua komponen mempengaruhi banyak komponen lainnya",
    ],
    correct: [
      "Semua komponen mempengaruhi banyak komponen lainnya",
    ],
    explanation:
      "Setiap komponen yang kita pelajari (produksi, limbah, teknologi, kebijakan, dll.) terhubung dan mempengaruhi berbagai komponen lainnya. Jaring hubungan inilah inti dari keterkaitan sistem.",
  },
  {
    id: "dynamic",
    question: "Apa yang membuat sistem plastik DINAMIS?",
    options: [
      "A.Berubah seiring waktu",
      "B. Loop umpan balik menciptakan siklus sebab-akibat yang berkelanjutan",
      "C. Perubahan kecil dapat berkembang menjadi dampak besar",
      "D. Semua jawaban benar",
    ],
    correct: ["Semua jawaban benar"],
    explanation:
      "Sistem dinamis terus berubah. Kita melihat bagaimana produksi plastik meningkat 200x selama beberapa dekade, bagaimana loop umpan balik memperkuat efek, dan bagaimana intervensi kecil (seperti kimia hijau) dapat mengubah seluruh sistem.",
  },
  {
    id: "impacts",
    question:
      "Mana yang menunjukkan DAMPAK JANGKA PANJANG dalam sistem plastik?",
    options: [
      "A.Plastik bertahan 450+ tahun di lingkungan",
      "B. Mikroplastik terakumulasi dalam rantai makanan selama puluhan tahun",
      "C. Efek kesehatan mungkin tidak muncul bertahun-tahun setelah paparan",
      "D. Semua jawaban benar",
    ],
    correct: ["Semua jawaban benar"],
    explanation:
      "Pemikiran sistem memerlukan pertimbangan horizon waktu di luar efek langsung. Sistem plastik menunjukkan dampak tertunda di persistensi lingkungan, bioakumulasi, dan hasil kesehatan.",
  },
  {
    id: "feedback",
    question:
      "Identifikasi LOOP UMPAN BALIK dalam sistem plastik:",
    options: [
      "A. Lebih banyak produksi → lebih banyak limbah → kerusakan lingkungan → tekanan publik → perubahan kebijakan → pengurangan produksi",
      "B.Teknologi meningkatkan daur ulang → produksi baru berkurang → investasi teknologi berkurang",
      "C. Pertumbuhan ekonomi → lebih banyak konsumsi → lebih banyak produksi → lebih banyak aktivitas ekonomi",
      "D. A dan C benar",
    ],
    correct: ["A dan C benar"],
    explanation:
      "Loop umpan balik terjadi ketika efek kembali mempengaruhi penyebab. Baik tekanan lingkungan yang mendorong kebijakan (umpan balik negatif) dan pertumbuhan ekonomi yang mendorong lebih banyak produksi (umpan balik positif) adalah loop sistem.",
  },
];

export const Reflection: React.FC = () => {
  const navigate = useNavigate();
  const {
    updateProgress,
    completeActivity,
    addPoints,
    addBadge,
  } = useUser();
  const [answers, setAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answer });
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    QUESTIONS.forEach((q) => {
      if (q.correct.includes(answers[q.id])) {
        correctCount++;
      }
    });

    const earnedPoints = correctCount * 10;
    addPoints(earnedPoints);

    if (correctCount === QUESTIONS.length) {
      addBadge("Systems Thinking Master 🧠");
    } else if (correctCount >= 3) {
      addBadge("Systems Analyst 🔍");
    }

    setSubmitted(true);
  };

  const handleContinue = () => {
    completeActivity("reflection");
    updateProgress(100);
    navigate("/final-reward");
  };

  const allAnswered = QUESTIONS.every((q) => answers[q.id]);
  const correctCount = submitted
    ? QUESTIONS.filter((q) => q.correct.includes(answers[q.id]))
        .length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#2D6A4F] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            SYNERGY - Refleksi & Solusi
          </h1>
          <Button
            variant="ghost"
            className="text-white"
            onClick={() => navigate("/dashboard")}
          >
            ← Dasbor
          </Button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Refleksi Akhir
            </h2>
            <p className="text-xl text-gray-600">
              Tunjukkan pemahaman systems thinking Anda
            </p>
          </div>

          {/* Educational Video Section */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Desain Plastik Biodegradable: Solusi Sistem
            </h3>
            <p className="text-gray-600 mb-6">
              Tonton video ini untuk melihat bagaimana prinsip
              kimia hijau menciptakan plastik biodegradable yang
              bekerja dengan sistem alami alih-alih melawannya.
            </p>

            {/* Video Placeholder */}
            <div
              className="relative bg-gray-900 rounded-lg overflow-hidden mb-6"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/noZ8IEXrxe4?rel=0"
                title="Merancang Plastik Biodegradable dengan Kimia Hijau"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
                onLoad={() => setVideoWatched(true)}
              />
            </div>

            {videoWatched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border-2 border-green-300 rounded-lg p-6"
              >
                <h4 className="font-bold mb-3">
                  Poin Penting:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    ✓ Bahan baku terbarukan dari material
                    tanaman menggantikan minyak bumi
                  </li>
                  <li>
                    ✓ Dirancang untuk biodegradasi dalam 6-12
                    bulan melalui penguraian enzimatik
                  </li>
                  <li>
                    ✓ Tidak beracun sepanjang siklus hidup -
                    aman untuk tanah dan lingkungan laut
                  </li>
                  <li>
                    ✓ Mempertahankan performa sambil memecahkan
                    masalah persistensi
                  </li>
                  <li>
                    ✓ Menunjukkan bagaimana kimia hijau mengubah
                    seluruh sistem
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Assessment Questions */}
          {videoWatched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-xl mb-8"
            >
              <h3 className="text-2xl font-bold mb-6">
                Asesmen Pemikiran Sistem
              </h3>
              <p className="text-gray-600 mb-8">
                Jawab pertanyaan konseptual ini untuk
                menunjukkan pemahaman Anda tentang karakteristik
                sistem. Setiap jawaban benar bernilai 10 poin!
              </p>

              <div className="space-y-8">
                {QUESTIONS.map((question, qIdx) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: qIdx * 0.1 }}
                    className="border-2 border-gray-200 rounded-lg p-6"
                  >
                    <h4 className="font-bold text-lg mb-4">
                      {qIdx + 1}. {question.question}
                    </h4>

                    <div className="space-y-3">
                      {question.options.map((option, oIdx) => {
                        const isSelected =
                          answers[question.id] === option;
                        const isCorrect =
                          question.correct.includes(option);
                        const showResult = submitted;

                        return (
                          <button
                            key={oIdx}
                            onClick={() =>
                              handleAnswer(question.id, option)
                            }
                            disabled={submitted}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              showResult && isCorrect
                                ? "bg-green-100 border-green-500"
                                : showResult &&
                                    isSelected &&
                                    !isCorrect
                                  ? "bg-red-100 border-red-500"
                                  : isSelected
                                    ? "bg-blue-100 border-blue-500"
                                    : "bg-white border-gray-300 hover:border-gray-400"
                            } ${submitted ? "cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <div className="flex items-center gap-3">
                              {showResult && isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                              ) : (
                                <Circle
                                  className={`w-5 h-5 flex-shrink-0 ${
                                    isSelected
                                      ? "text-blue-600 fill-blue-600"
                                      : "text-gray-400"
                                  }`}
                                />
                              )}
                              <span
                                className={
                                  showResult && isCorrect
                                    ? "font-semibold"
                                    : ""
                                }
                              >
                                {option}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded"
                      >
                        <p className="text-sm text-gray-700">
                          <strong>Penjelasan:</strong>{" "}
                          {question.explanation}
                        </p>
                      </motion.div>
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
                    Kirim Asesmen
                  </Button>
                </div>
              )}

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <div
                    className={`rounded-xl p-8 text-white text-center mb-6 ${
                      correctCount === QUESTIONS.length
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : correctCount >= 3
                          ? "bg-gradient-to-r from-blue-500 to-blue-600"
                          : "bg-gradient-to-r from-orange-500 to-orange-600"
                    }`}
                  >
                    <h3 className="text-3xl font-bold mb-2">
                      {correctCount === QUESTIONS.length
                        ? "🎉 Skor Sempurna!"
                        : correctCount >= 3
                          ? "👏 Kerja Bagus!"
                          : "💪 Terus Belajar!"}
                    </h3>
                    <p className="text-xl mb-4">
                      Anda mendapat {correctCount} dari{" "}
                      {QUESTIONS.length} benar
                    </p>
                    <p className="text-2xl font-bold">
                      +{correctCount * 10} Poin Diperoleh
                    </p>
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="bg-[#2D6A4F] hover:bg-[#40916C]"
                      onClick={handleContinue}
                    >
                      Lihat Pencapaian Anda
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
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