import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: 'tsx' | 'jsx' | 'typescript' | 'javascript' | 'bash';
  showLineNumbers?: boolean;
  fileName?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = false,
  fileName,
}: CodeBlockProps) {
  return (
    <div className="code-block rounded-lg overflow-hidden bg-gray-900">
      {fileName && (
        <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-mono border-b border-gray-700">
          {fileName}
        </div>
      )}
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-x-auto text-sm`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {showLineNumbers && (
                  <span className="inline-block w-8 text-gray-500 select-none">{i + 1}</span>
                )}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
