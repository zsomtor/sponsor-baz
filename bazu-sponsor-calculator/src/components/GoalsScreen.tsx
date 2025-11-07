import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { goals } from '../data/goals';
import type { SponsorshipGoal } from '../types';

interface GoalsScreenProps {
  budget: number;
  onContinue: (selectedGoals: SponsorshipGoal) => void;
  onBack: () => void;
}

export const GoalsScreen = ({ budget, onContinue, onBack }: GoalsScreenProps) => {
  const [selectedGoals, setSelectedGoals] = useState<Record<string, boolean>>({});

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => ({
      ...prev,
      [goalId]: !prev[goalId],
    }));
  };

  const selectedCount = Object.values(selectedGoals).filter(Boolean).length;
  const canContinue = selectedCount > 0;

  const handleContinue = () => {
    const goalData: SponsorshipGoal = {
      brandAwareness: selectedGoals['brandAwareness'] || false,
      leadGeneration: selectedGoals['leadGeneration'] || false,
      b2bCredibility: selectedGoals['b2bCredibility'] || false,
      productLaunch: selectedGoals['productLaunch'] || false,
      longTerm: selectedGoals['longTerm'] || false,
    };
    onContinue(goalData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(230, 57, 70, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
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
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block glass-effect rounded-2xl px-6 py-3 mb-6"
          >
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Költségkeret: <span className="gradient-text">{formatCurrency(budget)} Ft/hó</span>
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-black mb-4"
          >
            Mik a <span className="gradient-text">célok?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-400"
          >
            Válaszd ki, mit szeretnél elérni a szponzorációval
          </motion.p>
        </div>

        {/* Goals Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          {/* First 3 goals - full grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {goals.slice(0, 3).map((goal, index) => {
              const isSelected = selectedGoals[goal.id];
              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  onClick={() => toggleGoal(goal.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative text-left p-6 rounded-2xl transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-bazu-orange/20 to-bazu-red/20 border-2 border-bazu-orange'
                      : 'glass-effect hover:border-white/20'
                  }`}
                >
                  {/* Checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-bazu-orange to-bazu-red rounded-full flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <div className="text-4xl mb-3">{goal.icon}</div>

                  {/* Content */}
                  <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'gradient-text' : 'text-white'}`}>
                    {goal.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{goal.description}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Last 2 goals - centered on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:flex lg:justify-center lg:gap-4">
            {goals.slice(3).map((goal, index) => {
              const isSelected = selectedGoals[goal.id];
              return (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index + 3) * 0.1, duration: 0.5 }}
                  onClick={() => toggleGoal(goal.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative text-left p-6 rounded-2xl transition-all duration-300 lg:w-[calc(33.333%-0.5rem)] ${
                    isSelected
                      ? 'bg-gradient-to-br from-bazu-orange/20 to-bazu-red/20 border-2 border-bazu-orange'
                      : 'glass-effect hover:border-white/20'
                  }`}
                >
                  {/* Checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-bazu-orange to-bazu-red rounded-full flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <div className="text-4xl mb-3">{goal.icon}</div>

                  {/* Content */}
                  <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'gradient-text' : 'text-white'}`}>
                    {goal.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{goal.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="px-8 py-4 glass-effect rounded-2xl font-bold text-white hover:border-white/30 transition-all duration-300"
          >
            ← Vissza
          </motion.button>

          <motion.button
            whileHover={canContinue ? { scale: 1.02 } : {}}
            whileTap={canContinue ? { scale: 0.98 } : {}}
            onClick={handleContinue}
            disabled={!canContinue}
            className={`flex-1 py-4 px-12 rounded-2xl font-bold text-xl transition-all duration-300 ${
              canContinue
                ? 'bg-gradient-to-r from-bazu-orange to-bazu-red text-white shadow-2xl shadow-bazu-orange/30 hover:shadow-bazu-orange/50'
                : 'glass-effect text-gray-500 cursor-not-allowed'
            }`}
          >
            {canContinue
              ? `Tovább a csomagokhoz (${selectedCount} cél kiválasztva)`
              : 'Válassz legalább egy célt'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
