import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center">
            {icon && <i className={`${icon} text-rose mr-2 text-sm`}></i>}
            {label}
            {props.required && <span className="text-rose ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 border-2 ${
            error ? 'border-red-500' : 'border-gray-200'
          } rounded-lg focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition-all duration-200 text-sm ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <i className="fas fa-exclamation-circle mr-1"></i>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
