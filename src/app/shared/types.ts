export interface Model {
  code: string;
  description: string;
  colors?: Color[] | null;
}
export interface Color {
  code: string;
  description: string;
  price: number;
}
export interface Configuration {
  configs?: Configs[] | null;
  towHitch: boolean;
  yoke: boolean;
}
export interface Configs {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}

export interface Data {
  selectedModel: Model | null;
  selectedColor: Color | null;
  selectedConfiguration: Configs | null;
  towHitch: boolean | null;
  yoke: boolean | null;
}
