import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                index < currentStep
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : index === currentStep
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20 animate-pulse'
                  : 'border-gray-700 text-gray-500 bg-black/60'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            <span
              className={`mt-3 text-sm font-medium transition-colors duration-500 tracking-wide ${
                index <= currentStep ? 'text-white' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-6 transition-all duration-500 rounded-full ${
                index < currentStep ? 'bg-blue-500 shadow-sm shadow-blue-500/50' : 'bg-gray-700'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
