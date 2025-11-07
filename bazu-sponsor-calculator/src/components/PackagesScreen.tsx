import { useState } from 'react';
import { motion } from 'framer-motion';
import { getPackagesForBudget, calculateCPV, recommendPackage } from '../data/packages';
import type { Package } from '../types';

interface PackagesScreenProps {
  budget: number;
  onSelectPackage: (pkg: Package) => void;
  onBack: () => void;
}

export const PackagesScreen = ({ budget, onSelectPackage, onBack }: PackagesScreenProps) => {
  const packages = getPackagesForBudget(budget);
  const recommendedPackageId = recommendPackage(budget);
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatReach = (reach: number) => {
    if (reach >= 1000000) {
      return `${(reach / 1000000).toFixed(1)}M`;
    }
    if (reach >= 1000) {
      return `${(reach / 1000).toFixed(0)}k`;
    }
    return reach.toString();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 70%, rgba(230, 57, 70, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
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
        className="relative z-10 max-w-7xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 glass-effect rounded-2xl px-6 py-3 mb-6 hover:border-white/30 transition-all"
          >
            <span>←</span>
            <span className="text-sm font-semibold text-gray-400">
              Költségkeret: <span className="gradient-text">{formatCurrency(budget)} Ft/hó</span>
            </span>
          </motion.button>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-black mb-4"
          >
            Válaszd ki a <span className="gradient-text">csomagod</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-400"
          >
            Prémium szponzorációs csomagok minden igényre
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg, index) => {
            const isRecommended = pkg.id === recommendedPackageId;
            const isHovered = hoveredPackage === pkg.id;
            const cpv = calculateCPV(pkg.price, pkg.totalReach);
            const isAffordable = pkg.price <= budget;

            // Check if this is the next package above budget (show "biztos nem?" indicator)
            const isNextAboveBudget = !isAffordable && index > 0 && packages[index - 1].price <= budget;

            // SALES RULE: Never show "Ajánlott neked" on Bronze (index 0)
            const showRecommended = isRecommended && index !== 0;

            // SALES RULE: Don't show both badges - recommended takes priority
            const showNextAboveBudget = isNextAboveBudget && !showRecommended;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                onMouseEnter={() => setHoveredPackage(pkg.id)}
                onMouseLeave={() => setHoveredPackage(null)}
                className="relative"
              >
                {/* Recommended Badge */}
                {showRecommended && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className="bg-gradient-to-r from-bazu-orange to-bazu-red px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg">
                      🎯 Ajánlott neked
                    </div>
                  </motion.div>
                )}

                {/* Next Above Budget Badge - "Esetleg?" */}
                {showNextAboveBudget && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg">
                      🤔 Esetleg?
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectPackage(pkg)}
                  disabled={false}
                  className={`w-full text-left p-8 rounded-3xl transition-all duration-300 ${
                    showRecommended && isAffordable
                      ? 'bg-gradient-to-br from-bazu-orange/20 to-bazu-red/20 border-2 border-bazu-orange'
                      : showNextAboveBudget
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 hover:border-yellow-500'
                      : isAffordable
                      ? 'glass-effect hover:border-white/30'
                      : 'glass-effect opacity-50 cursor-not-allowed'
                  } ${isHovered && (isAffordable || showNextAboveBudget) ? 'shadow-2xl shadow-bazu-orange/20' : ''}`}
                >
                  {/* Package Header */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-black mb-2 gradient-text">{pkg.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-black text-white">
                        {formatCurrency(pkg.price)}
                      </span>
                      <span className="text-gray-500 font-semibold">Ft/hó</span>
                    </div>

                    {/* Reach & CPV */}
                    <div className="flex gap-4">
                      <div className="glass-effect rounded-xl px-4 py-2 flex-1">
                        <div className="text-xs text-gray-500 mb-1">Elérés</div>
                        <div className="text-lg font-bold gradient-text">
                          {formatReach(pkg.totalReach)}
                        </div>
                      </div>
                      <div className="glass-effect rounded-xl px-4 py-2 flex-1">
                        <div className="text-xs text-gray-500 mb-1">CPV</div>
                        <div className="text-lg font-bold text-white">
                          {cpv.toFixed(2)} Ft
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature) => (
                      <div key={feature.id} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-bazu-orange"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">
                            {feature.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`text-center py-3 rounded-xl font-bold transition-all ${
                    isAffordable
                      ? 'bg-white/5 hover:bg-white/10 text-white'
                      : isNextAboveBudget
                      ? 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400'
                      : 'bg-white/5 text-gray-600'
                  }`}>
                    {isAffordable
                      ? 'Csomag kiválasztása →'
                      : isNextAboveBudget
                      ? 'Mégis ezt válaszom 💪'
                      : 'Költségkeret alatt'}
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
