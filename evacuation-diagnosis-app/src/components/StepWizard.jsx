import React from 'react';
import { questions, iconMap } from '../data/questions';

export default function StepWizard({ currentStep, onSelect, selections }) {
  const question = questions[currentStep];

  return (
    <div className="step-wizard glass-card">
      <div className="step-indicator">
        Step {currentStep + 1} of {questions.length}
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <h2 className="question-title">{question.title}</h2>
      <p className="question-description">{question.description}</p>

      <div className="options-container">
        {question.options.map((option) => {
          const IconComponent = iconMap[option.icon];
          const isSelected = selections[currentStep] === option.id;
          
          return (
            <button
              key={option.id}
              className={`option-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(currentStep, option.id)}
            >
              <div className="option-icon-wrapper">
                {IconComponent && <IconComponent className="option-icon" />}
              </div>
              <div className="option-content">
                <h3 className="option-label">{option.label}</h3>
                <p className="option-detail">{option.detail}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
