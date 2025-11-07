import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';

function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'goals' | 'packages' | 'summary'>('welcome');
  const [selectedBudget, setSelectedBudget] = useState(0);

  const handleBudgetSelected = (budget: number) => {
    setSelectedBudget(budget);
    setCurrentStep('goals');
    console.log('Budget selected:', budget);
  };

  return (
    <div className="min-h-screen bg-bazu-dark">
      {currentStep === 'welcome' && (
        <WelcomeScreen onContinue={handleBudgetSelected} />
      )}

      {/* TODO: Add other screens */}
      {currentStep === 'goals' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Célok kiválasztása</h2>
            <p className="text-gray-400">Kiválasztott költségkeret: {selectedBudget.toLocaleString('hu-HU')} Ft</p>
            <p className="text-gray-500 mt-4">Hamarosan...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
