import { useState, useMemo } from 'react';
import { ComponentMetadata } from '../../types';
import { RangeControl } from './controls/RangeControl';
import { NumberControl } from './controls/NumberControl';
import { ColorControl } from './controls/ColorControl';
import { SelectControl } from './controls/SelectControl';
import { BooleanControl } from './controls/BooleanControl';
import { TextControl } from './controls/TextControl';
import { CodeBlock } from '../common/CodeBlock';
import { ThemeSwitch } from '../common/ThemeSwitch';
import { useTheme, THEME_COLORS } from '../../contexts/ThemeContext';
import { generateComponentCode, generateImportStatement } from '../../utils/codeGenerator';
import { SpinnerCircle } from '@lib/components';

interface ComponentPlaygroundProps {
  metadata: ComponentMetadata;
}

export function ComponentPlayground({ metadata }: ComponentPlaygroundProps) {
  const { theme } = useTheme();
  const [props, setProps] = useState<Record<string, any>>(metadata.defaultProps);

  const updateProp = (name: string, value: any) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  const ComponentToRender = metadata.component;

  const generatedCode = useMemo(() => {
    const importStatement = generateImportStatement([metadata.name]);
    const componentCode = generateComponentCode(metadata.name, props);

    return `${importStatement}

function App() {
  return (
    ${componentCode}
  );
}`;
  }, [metadata.name, props]);

  return (
    <div className="flex flex-col gap-6">
      {/* Component Info */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{metadata.name}</h2>
        <p className="text-gray-600">{metadata.description}</p>
      </div>

      {/* Preview Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Preview</h3>
          <ThemeSwitch />
        </div>
        <div
          className="preview-area"
          style={{ backgroundColor: THEME_COLORS[theme] }}
        >
          {metadata.id === 'loader-overlay' ? (
            <ComponentToRender
              {...props}
              loader={props.loader || <SpinnerCircle size={40} color="#3b82f6" />}
            >
              <div className="p-12 text-center text-gray-500 font-medium">
                Your content here
              </div>
            </ComponentToRender>
          ) : (
            <ComponentToRender {...props} />
          )}
        </div>
      </div>

      {/* Controls */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Properties</h3>
        <div className="control-panel">
          {metadata.propDefinitions.map((propDef) => {
            const value = props[propDef.name] ?? propDef.defaultValue;

            switch (propDef.control.type) {
              case 'range':
                return (
                  <RangeControl
                    key={propDef.name}
                    label={propDef.name}
                    value={value}
                    onChange={(v) => updateProp(propDef.name, v)}
                    description={propDef.description}
                    config={propDef.control}
                  />
                );

              case 'number':
                return (
                  <NumberControl
                    key={propDef.name}
                    label={propDef.name}
                    value={value}
                    onChange={(v) => updateProp(propDef.name, v)}
                    description={propDef.description}
                    config={propDef.control}
                  />
                );

              case 'color':
                return (
                  <ColorControl
                    key={propDef.name}
                    label={propDef.name}
                    value={value}
                    onChange={(v) => updateProp(propDef.name, v)}
                    description={propDef.description}
                  />
                );

              case 'select':
                return (
                  <SelectControl
                    key={propDef.name}
                    label={propDef.name}
                    value={value}
                    onChange={(v) => updateProp(propDef.name, v)}
                    description={propDef.description}
                    config={propDef.control}
                  />
                );

              case 'boolean':
                return (
                  <BooleanControl
                    key={propDef.name}
                    label={propDef.name}
                    value={value}
                    onChange={(v) => updateProp(propDef.name, v)}
                    description={propDef.description}
                  />
                );

              case 'text':
                return (
                  <TextControl
                    key={propDef.name}
                    label={propDef.name}
                    value={value}
                    onChange={(v) => updateProp(propDef.name, v)}
                    description={propDef.description}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      </div>

      {/* Code */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-2">Code</h3>
        <CodeBlock code={generatedCode} language="tsx" />
      </div>

      {/* Examples */}
      {metadata.examples.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {metadata.examples.map((example) => (
              <button
                key={example.name}
                onClick={() => setProps({ ...metadata.defaultProps, ...example.props })}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="font-medium text-sm mb-2">{example.name}</div>
                <div className="flex items-center justify-center p-3 bg-gray-100 rounded relative">
                  {metadata.id === 'loader-overlay' ? (
                    <ComponentToRender
                      {...metadata.defaultProps}
                      {...example.props}
                      loading={true}
                      position="absolute"
                      loader={<SpinnerCircle size={32} color="#3b82f6" />}
                    >
                      <div className="p-6 text-center text-gray-500 text-sm">
                        Content
                      </div>
                    </ComponentToRender>
                  ) : (
                    <ComponentToRender {...metadata.defaultProps} {...example.props} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
