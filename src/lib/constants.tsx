export enum ColumnType {
  Todo,       // 0
  InProgress, // 1
  Done,       // 2
}

export type Item = {
  id: number; // for now, id is timestamp `+new Date()`
  content: string;
};

export const AllColumnTypes = [
  ColumnType.Todo,
  ColumnType.InProgress,
  ColumnType.Done,
];
