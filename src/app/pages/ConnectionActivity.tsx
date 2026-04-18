import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { motion } from 'motion/react';
import {
  ArrowRight, Star, Plus, Minus, Factory, ShoppingCart, Trash2,
  CloudRain, DollarSign, Sprout, Leaf, Globe, Users, Target
} from 'lucide-react';
import { Footer } from '../components/Footer';


interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  icon: React.ReactNode;
  tooltip: string;
}


interface Connection {
  from: string;
  to: string;
  type: '+' | '-';
}


interface CorrectConnection {
  from: string;
  to: string;
  type: '+' | '-';
  explanation: string;
}


const NODES: Node[] = [
  // Top row - shifted up
  { id: 'production', label: 'Produksi', x: 15, y: 15, color: '#e76f51', icon: <Factory className="w-6 h-6" />, tooltip: 'Pembuatan produk plastik' },
  { id: 'consumption', label: 'Konsumsi', x: 35, y: 9, color: '#f4a261', icon: <ShoppingCart className="w-6 h-6" />, tooltip: 'Penggunaan produk plastik' },
  { id: 'waste', label: 'Limbah', x: 55, y: 9, color: '#264653', icon: <Trash2 className="w-6 h-6" />, tooltip: 'Material plastik yang dibuang' },
 
  // Middle row - shifted up
  { id: 'economy', label: 'Ekonomi', x: 8, y: 38, color: '#0077b6', icon: <DollarSign className="w-6 h-6" />, tooltip: 'Biaya dan manfaat ekonomi' },
  { id: 'social', label: 'Sosial', x: 83, y: 38, color: '#f72585', icon: <Users className="w-6 h-6" />, tooltip: 'Dampak pada komunitas dan masyarakat' },
  { id: 'environment', label: 'Lingkungan', x: 75, y: 15, color: '#2d6a4f', icon: <CloudRain className="w-6 h-6" />, tooltip: 'Ekosistem alami dan lingkungan' },
 
  // Bottom row - shifted up
  { id: 'sustainability', label: 'Keberlanjutan', x: 15, y: 64, color: '#40916C', icon: <Sprout className="w-6 h-6" />, tooltip: 'Tujuan pembangunan berkelanjutan' },
  { id: 'policy', label: 'Kebijakan', x: 35, y: 66, color: '#457b9d', icon: <Target className="w-6 h-6" />, tooltip: 'Regulasi dan hukum pemerintah' },
  { id: 'technology', label: 'Teknologi', x: 75, y: 64, color: '#38bdf8', icon: <Globe className="w-6 h-6" />, tooltip: 'Inovasi dalam produksi dan pengelolaan plastik' },
  { id: 'lifecycle', label: 'Siklus Hidup', x: 55, y: 66, color: '#fbbf24', icon: <Leaf className="w-6 h-6" />, tooltip: 'Perjalanan plastik dari produksi hingga limbah'}
];


