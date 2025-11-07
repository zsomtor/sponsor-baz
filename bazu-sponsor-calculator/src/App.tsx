import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GoalsScreen } from './components/GoalsScreen';
import { PackagesScreen } from './components/PackagesScreen';
import { BuilderScreen } from './components/BuilderScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { FeatureSelectionScreen } from './components/FeatureSelectionScreen';
import { QuoteScreen } from './components/QuoteScreen';
import type { SponsorshipGoal, Package, PackageFeature } from './types';

type Step = 'welcome' | 'goals' | 'packages' | 'builder' | 'summary' | 'feature-selection' | 'quote';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [, setSelectedGoals] = useState<SponsorshipGoal | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [finalPackage, setFinalPackage] = useState<Package | null>(null);
  const [customSelectedFeatures, setCustomSelectedFeatures] = useState<PackageFeature[]>([]);

  const handleBudgetSelected = (budget: number) => {
    setSelectedBudget(budget);
    setCurrentStep('goals');
  };

  const handleSkipToBuilder = () => {
    // Skip to feature selection (no budget, no prices shown)
    setCurrentStep('feature-selection');
  };

  const handleGoalsSelected = (goals: SponsorshipGoal) => {
    setSelectedGoals(goals);
    setCurrentStep('packages');
  };

  const handlePackageSelected = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentStep('builder');
  };

  const handlePackageCustomized = (customPkg: Package) => {
    setFinalPackage(customPkg);
    setCurrentStep('summary');
  };

  const handleStartOver = () => {
    setCurrentStep('welcome');
    setSelectedBudget(0);
    setSelectedGoals(null);
    setSelectedPackage(null);
    setFinalPackage(null);
    setCustomSelectedFeatures([]);
  };

  const handleFeaturesSelected = (features: PackageFeature[]) => {
    setCustomSelectedFeatures(features);
    setCurrentStep('quote');
  };

  const handleBackToFeatureSelection = () => {
    setCurrentStep('feature-selection');
  };

  return (
    <div className="min-h-screen bg-bazu-dark">
      {currentStep === 'welcome' && (
        <WelcomeScreen
          onContinue={handleBudgetSelected}
          onSkipToBuilder={handleSkipToBuilder}
        />
      )}

      {currentStep === 'goals' && (
        <GoalsScreen
          budget={selectedBudget}
          onContinue={handleGoalsSelected}
          onBack={() => setCurrentStep('welcome')}
        />
      )}

      {currentStep === 'packages' && (
        <PackagesScreen
          budget={selectedBudget}
          onSelectPackage={handlePackageSelected}
          onBack={() => setCurrentStep('goals')}
        />
      )}

      {currentStep === 'builder' && selectedPackage && (
        <BuilderScreen
          basePackage={selectedPackage}
          budget={selectedBudget}
          onContinue={handlePackageCustomized}
          onBack={() => setCurrentStep('packages')}
        />
      )}

      {currentStep === 'summary' && finalPackage && (
        <SummaryScreen
          finalPackage={finalPackage}
          budget={selectedBudget}
          onStartOver={handleStartOver}
        />
      )}

      {currentStep === 'feature-selection' && (
        <FeatureSelectionScreen
          onContinue={handleFeaturesSelected}
          onBack={() => setCurrentStep('welcome')}
        />
      )}

      {currentStep === 'quote' && customSelectedFeatures.length > 0 && (
        <QuoteScreen
          selectedFeatures={customSelectedFeatures}
          onStartOver={handleStartOver}
          onBack={handleBackToFeatureSelection}
        />
      )}
    </div>
  );
}

export default App;
