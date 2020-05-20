export type ActionTypes<T> = T extends { [key: string]: infer U }
  ? U extends (...args: any[]) => any
    ? ReturnType<U>
    : never
  : never;
