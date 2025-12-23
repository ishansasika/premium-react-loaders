import { ControlConfig } from '../../../types';

interface RangeControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  config: ControlConfig;
}

export function RangeControl({ label, value, onChange, description, config }: RangeControlProps) {
  const { min = 0, max = 100, step = 1 } = config;

  return (
    <div className="control-item">
      <div className="flex justify-between items-center">
        <label className="control-label">{label}</label>
        <span className="text-sm text-gray-600 font-mono">{value}</span>
      </div>
      {description && <p className="control-description">{description}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
