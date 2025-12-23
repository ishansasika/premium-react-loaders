import { ControlConfig } from '../../../types';

interface NumberControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  config: ControlConfig;
}

export function NumberControl({ label, value, onChange, description, config }: NumberControlProps) {
  const { min, max, step = 1 } = config;

  return (
    <div className="control-item">
      <label className="control-label">{label}</label>
      {description && <p className="control-description">{description}</p>}
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
