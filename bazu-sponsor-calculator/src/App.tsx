import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GoalsScreen } from './components/GoalsScreen';
import { PackagesScreen } from './components/PackagesScreen';
import { BuilderScreen } from './components/BuilderScreen';
import type { SponsorshipGoal, Package } from './types';

type Step = 'welcome' | 'goals' | 'packages' | 'builder' | 'summary';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [, setSelectedGoals] = useState<SponsorshipGoal | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [finalPackage, setFinalPackage] = useState<Package | null>(null);

  const handleBudgetSelected = (budget: number) => {
    setSelectedBudget(budget);
    setCurrentStep('goals');
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
    console.log('Final package:', customPkg);
  };

  return (
    <div className="min-h-screen bg-bazu-dark">
      {currentStep === 'welcome' && (
        <WelcomeScreen onContinue={handleBudgetSelected} />
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

      {/* TODO: Add summary screen */}
      {currentStep === 'summary' && finalPackage && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Összegzés</h2>
            <p className="text-gray-400">Végleges csomag: {finalPackage.name}</p>
            <p className="text-gray-400">Ár: {finalPackage.price.toLocaleString('hu-HU')} Ft</p>
            <p className="text-gray-500 mt-4">PDF export hamarosan...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
