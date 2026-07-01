import { useState } from 'react';
import './App.css';
import StepWizard from './components/StepWizard';
import ResultReport from './components/ResultReport';
import { questions } from './data/questions';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (stepIndex, optionId) => {
    const newSelections = [...selections];
    newSelections[stepIndex] = optionId;
    setSelections(newSelections);

    setTimeout(() => {
      if (stepIndex < questions.length - 1) {
        setCurrentStep(stepIndex + 1);
      } else {
        setIsFinished(true);
      }
    }, 400); // Small delay for smooth transition and showing selection
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelections([]);
    setIsFinished(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <img src="/ICUH_LOGO.png" alt="ICUH Logo" className="logo" />
          <h1>요양병원시설 대피체계 진단</h1>
        </div>
      </header>

      <main className="main-content">
        {!isFinished ? (
          <StepWizard 
            currentStep={currentStep} 
            onSelect={handleSelect} 
            selections={selections}
          />
        ) : (
          <ResultReport 
            selections={selections}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>요양병원 맞춤형 화재 대피 및 생존 매뉴얼 도출 시스템</p>
      </footer>
    </div>
  );
}

export default App;
