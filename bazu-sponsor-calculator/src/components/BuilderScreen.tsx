import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Package, PackageFeature } from '../types';
import { getAdditionalFeaturesForBudget } from '../data/packages';

interface BuilderScreenProps {
  basePackage: Package;
  budget: number;
  onContinue: (customPackage: Package) => void;
  onBack: () => void;
}

export const BuilderScreen = ({ basePackage, budget, onContinue, onBack }: BuilderScreenProps) => {
  const [features, setFeatures] = useState<PackageFeature[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalReach, setTotalReach] = useState(0);

  // Initialize features from base package
  useEffect(() => {
    const dynamicAdditionalFeatures = getAdditionalFeaturesForBudget(budget);
    const allFeatures = [
      ...basePackage.features.map(f => ({ ...f })),
      ...dynamicAdditionalFeatures.map(f => ({ ...f })),
    ];
    setFeatures(allFeatures);
  }, [basePackage, budget]);

  // Calculate totals whenever features change
  useEffect(() => {
    const price = features
      .filter(f => f.included)
      .reduce((sum, f) => sum + f.price, 0);

    const reach = features
      .filter(f => f.included && f.reach)
      .reduce((sum, f) => sum + (f.reach || 0), 0);

    setTotalPrice(price);
    setTotalReach(reach);
  }, [features]);

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

  const toggleFeature = (featureId: string) => {
    setFeatures(prev =>
      prev.map(f =>
        f.id === featureId ? { ...f, included: !f.included } : f
      )
    );
  };

  const handleContinue = () => {
    const customPackage: Package = {
      ...basePackage,
      id: 'custom',
      name: `${basePackage.name} (Testreszabott)`,
      price: totalPrice,
      features: features.filter(f => f.included),
      totalReach: totalReach,
    };
    onContinue(customPackage);
  };

  const isOverBudget = totalPrice > budget;
  const budgetRemaining = budget - totalPrice;
  const cpv = totalReach > 0 ? totalPrice / totalReach : 0;

  // Separate base and additional features
  const baseFeatures = features.filter(f =>
    basePackage.features.some(bf => bf.id === f.id)
  );
  const extraFeatures = features.filter(f =>
    !basePackage.features.some(bf => bf.id === f.id)
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(230, 57, 70, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.15) 0%, transparent 50%)',
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Feature Toggles */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                onClick={onBack}
                className="inline-flex items-center gap-2 glass-effect rounded-2xl px-6 py-3 mb-6 hover:border-white/30 transition-all"
              >
                <span>←</span>
                <span className="text-sm font-semibold text-gray-400">
                  Vissza a csomagokhoz
                </span>
              </motion.button>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-black mb-2"
              >
                <span className="gradient-text">Szabd személyre</span> a csomagod
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-gray-400"
              >
                {basePackage.name} csomag - kapcsold be/ki a funkciókat
              </motion.p>
            </div>

            {/* Base Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3"
            >
              <h3 className="text-xl font-bold text-white mb-4">Alapfunkciók</h3>
              {baseFeatures.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  onClick={() => toggleFeature(feature.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    feature.included
                      ? 'bg-gradient-to-br from-bazu-orange/20 to-bazu-red/20 border-2 border-bazu-orange'
                      : 'glass-effect opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Toggle */}
                      <div className={`relative w-12 h-7 rounded-full transition-colors ${
                        feature.included ? 'bg-gradient-to-r from-bazu-orange to-bazu-red' : 'bg-gray-700'
                      }`}>
                        <motion.div
                          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
                          animate={{ x: feature.included ? 20 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${feature.included ? 'gradient-text' : 'text-gray-500'}`}>
                          {feature.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">{feature.description}</p>
                        {feature.reach && (
                          <div className="text-xs text-gray-500">
                            📊 Elérés: <span className="font-semibold">{formatReach(feature.reach)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className={`text-right ${feature.included ? 'text-white' : 'text-gray-600'}`}>
                      <div className="text-lg font-bold">
                        {formatCurrency(feature.price)} Ft
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Additional Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-3"
            >
              <h3 className="text-xl font-bold text-white mb-4">Extra funkciók ✨</h3>
              {extraFeatures.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05, duration: 0.5 }}
                  onClick={() => toggleFeature(feature.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    feature.included
                      ? 'bg-gradient-to-br from-bazu-orange/20 to-bazu-red/20 border-2 border-bazu-orange'
                      : 'glass-effect opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Toggle */}
                      <div className={`relative w-12 h-7 rounded-full transition-colors ${
                        feature.included ? 'bg-gradient-to-r from-bazu-orange to-bazu-red' : 'bg-gray-700'
                      }`}>
                        <motion.div
                          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
                          animate={{ x: feature.included ? 20 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${feature.included ? 'gradient-text' : 'text-gray-500'}`}>
                          {feature.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-2">{feature.description}</p>
                        {feature.reach && (
                          <div className="text-xs text-gray-500">
                            📊 Elérés: <span className="font-semibold">{formatReach(feature.reach)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className={`text-right ${feature.included ? 'text-white' : 'text-gray-600'}`}>
                      <div className="text-lg font-bold">
                        +{formatCurrency(feature.price)} Ft
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Right: Summary Sticky Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="sticky top-6 space-y-4"
            >
              {/* Summary Card */}
              <div className="glass-effect rounded-3xl p-8">
                <h3 className="text-2xl font-black mb-6 gradient-text">Összegzés</h3>

                {/* Metrics */}
                <div className="space-y-4 mb-6">
                  {/* Total Price */}
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Havi költség</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={totalPrice}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl font-black text-white"
                      >
                        {formatCurrency(totalPrice)} Ft
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Budget Status */}
                  <div className={`p-4 rounded-xl ${
                    isOverBudget ? 'bg-red-500/20 border border-red-500/30' : 'bg-green-500/20 border border-green-500/30'
                  }`}>
                    <div className="text-sm font-semibold mb-1">
                      {isOverBudget ? '⚠️ Költségkeret túllépve' : '✅ Költségkeret alatt'}
                    </div>
                    <div className={`text-lg font-bold ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
                      {isOverBudget ? '-' : '+'}{formatCurrency(Math.abs(budgetRemaining))} Ft
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 my-4" />

                  {/* Total Reach */}
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Teljes elérés</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={totalReach}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-black gradient-text"
                      >
                        {formatReach(totalReach)}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* CPV */}
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Cost per view (CPV)</div>
                    <div className="text-xl font-bold text-white">
                      {cpv.toFixed(2)} Ft
                    </div>
                  </div>

                  {/* Active Features Count */}
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Aktív funkciók</div>
                    <div className="text-xl font-bold text-white">
                      {features.filter(f => f.included).length} funkció
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  className="w-full py-4 px-6 bg-gradient-to-r from-bazu-orange to-bazu-red rounded-2xl font-bold text-white shadow-2xl shadow-bazu-orange/30 hover:shadow-bazu-orange/50 transition-shadow duration-300"
                >
                  Tovább az összegzéshez →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
