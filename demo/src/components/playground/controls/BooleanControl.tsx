interface BooleanControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}

export function BooleanControl({ label, value, onChange, description }: BooleanControlProps) {
  return (
    <div className="control-item">
      <div className="flex items-center justify-between">
        <div>
          <label className="control-label">{label}</label>
          {description && <p className="control-description">{description}</p>}
        </div>
        <button
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            value ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          role="switch"
          aria-checked={value}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
