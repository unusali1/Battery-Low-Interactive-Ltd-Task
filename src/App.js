import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    client: '',
    contractor: '',
  });

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  return (
    <div className="App">
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 formData={formData} />}
    </div>
  );
}

export default App;
