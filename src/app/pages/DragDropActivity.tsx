import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { DndProvider, useDrag, useDrop  } from 'react-dnd';
import { MultiBackend, TouchTransition, HTML5DragTransition } from 'react-dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
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

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: HTML5DragTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      transition: TouchTransition,
    },
  ],
};

const DraggableItem: React.FC<{ item: Item; onDrop: (item: Item) => void }> = ({ item, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));


  return (
    <motion.div
  ref={(node: HTMLDivElement | null) => {
    if (node) drag(node);
  }}
      className={`px-4 py-3 bg-white border-2 border-gray-300 rounded-lg cursor-move hover:border-[#2D6A4F] transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      whileHover={{ scale: 1.05 }}
    >
      <span className="font-medium">{item.label}</span>
    </motion.div>
  );
};


const DropZone: React.FC<{ onDrop: (item: Item) => void; t: (key: string) => string }> = ({ onDrop, t }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));


  return (
  <div
  ref={(node) => {
    if (node) drop(node);
  }}
  className={`min-h-96 border-4 border-dashed rounded-2xl p-8 transition-all ${
    isOver ? 'border-[#2D6A4F] bg-[#2D6A4F]/10' : 'border-gray-300 bg-gray-50'
  }`}
>
  <div className="text-center mb-6">
    <div className="inline-block p-8 bg-gradient-to-br from-[#2D6A4F] to-[#40916C] rounded-full mb-4">
      <h3 className="text-3xl font-bold text-white">
        {t('dragdrop.plastic')}
      </h3>
    </div>
    <p className="text-gray-600">{t('dragdrop.dragHere')}</p>
  </div>
</div>
  );
};


export const DragDropActivity: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity, addPoints } = useUser();
  const { t } = useLanguage();
  const [availableItems, setAvailableItems] = useState<Item[]>(
    [...ITEMS].sort(() => Math.random() - 0.5)
  );
  const [droppedItems, setDroppedItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [dropCounter, setDropCounter] = useState(0); // Add unique counter for dropped items


  const handleDrop = (item: Item) => {
    // Check if item already dropped - prevent duplicates
    if (droppedItems.some(dropped => dropped.id === item.id)) {
      return;
    }


    // Remove from available items
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
   
    // Add to dropped items (without duplicate keys)
    setDroppedItems(prev => [...prev, item]);
    setDropCounter(prev => prev + 1);


    // Update score and show feedback
    if (item.isCorrect) {
      setScore(prev => prev + 1);
      addPoints(1);
      setFeedback({ message: 'Benar! +1 poin', isCorrect: true });
    } else {
      setScore(prev => prev - 1);
      setFeedback({ message: 'Salah! -1 poin', isCorrect: false });
    }


    // Clear feedback after 2 seconds
    setTimeout(() => setFeedback(null), 2000);
  };


  const handleContinue = () => {
    completeActivity('drag-drop');
    updateProgress(30);
    navigate('/connection-activity');
  };


  const correctCount = droppedItems.filter(i => i.isCorrect).length;
  const incorrectCount = droppedItems.filter(i => !i.isCorrect).length;
  const totalCorrect = ITEMS.filter(i => i.isCorrect).length;


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-[#2D6A4F] text-white px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">SYNERGY - Identifikasi Komponen Sistem</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F4A261]" />
                <span className="font-semibold">Skor: {score}</span>
              </div>
              <Button variant="ghost" className="text-white" onClick={() => navigate('/dashboard')}>
                ← Dasbor
              </Button>
            </div>
          </div>
        </nav>


        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Identifikasi Komponen Sistem</h2>
              <p className="text-xl text-gray-600">
                Seret komponen yang benar ke dalam lingkaran Sistem Plastik. Hindari pengecoh!
              </p>
            </div>


            {/* Progress */}
            <div className="mb-8 bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Progres: {correctCount}/{totalCorrect} komponen benar</span>
                <span className="text-sm text-gray-600">
                  {incorrectCount > 0 && `${incorrectCount} salah`}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#2D6A4F] to-[#40916C]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(correctCount / totalCorrect) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>


            <div className="grid md:grid-cols-2 gap-8">
              {/* Available Items */}
              <div>
                <h3 className="text-xl font-bold mb-4">Komponen Tersedia</h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableItems.map(item => (
                    <DraggableItem key={item.id} item={item} onDrop={handleDrop} />
                  ))}
                </div>
              </div>


              {/* Drop Zone */}
              <div>
                <h3 className="text-xl font-bold mb-4">Sistem Plastik</h3>
                <DropZone onDrop={handleDrop} t={t} />
               
                {/* Dropped Items */}
                {droppedItems.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold">Item yang Dipilih:</h4>
                    <div className="flex flex-wrap gap-2">
                      {droppedItems.map((item, index) => (
                        <div
                          key={`dropped-${item.id}-${index}`}
                          className={`px-3 py-2 rounded flex items-center gap-2 ${
                            item.isCorrect
                              ? 'bg-green-100 border border-green-300'
                              : 'bg-red-100 border border-red-300'
                          }`}
                        >
                          <span className="text-sm">{item.label}</span>
                          {item.isCorrect ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>


            {/* Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`fixed top-24 right-6 px-6 py-4 rounded-lg shadow-lg ${
                  feedback.isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {feedback.isCorrect ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <X className="w-6 h-6" />
                  )}
                  <span className="font-semibold">{feedback.message}</span>
                </div>
              </motion.div>
            )}


            {/* Continue Button */}
            {correctCount === totalCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8 mb-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    🎉 Kerja Bagus!
                  </h3>
                  <p className="text-green-600">
                    Anda telah mengidentifikasi semua komponen sistem dengan benar. Anda berpikir seperti seorang analis sistem!
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-[#2D6A4F] hover:bg-[#40916C]"
                  onClick={handleContinue}
                >
                  Lanjutkan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}


            {/* Always show Next button at bottom */}
            {droppedItems.length > 0 && correctCount < totalCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white"
                  onClick={handleContinue}
                >
                  Lanjutkan
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-gray-600 mt-2">
                  Anda dapat melanjutkan, tetapi cobalah untuk mendapatkan semua komponen yang benar terlebih dahulu!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
};


