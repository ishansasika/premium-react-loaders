interface TextControlProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  description?: string;
}

export function TextControl({ label, value, onChange, description }: TextControlProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Try to parse as number if it looks like a number
    const numValue = Number(newValue);
    if (!isNaN(numValue) && newValue !== '') {
      onChange(numValue);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="control-item">
      <label className="control-label">{label}</label>
      {description && <p className="control-description">{description}</p>}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g. 200 or '100%'"
      />
    </div>
  );
}