const CORRECT_CONNECTIONS: CorrectConnection[] = [
  // Hubungan Meningkatkan / Memperbaiki (+)
  { from: 'production', to: 'consumption', type: '+', explanation: 'Produksi meningkat menyebabkan konsumsi meningkat' },
  { from: 'production', to: 'waste', type: '+', explanation: 'Produksi meningkat menghasilkan lebih banyak limbah' },
  { from: 'production', to: 'economy', type: '+', explanation: 'Produksi meningkat mendorong pertumbuhan ekonomi' },
  { from: 'consumption', to: 'waste', type: '+', explanation: 'Konsumsi meningkat menghasilkan lebih banyak limbah' },
  { from: 'consumption', to: 'production', type: '+', explanation: 'Konsumsi meningkat mendorong produksi meningkat' },
  { from: 'consumption', to: 'economy', type: '+', explanation: 'Konsumsi meningkat mendorong pertumbuhan ekonomi' },
  { from: 'economy', to: 'production', type: '+', explanation: 'Ekonomi yang kuat meningkatkan produksi' },
  { from: 'economy', to: 'consumption', type: '+', explanation: 'Ekonomi yang kuat meningkatkan daya konsumsi' },
  { from: 'economy', to: 'policy', type: '+', explanation: 'Ekonomi mempengaruhi pembuatan kebijakan' },
  { from: 'social', to: 'consumption', type: '+', explanation: 'Faktor sosial mendorong konsumsi' },
  { from: 'sustainability', to: 'environment', type: '+', explanation: 'Keberlanjutan memperbaiki kondisi lingkungan' },
  { from: 'sustainability', to: 'social', type: '+', explanation: 'Keberlanjutan memperbaiki kesejahteraan sosial' },
  { from: 'sustainability', to: 'economy', type: '+', explanation: 'Keberlanjutan mendukung ekonomi jangka panjang' },
  { from: 'policy', to: 'environment', type: '+', explanation: 'Kebijakan dapat memperbaiki kondisi lingkungan' },
  { from: 'environment', to: 'social', type: '+', explanation: 'Lingkungan yang baik meningkatkan kesejahteraan sosial' },
  { from: 'environment', to: 'policy', type: '+', explanation: 'Kondisi lingkungan mempengaruhi pembuatan kebijakan' },
  { from: 'technology', to: 'environment', type: '+', explanation: 'Teknologi membantu memperbaiki kondisi lingkungan melalui inovasi dan pengelolaan limbah' },
  { from: 'technology', to: 'lifecycle', type: '+', explanation: 'Teknologi memperbaiki siklus hidup plastik melalui daur ulang dan material ramah lingkungan' },
 
  // Hubungan Mengurangi / Merusak (−)
  { from: 'production', to: 'environment', type: '-', explanation: 'Produksi berlebihan merusak lingkungan' },
  { from: 'consumption', to: 'environment', type: '-', explanation: 'Konsumsi berlebihan merusak lingkungan' },
  { from: 'waste', to: 'environment', type: '-', explanation: 'Limbah merusak lingkungan' },
  { from: 'waste', to: 'social', type: '-', explanation: 'Limbah merusak kesejahteraan sosial masyarakat' },
  { from: 'waste', to: 'economy', type: '-', explanation: 'Limbah mengurangi atau merusak ekonomi' },
  { from: 'policy', to: 'production', type: '-', explanation: 'Kebijakan mengurangi produksi plastik berlebihan' },
  { from: 'policy', to: 'consumption', type: '-', explanation: 'Kebijakan mengurangi konsumsi plastik' },
  { from: 'policy', to: 'waste', type: '-', explanation: 'Kebijakan mengurangi limbah plastik' },
];


