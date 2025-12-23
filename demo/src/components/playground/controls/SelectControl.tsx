import { ControlConfig } from '../../../types';

interface SelectControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  config: ControlConfig;
}

export function SelectControl({ label, value, onChange, description, config }: SelectControlProps) {
  const { options = [] } = config;

  return (
    <div className="control-item">
      <label className="control-label">{label}</label>
      {description && <p className="control-description">{description}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
