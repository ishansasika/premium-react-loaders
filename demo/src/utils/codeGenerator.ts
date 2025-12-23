/**
 * Generate JSX code from component name and props
 */
export function generateComponentCode(
  componentName: string,
  props: Record<string, any>
): string {
  const propEntries = Object.entries(props)
    .filter(([, value]) => {
      // Filter out undefined, null, and default values that don't need to be shown
      if (value === undefined || value === null) return false;
      return true;
    })
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      } else if (typeof value === 'number') {
        return `${key}={${value}}`;
      } else if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`;
      } else {
        return `${key}={${JSON.stringify(value)}}`;
      }
    });

  const propsString = propEntries.length > 0 ? ' ' + propEntries.join(' ') : '';

  return `<${componentName}${propsString} />`;
}

/**
 * Generate import statement for components
 */
export function generateImportStatement(
  components: string[],
  source: string = 'premium-react-loaders'
): string {
  return `import { ${components.join(', ')} } from '${source}';`;
}

/**
 * Generate a full example with import and component usage
 */
export function generateFullExample(
  componentName: string,
  props: Record<string, any>
): string {
  const importStatement = generateImportStatement([componentName]);
  const componentCode = generateComponentCode(componentName, props);

  return `${importStatement}

function App() {
  return (
    ${componentCode}
  );
}`;
}

/**
 * Format prop value for display
 */
export function formatPropValue(value: any): string {
  if (typeof value === 'string') {
    return `"${value}"`;
  } else if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  } else if (Array.isArray(value)) {
    return `[${value.map(formatPropValue).join(', ')}]`;
  } else if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value);
  }
  return String(value);
}
