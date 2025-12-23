interface TextControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

export function TextControl({ label, value, onChange, description }: TextControlProps) {
  return (
    <div className="control-item">
      <label className="control-label">{label}</label>
      {description && <p className="control-description">{description}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
