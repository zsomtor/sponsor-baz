import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GoalsScreen } from './components/GoalsScreen';
import { PackagesScreen } from './components/PackagesScreen';
import type { SponsorshipGoal, Package } from './types';

type Step = 'welcome' | 'goals' | 'packages' | 'builder' | 'summary';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [, setSelectedGoals] = useState<SponsorshipGoal | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

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
    console.log('Package selected:', pkg);
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

      {/* TODO: Add builder and summary screens */}
      {currentStep === 'builder' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Csomag személyre szabása</h2>
            <p className="text-gray-400">Kiválasztott csomag: {selectedPackage?.name}</p>
            <p className="text-gray-500 mt-4">Hamarosan...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
