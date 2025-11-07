import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import type { PackageFeature } from '../types';
import { calculateCPV } from '../data/packages';

interface QuoteScreenProps {
  selectedFeatures: PackageFeature[];
  onStartOver: () => void;
  onBack: () => void;
}

export const QuoteScreen = ({ selectedFeatures, onStartOver, onBack }: QuoteScreenProps) => {
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

  // Calculate totals
  const totalPrice = selectedFeatures.reduce((sum, f) => sum + f.price, 0);
  const totalReach = selectedFeatures.reduce((sum, f) => sum + (f.reach || 0), 0);
  const cpv = calculateCPV(totalPrice, totalReach);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 30;

    // Header with Bazu branding
    doc.setFontSize(24);
    doc.setTextColor(255, 107, 53); // Bazu orange
    doc.text('BAZU', margin, yPos);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Szponzorsági Ajánlat', margin, yPos + 7);

    yPos += 25;

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('Egyedi Csomag Ajánlat', margin, yPos);

    yPos += 15;

    // Package price and details
    doc.setFontSize(28);
    doc.setTextColor(255, 107, 53);
    doc.text(`${formatCurrency(totalPrice)} Ft/hó`, margin, yPos);

    yPos += 12;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Teljes elérés: ${formatReach(totalReach)} | CPV: ${cpv.toFixed(2)} Ft`, margin, yPos);

    yPos += 20;

    // Features section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Csomag tartalom:', margin, yPos);

    yPos += 10;

    doc.setFontSize(10);
    selectedFeatures.forEach((feature) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 30;
      }

      // Checkbox
      doc.setDrawColor(255, 107, 53);
      doc.setLineWidth(0.5);
      doc.rect(margin, yPos - 3, 3, 3);
      doc.setFillColor(255, 107, 53);
      doc.rect(margin + 0.5, yPos - 2.5, 2, 2, 'F');

      // Feature name
      doc.setTextColor(0, 0, 0);
      doc.text(feature.name, margin + 6, yPos);

      // Feature price
      const priceText = `${formatCurrency(feature.price)} Ft`;
      const priceWidth = doc.getTextWidth(priceText);
      doc.text(priceText, pageWidth - margin - priceWidth, yPos);

      yPos += 5;

      // Feature description
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      const descLines = doc.splitTextToSize(feature.description, pageWidth - margin * 2 - 10);
      doc.text(descLines, margin + 6, yPos);
      yPos += descLines.length * 4 + 5;

      doc.setFontSize(10);
    });

    // Total section
    if (yPos > 230) {
      doc.addPage();
      yPos = 30;
    }

    yPos += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Összesen:', margin, yPos);
    doc.setFontSize(16);
    doc.setTextColor(255, 107, 53);
    const totalText = `${formatCurrency(totalPrice)} Ft/hó`;
    const totalWidth = doc.getTextWidth(totalText);
    doc.text(totalText, pageWidth - margin - totalWidth, yPos);

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Bazu Media | Magyarország vezető podcast és tartalom platformja', margin, footerY);
    doc.text(`Ajánlat készítve: ${new Date().toLocaleDateString('hu-HU')}`, margin, footerY + 5);

    // Save PDF
    const fileName = `Bazu_Szponzoracio_Egyedi_Csomag_${Date.now()}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 60% 40%, rgba(230, 57, 70, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255, 107, 53, 0.2) 0%, transparent 50%)',
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
        className="relative z-10 max-w-4xl w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-bazu-orange to-bazu-red rounded-full flex items-center justify-center shadow-2xl shadow-bazu-orange/50">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Az <span className="gradient-text">árajánlatod</span> kész!
          </h2>
          <p className="text-xl text-gray-400">
            Itt az egyedi csomagod részletei
          </p>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-effect rounded-3xl p-8 mb-6"
        >
          {/* Package Name */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black gradient-text mb-2">Egyedi Csomag</h3>
            <p className="text-gray-400">Személyre szabott szponzorációs ajánlat</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Price */}
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Havi költség</div>
              <div className="text-3xl font-black text-white mb-1">
                {formatCurrency(totalPrice)} Ft
              </div>
              <div className="text-sm text-green-400">
                Egyedi árazás
              </div>
            </div>

            {/* Reach */}
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Teljes elérés</div>
              <div className="text-3xl font-black gradient-text mb-1">
                {formatReach(totalReach)}
              </div>
              <div className="text-sm text-gray-400">nézettség / hó</div>
            </div>

            {/* CPV */}
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Cost per view</div>
              <div className="text-3xl font-black text-white mb-1">
                {cpv.toFixed(2)} Ft
              </div>
              <div className="text-sm text-gray-400">/ megtekintés</div>
            </div>
          </div>

          {/* Features List */}
          <div>
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="gradient-text">Tartalom</span>
              <span className="text-sm font-normal text-gray-500">
                ({selectedFeatures.length} funkció)
              </span>
            </h4>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {selectedFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }}
                  className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
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
                      <div className="font-semibold text-white mb-1">{feature.name}</div>
                      <div className="text-sm text-gray-400">{feature.description}</div>
                      {feature.reach && (
                        <div className="text-xs text-gray-500 mt-2">
                          📊 {formatReach(feature.reach)} elérés
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white whitespace-nowrap">
                      {formatCurrency(feature.price)} Ft
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="py-5 px-8 glass-effect rounded-2xl font-bold text-xl text-white hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Módosítás
          </motion.button>

          {/* Download PDF Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToPDF}
            className="py-5 px-8 bg-gradient-to-r from-bazu-orange to-bazu-red rounded-2xl font-bold text-xl text-white shadow-2xl shadow-bazu-orange/30 hover:shadow-bazu-orange/50 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            PDF Letöltése
          </motion.button>

          {/* Start Over Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartOver}
            className="py-5 px-8 glass-effect rounded-2xl font-bold text-xl text-white hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Új Ajánlat
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