export const ConnectionActivity: React.FC = () => {
  const navigate = useNavigate();
  const { updateProgress, completeActivity, addPoints } = useUser();
  const { language } = useLanguage();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedFrom, setSelectedFrom] = useState<string | null>(null);
  const [selectedTo, setSelectedTo] = useState<string | null>(null);
  const [connectionType, setConnectionType] = useState<'+' | '-'>('+');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);


  const handleNodeClick = (nodeId: string) => {
    if (!selectedFrom) {
      setSelectedFrom(nodeId);
    } else if (selectedFrom === nodeId) {
      setSelectedFrom(null);
    } else {
      setSelectedTo(nodeId);
    }
  };


  const handleAddConnection = () => {
    if (!selectedFrom || !selectedTo) return;


    const newConnection: Connection = {
      from: selectedFrom,
      to: selectedTo,
      type: connectionType
    };


    // Check if connection already exists
    const exists = connections.some(
      c => c.from === newConnection.from && c.to === newConnection.to
    );


    if (exists) {
      setShowFeedback('⚠ Hubungan ini sudah ada!');
      setSelectedFrom(null);
      setSelectedTo(null);
      setTimeout(() => setShowFeedback(null), 3000);
      return;
    }


    // Check if connection is correct
    const isCorrect = CORRECT_CONNECTIONS.some(
      c => c.from === newConnection.from &&
           c.to === newConnection.to &&
           c.type === newConnection.type
    );


    if (isCorrect) {
      setConnections(prev => [...prev, newConnection]);
      setScore(prev => prev + 2);
      addPoints(2);
      const explanation = CORRECT_CONNECTIONS.find(
        c => c.from === newConnection.from && c.to === newConnection.to && c.type === newConnection.type
      )?.explanation;
      setShowFeedback(`✓ Benar! ${explanation} (+2 poin)`);
    } else {
      setShowFeedback('✗ Hubungan ini tidak menjadi bagian dari hubungan utama sistem plastik.');
    }


    // Reset selection
    setSelectedFrom(null);
    setSelectedTo(null);


    // Clear feedback after 3 seconds
    setTimeout(() => setShowFeedback(null), 3000);
  };


  const handleContinue = () => {
    completeActivity('connections');
    updateProgress(40);
    navigate('/dynamic-analysis');
  };


  const getNodeById = (id: string) => NODES.find(n => n.id === id);


  // Generate curved path between two points
  const getCurvedPath = (x1: number, y1: number, x2: number, y2: number): string => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
   
    // Calculate angle between nodes
    const angle = Math.atan2(dy, dx);
   
    // Node radius in percentage (adjust based on actual node size)
    const nodeRadius = 2.5;
   
    // Start point at edge of source node
    const startX = x1 + Math.cos(angle) * nodeRadius;
    const startY = y1 + Math.sin(angle) * nodeRadius;
   
    // End point at edge of target node (subtract radius to stop at edge)
    const endX = x2 - Math.cos(angle) * nodeRadius;
    const endY = y2 - Math.sin(angle) * nodeRadius;
   
    // Calculate control points for smooth curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
   
    // Perpendicular offset for curve (creates the arc)
    const curvature = distance * 0.2; // Adjust this for more/less curve
    const offsetX = -Math.sin(angle) * curvature;
    const offsetY = Math.cos(angle) * curvature;
   
    const controlX = midX + offsetX;
    const controlY = midY + offsetY;
   
    // Create smooth quadratic bezier curve
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };


  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-[#2D6A4F] text-white px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <h1 className="text-lg sm:text-2xl font-bold">SYNERGY - Hubungan Sistem</h1>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4A261]" />
                <span className="font-semibold text-sm sm:text-base">Skor: {score}</span>
              </div>
              <Button variant="ghost" className="text-white text-sm sm:text-base" onClick={() => navigate('/dashboard')}>
                ← Dasbor
              </Button>
            </div>
          </div>
        </nav>


         {/* Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2}}
                exit={{ opacity: 0, y: -50 }}
                className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-sm sm:text-base font-semibold ${
                  showFeedback.includes('✓')
                    ? 'bg-green-500 text-white'
                    : showFeedback.includes('⚠')
                    ? 'bg-yellow-500 text-black'
                    : 'bg-red-500 text-white'
                }`}
              >
                {showFeedback}
              </motion.div>
            )}


        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Petakan Hubungan Sistem</h2>
              <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-6">
                Hubungkan komponen dan beri label hubungan mereka. Apakah satu komponen meningkatkan (+) atau mengurangi (−) komponen lain?
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-2 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg shadow">
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="text-sm sm:text-base">Meningkatkan / Memperbaiki</span>
                </div>
                <div className="flex items-center gap-2">
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  <span className="text-sm sm:text-base">Mengurangi / Merusak</span>
                </div>
              </div>
            </div>


            {/* Instructions */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded mb-6 sm:mb-8">
              <p className="font-semibold mb-2 text-sm sm:text-base">Cara menggunakan:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-gray-700">
                <li>Klik komponen awal (ditandai dengan warna biru)</li>
                <li>Klik komponen akhir untuk membuat hubungan</li>
                <li>Pilih jenis hubungan: + (meningkatkan) atau − (mengurangi)</li>
                <li>Klik "Tambah Hubungan" untuk mengirim</li>
                <li>Arahkan kursor ke komponen untuk melihat deskripsi</li>
              </ol>
            </div>


            {/* Connection Builder */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow mb-6 sm:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2">Dari Komponen:</label>
                  <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded border-2 border-blue-500 text-sm sm:text-base">
                    {selectedFrom ? getNodeById(selectedFrom)?.label : 'Klik sebuah komponen'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2">Hubungan:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConnectionType('+')}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded border-2 transition-all ${
                        connectionType === '+'
                          ? 'bg-green-500 text-white border-green-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => setConnectionType('-')}
                      className={`flex-1 px-3 sm:px-4 py-2 rounded border-2 transition-all ${
                        connectionType === '-'
                          ? 'bg-red-500 text-white border-red-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2">Ke Komponen:</label>
                  <div className="px-3 sm:px-4 py-2 bg-gray-100 rounded border-2 border-green-500 text-sm sm:text-base">
                    {selectedTo ? getNodeById(selectedTo)?.label : 'Klik komponen kedua'}
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <Button
                  onClick={handleAddConnection}
                  disabled={!selectedFrom || !selectedTo}
                  className="w-full bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-50 text-sm sm:text-base"
                >
                  Tambah Hubungan
                </Button>
              </div>
            </div>


            {/* System Diagram */}
            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 lg:p-12 mb-6 sm:mb-8 relative overflow-hidden" style={{ height: '500px', minHeight: '400px' }}>
              {/* Draw nodes */}
              {NODES.map(node => (
                <Tooltip key={node.id}>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={`absolute cursor-pointer ${
                        selectedFrom === node.id ? 'ring-4 ring-blue-400 z-20' : ''
                      }`}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      whileHover={{ scale: 1.15 }}
                      onClick={() => handleNodeClick(node.id)}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: Math.random() * 0.5, type: "spring" }}
                    >
                      <div
                        className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold text-center shadow-lg border-4 border-white/30 backdrop-blur-sm"
                        style={{ backgroundColor: node.color }}
                      >
                        {node.icon}
                        <span className="text-xs mt-1">{node.label.split(' ')[0]}</span>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-900 text-white border-gray-700">
                    <p className="font-semibold">{node.label}</p>
                    <p className="text-sm text-gray-300">{node.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>


            {/* Progress */}
            <div className="bg-white rounded-lg p-6 shadow mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-0">Hubungan Anda: {connections.length} / 14</h3>
                <div className="text-sm text-gray-600">
                  Minimal 3 hubungan untuk lanjut
                </div>
              </div>
             
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <motion.div
                  className="bg-[#2D6A4F] h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(connections.length / 14) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>


              <div className="space-y-2 max-h-64 overflow-y-auto">
                {connections.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Belum ada hubungan. Mulai dengan mengklik dua komponen!</p>
                ) : (
                  connections.map((conn, idx) => {
                    const fromNode = getNodeById(conn.from);
                    const toNode = getNodeById(conn.to);
                    return (
                      <div key={idx} className="flex items-center gap-3 text-sm bg-gray-50 p-3 rounded">
                        <span className="font-semibold text-gray-800">{fromNode?.label}</span>
                        <span className={`px-3 py-1 rounded-full font-bold ${
                          conn.type === '+' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {conn.type === '+' ? 'Meningkatkan' : 'Mengurangi'}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-800">{toNode?.label}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>


            {/* Continue Button - Always visible with different states */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {connections.length >= 3 ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-semibold text-lg">
                      ✓ Bagus! Anda telah membuat {connections.length} hubungan sistem.
                    </p>
                    <p className="text-green-700 text-sm mt-2">
                      Anda dapat melanjutkan ke pembelajaran berikutnya atau menambah lebih banyak hubungan.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-[#2D6A4F] hover:bg-[#40916C] text-lg px-8 py-6"
                    onClick={handleContinue}
                  >
                    Lanjutkan ke Analisis Dinamis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 font-semibold">
                      Buat minimal {3 - connections.length} hubungan lagi untuk melanjutkan
                    </p>
                    <p className="text-blue-700 text-sm mt-2">
                      Target: 14 hubungan sistem plastik
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gray-300 text-gray-500 cursor-not-allowed text-lg px-8 py-6"
                    disabled
                  >
                    Lanjutkan ke Analisis Dinamis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </TooltipProvider>
  );
};

