"use client";

import { useState, useRef, useEffect, useId } from 'react';

export type SegmentedControlOption = {
  label: string;
  value: string;
};

export default function SegmentedControl({
  options,
  value,
  onChange,
  name,
}: {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    const selectedOption = containerRef.current?.querySelector(`#label-${id}-${value}`);
    if (selectedOption && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const selectedRect = selectedOption.getBoundingClientRect();
      setSliderStyle({
        left: selectedRect.left - containerRect.left,
        width: selectedRect.width,
      });
    }
  }, [value, id, options]);

  return (
    <div ref={containerRef} className="relative flex items-center p-1 bg-neutral-800 rounded-lg border border-neutral-700">
      <div
        className="absolute top-1 bottom-1 bg-brand-navy rounded-md shadow-inner transition-all duration-300 ease-in-out"
        style={sliderStyle}
      ></div>
      {options.map((option) => (
        <div key={option.value} className="flex-1 z-10">
          <input
            type="radio"
            id={`${id}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <label
            id={`label-${id}-${option.value}`}
            htmlFor={`${id}-${option.value}`}
            className={`block w-full text-center text-sm font-medium p-2 rounded-md cursor-pointer transition-colors duration-300 ${value === option.value ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
