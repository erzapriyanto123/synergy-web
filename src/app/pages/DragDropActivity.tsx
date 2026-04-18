import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight, Star, X, Check } from 'lucide-react';
import { Footer } from '../components/Footer';

interface Item {
  id: string;
  label: string;
  isCorrect: boolean;
}

const ITEMS: Item[] = [
  { id: '1', label: 'Produksi', isCorrect: true },
  { id: '2', label: 'Konsumsi', isCorrect: true },
  { id: '3', label: 'Limbah', isCorrect: true },
  { id: '4', label: 'Lingkungan', isCorrect: true },
  { id: '5', label: 'Ekonomi', isCorrect: true },
  { id: '6', label: 'Teknologi', isCorrect: true },
  { id: '7', label: 'Iklim', isCorrect: true },
  { id: '8', label: 'Sosial', isCorrect: true },
  { id: '9', label: 'Keberlanjutan', isCorrect: true },
  { id: '10', label: 'Fotosintesis', isCorrect: false },
  { id: '11', label: 'Kompos', isCorrect: false },
  { id: '12', label: 'Banjir', isCorrect: false },
  { id: '13', label: 'Inflasi Global', isCorrect: false },
  { id: '14', label: 'Energi Terbarukan', isCorrect: false },
  { id: '15', label: 'Pertanian', isCorrect: false },
  { id: '16', label: 'Peternakan', isCorrect: false },
  { id: '17', label: 'Energi', isCorrect: false },
  { id: '18', label: 'Populasi', isCorrect: false },
  { id: '19', label: 'Krisis Pangan', isCorrect: false }
];

export const DragDropActivity: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity, addPoints } = useUser();
  const { t } = useLanguage();

  const [availableItems, setAvailableItems] = useState<Item[]>(
    [...ITEMS].sort(() => Math.random() - 0.5)
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [droppedItems, setDroppedItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  // klik item
  const handleSelect = (item: Item) => {
    if (droppedItems.some(i => i.id === item.id)) return;
    setSelectedItem(item);
  };

  // klik drop zone
  const handleDrop = () => {
    if (!selectedItem) return;

    setAvailableItems(prev =>
      prev.filter(i => i.id !== selectedItem.id)
    );

    setDroppedItems(prev => [...prev, selectedItem]);

    if (selectedItem.isCorrect) {
      setScore(prev => prev + 1);
      addPoints(1);
      setFeedback({ message: 'Benar! +1 poin', isCorrect: true });
    } else {
      setScore(prev => prev - 1);
      setFeedback({ message: 'Salah! -1 poin', isCorrect: false });
    }

    setSelectedItem(null);

    setTimeout(() => setFeedback(null), 2000);
  };

  const correctCount = droppedItems.filter(i => i.isCorrect).length;
  const totalCorrect = ITEMS.filter(i => i.isCorrect).length;

  const handleContinue = () => {
    completeActivity('drag-drop');
    updateProgress(30);
    navigate('/connection-activity');
  };

  return (
     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-green-50">
      
      {/* NAV */}
      <nav className="bg-[#2D6A4F] text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <h1 className="text-xl font-bold">
            SYNERGY - Identifikasi Komponen Sistem
          </h1>

          <div className="flex items-center gap-4">
            <Star className="w-5 h-5 text-yellow-300" />
            <span>Skor: {score}</span>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        {/* TITLE */}
         <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2D6A4F]">
          Identifikasi Komponen Sistem
        </h2>
        <p className="text-gray-600 mt-2">
          Klik komponen → lalu klik area sistem
        </p>
      </div>
      
       {/* SELECT STATUS */}
      {selectedItem && (
        <div className="mb-4 text-center">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full shadow">
            🎯 Terpilih: <b>{selectedItem.label}</b>
          </span>
        </div>
      )}

        {/* DROP ZONE */}
         <motion.div
        onClick={handleDrop}
        whileTap={{ scale: 0.98 }}
        className={`min-h-72 md:min-h-80 rounded-3xl border-4 border-dashed p-8 text-center cursor-pointer transition-all shadow-lg ${
          selectedItem
            ? 'border-[#2D6A4F] bg-green-100 scale-[1.01]'
            : 'border-gray-300 bg-white'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-5xl mb-3">🧩</div>
          <h3 className="text-2xl font-bold text-[#2D6A4F]">
            Sistem Plastik
          </h3>
          <p className="text-gray-500 mt-2">
            {selectedItem
              ? 'Klik untuk memasukkan item ini'
              : 'Pilih komponen terlebih dahulu'}
          </p>
        </div>
      </motion.div>

        {/* ITEMS */}
         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
        {availableItems.map(item => (
          <motion.button
            key={item.id}
            onClick={() => handleSelect(item)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className={`
              p-4 rounded-2xl border-2 text-sm md:text-base font-medium shadow-sm transition-all
              ${
                selectedItem?.id === item.id
                  ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-lg'
                  : 'bg-white border-gray-200 hover:border-[#2D6A4F] hover:shadow-md'
              }
            `}
          >
            {item.label}
          </motion.button>
        ))}
      </div>

        {/* DROPPED ITEMS */}
         {droppedItems.length > 0 && (
        <div className="mt-10">
          <h4 className="font-bold text-[#2D6A4F] mb-3">
            📦 Item yang sudah dipilih:
          </h4>

          <div className="flex flex-wrap gap-2">
            {droppedItems.map(i => (
              <motion.div
                key={i.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`
                  px-3 py-2 rounded-full flex items-center gap-2 shadow
                  ${i.isCorrect ? 'bg-green-100' : 'bg-red-100'}
                `}
              >
                <span className="text-sm">{i.label}</span>
                {i.isCorrect ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <X className="w-4 h-4 text-red-600" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

        {/* FEEDBACK */}
        {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-24 right-4 px-5 py-3 rounded-xl text-white shadow-lg ${
            feedback.isCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {feedback.message}
        </motion.div>
      )}

        {/* NEXT BUTTON*/}
        {correctCount === totalCorrect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-10"
        >
          <Button
            onClick={handleContinue}
            className="bg-[#2D6A4F] hover:bg-[#1f4d39] text-white px-6 py-3 rounded-xl text-lg shadow-lg"
          >
            🎉 Lanjutkan <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      )}

    </div>

    <Footer />
  </div>
);
};