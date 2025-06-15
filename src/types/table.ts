export type Column<T> = {
  key: keyof T | string;
  label: string;
};
