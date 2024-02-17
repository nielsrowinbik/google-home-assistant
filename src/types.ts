type ValuesOf<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export const allowedColors = [
  'blue',
  'cyan',
  'dark-green',
  'green',
  'indigo',
  'purple',
  'red',
  'yellow',
  'none',
] as const;

export type Color = ValuesOf<typeof allowedColors>;
