import React from 'react';

interface FooterProps {
  logo?: string;
}

export const Footer: React.FC<FooterProps> = ({ logo }) => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        {logo && (
          <div className="flex justify-center mb-4">
            <img 
              src={logo} 
              alt="Universitas Negeri Malang" 
              className="h-12 object-contain"
            />
          </div>
        )}
        <div className="text-center">
          <p className="text-xs text-gray-600">
            © 2026 SYNERGY – Developed by:
          </p>
          <p className="text-xs text-gray-700 font-medium mt-1">
            Erza Fradeva Priyanto
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Pembimbing: Prof. Dra. Sri Rahayu, M.Ed., Ph.D.
          </p>
        </div>
      </div>
    </footer>
  );
};