import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PackageFeature } from '../types';
import { basePackages, additionalFeatures } from '../data/packages';

interface FeatureSelectionScreenProps {
  onContinue: (selectedFeatures: PackageFeature[]) => void;
  onBack: () => void;
}

export const FeatureSelectionScreen = ({ onContinue, onBack }: FeatureSelectionScreenProps) => {
  const [features, setFeatures] = useState<PackageFeature[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  // Initialize all features (base + additional) at base prices
  useEffect(() => {
    // Get all features from all base packages
    const allBaseFeatures = basePackages.flatMap(pkg =>
      pkg.features.map(f => ({ ...f, included: false }))
    );

    // Remove duplicates by id (in case same feature appears in multiple packages)
    const uniqueBaseFeatures = Array.from(
      new Map(allBaseFeatures.map(f => [f.id, f])).values()
    );

    // Combine with additional features
    const allFeatures = [
      ...uniqueBaseFeatures,
      ...additionalFeatures.map(f => ({ ...f, included: false })),
    ];

    setFeatures(allFeatures);
  }, []);

  // Update selected count whenever features change
  useEffect(() => {
    setSelectedCount(features.filter(f => f.included).length);
  }, [features]);

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
    const selectedFeatures = features.filter(f => f.included);
    onContinue(selectedFeatures);
  };

  // Separate features into categories for better UX
  const podcastFeatures = features.filter(f =>
    f.id.includes('podcast') || f.id.includes('sponsor-slot') || f.id.includes('endroll')
  );
  const socialMediaFeatures = features.filter(f =>
    f.id.includes('instagram') || f.id.includes('tiktok') || f.id.includes('youtube')
  );
  const otherFeatures = features.filter(f =>
    !podcastFeatures.some(pf => pf.id === f.id) &&
    !socialMediaFeatures.some(sf => sf.id === f.id)
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
          {/* Left: Feature Selection */}
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
                  Vissza a kezdőlapra
                </span>
              </motion.button>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-black mb-2"
              >
                <span className="gradient-text">Válaszd ki</span> a szolgáltatásokat
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-gray-400"
              >
                Állítsd össze az egyedi csomagod - kattints a szolgáltatásokra
              </motion.p>
            </div>

            {/* Podcast Features */}
            {podcastFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-bold text-white mb-4">🎙️ Podcast szolgáltatások</h3>
                {podcastFeatures.map((feature, index) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    index={index}
                    onToggle={toggleFeature}
                    formatReach={formatReach}
                  />
                ))}
              </motion.div>
            )}

            {/* Social Media Features */}
            {socialMediaFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-bold text-white mb-4">📱 Social media</h3>
                {socialMediaFeatures.map((feature, index) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    index={index}
                    onToggle={toggleFeature}
                    formatReach={formatReach}
                  />
                ))}
              </motion.div>
            )}

            {/* Other Features */}
            {otherFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-bold text-white mb-4">✨ További szolgáltatások</h3>
                {otherFeatures.map((feature, index) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    index={index}
                    onToggle={toggleFeature}
                    formatReach={formatReach}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Right: Summary Sticky Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="sticky top-6"
            >
              {/* Summary Card */}
              <div className="glass-effect rounded-3xl p-8">
                <h3 className="text-2xl font-black mb-6 gradient-text">Összegzés</h3>

                {/* Selected Count */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Kiválasztott funkciók</div>
                  <div className="text-5xl font-black text-white">
                    {selectedCount}
                  </div>
                </div>

                {/* Info Message */}
                <div className="p-4 rounded-xl bg-bazu-orange/10 border border-bazu-orange/30 mb-6">
                  <div className="text-sm text-gray-300">
                    💡 Az árajánlatot a kiválasztás után kapod meg
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleContinue}
                  disabled={selectedCount === 0}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 ${
                    selectedCount > 0
                      ? 'bg-gradient-to-r from-bazu-orange to-bazu-red shadow-2xl shadow-bazu-orange/30 hover:shadow-bazu-orange/50'
                      : 'bg-gray-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  {selectedCount > 0 ? 'Árajánlat kérése →' : 'Válassz legalább 1 funkciót'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Feature Card Component (without price)
interface FeatureCardProps {
  feature: PackageFeature;
  index: number;
  onToggle: (id: string) => void;
  formatReach: (reach: number) => string;
}

const FeatureCard = ({ feature, index, onToggle, formatReach }: FeatureCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
      onClick={() => onToggle(feature.id)}
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

        {/* Checkmark instead of price */}
        <div className={`text-right ${feature.included ? 'text-bazu-orange' : 'text-gray-600'}`}>
          {feature.included && (
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
      </div>
    </motion.button>
  );
};
