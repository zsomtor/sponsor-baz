import { useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onContinue: (budget: number) => void;
  onSkipToBuilder: () => void;
}

export const WelcomeScreen = ({ onContinue, onSkipToBuilder }: WelcomeScreenProps) => {
  const [budget, setBudget] = useState(800000);
  const minBudget = 200000;
  const maxBudget = 2000000;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getSliderPercentage = () => {
    return ((budget - minBudget) / (maxBudget - minBudget)) * 100;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(230, 57, 70, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight"
          >
            Építsd meg a{' '}
            <span className="gradient-text">Bazu</span>
            <br />
            partnerséged
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light"
          >
            Prémium szponzorációs csomagok Magyarország vezető média platformján
          </motion.p>
        </div>

        {/* Budget Slider Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="glass-effect rounded-3xl p-6 sm:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div className="mb-8 md:mb-12">
            <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
              Havi költségkeret
            </label>

            {/* Budget Display */}
            <motion.div
              key={budget}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="mb-8 md:mb-12"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black gradient-text mb-2">
                {formatCurrency(budget)}
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-500">HUF / hónap</div>
            </motion.div>

            {/* Custom Slider */}
            <div className="relative">
              {/* Track */}
              <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                {/* Progress */}
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-bazu-orange to-bazu-red"
                  style={{ width: `${getSliderPercentage()}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </div>

              {/* Slider Input */}
              <input
                type="range"
                min={minBudget}
                max={maxBudget}
                step={10000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer"
              />

              {/* Thumb */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-bazu-orange to-bazu-red rounded-full shadow-lg shadow-bazu-orange/50 pointer-events-none"
                style={{ left: `calc(${getSliderPercentage()}% - 16px)` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="absolute inset-1 bg-white rounded-full" />
              </motion.div>

              {/* Range Labels */}
              <div className="flex justify-between mt-6 text-sm font-semibold text-gray-500">
                <span>{formatCurrency(minBudget)} Ft</span>
                <span>{formatCurrency(maxBudget)} Ft</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContinue(budget)}
          className="w-full py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-12 bg-gradient-to-r from-bazu-orange to-bazu-red rounded-2xl font-bold text-lg sm:text-xl text-white shadow-2xl shadow-bazu-orange/30 hover:shadow-bazu-orange/50 transition-shadow duration-300"
        >
          Tovább a célok kiválasztásához
        </motion.button>

        {/* Skip to Custom Builder Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSkipToBuilder}
          className="w-full mt-4 py-3 px-6 glass-effect rounded-2xl font-semibold text-sm text-gray-400 hover:text-white hover:border-white/30 transition-all duration-300"
        >
          ✨ Saját csomag összeállítása (alap árakkal)
        </motion.button>
      </motion.div>
    </div>
  );
};
