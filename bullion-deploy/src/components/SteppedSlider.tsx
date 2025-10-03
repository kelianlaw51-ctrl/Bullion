"use client";

import { useMemo } from 'react';

export type SliderOption = {
  label: string;
  value: string;
};

export default function SteppedSlider({
  options,
  value,
  onChange,
  name,
}: {
  options: SliderOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) {
  const selectedIndex = useMemo(() => {
    const index = options.findIndex(opt => opt.value === value);
    return index > -1 ? index : 0;
  }, [options, value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value, 10);
    onChange(options[newIndex].value);
  };

  const progressPercentage = options.length > 1 ? (selectedIndex / (options.length - 1)) * 100 : 0;

  return (
    <div className="relative w-full py-3 md:col-span-2">
      <div className="relative h-2 bg-neutral-700 rounded-full">
        <div 
          className="absolute top-0 left-0 h-2 bg-brand-teal rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 border-brand-teal cursor-pointer"
          style={{ left: `calc(${progressPercentage}% - 12px)` }}
        ></div>
        <input
          type="range"
          name={name}
          min="0"
          max={options.length - 1}
          step="1"
          value={selectedIndex}
          onChange={handleSliderChange}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-3 text-xs text-gray-400 px-1">
        {options.map((option) => (
          <span key={option.value} className="flex-1 text-center">
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}
