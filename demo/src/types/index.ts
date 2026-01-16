import { ComponentType } from 'react';

export type ComponentCategory = 'skeleton' | 'spinner' | 'progress' | 'pulse' | 'overlay' | 'button' | 'status' | 'transition' | 'shimmer' | 'orbit' | 'bounce' | 'infinity' | 'text';

export type ControlType = 'number' | 'color' | 'select' | 'boolean' | 'range' | 'text';

export interface ControlConfig {
  type: ControlType;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

export interface PropDefinition {
  name: string;
  type: string;
  control: ControlConfig;
  description: string;
  defaultValue?: any;
}

export interface Example {
  name: string;
  props: Record<string, any>;
}

export interface ComponentMetadata {
  id: string;
  name: string;
  category: ComponentCategory;
  component: ComponentType<any>;
  description: string;
  defaultProps: Record<string, any>;
  propDefinitions: PropDefinition[];
  examples: Example[];
  importPath: string;
}

export type Theme = 'light' | 'dark' | 'gray';

export interface CodeExample {
  title: string;
  code: string;
  language: 'tsx' | 'jsx' | 'bash';
}
