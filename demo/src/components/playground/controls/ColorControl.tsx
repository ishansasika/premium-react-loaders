interface ColorControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

export function ColorControl({ label, value, onChange, description }: ColorControlProps) {
  return (
    <div className="control-item">
      <label className="control-label">{label}</label>
      {description && <p className="control-description">{description}</p>}
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-16 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
