import { useState } from 'react';

enum ColumnType {
  Todo,       // 0
  InProgress, // 1
  Done,       // 2
}

type Item = {
  id: number, // for now, id is timestamp `+new Date()`
  content: string,
}

export function ChallengeComponent() {
  const [itemsByColumn, setItemsByColumn] = useState({
    [ColumnType.Todo]: [],
    [ColumnType.InProgress]: [],
    [ColumnType.Done]: [],
  })
  const allColumnTypes = [
    ColumnType.Todo,
    ColumnType.InProgress,
    ColumnType.Done,
  ];

  function handleMove(item: Item, columTypeFrom: ColumnType, columTypeTo: ColumnType ) {
    setItemsByColumn({
      ...itemsByColumn,
      [columTypeFrom]: itemsByColumn[columTypeFrom].filter(i => i.id != item.id),
      [columTypeTo]: itemsByColumn[columTypeTo].concat([item]),
    });
  }

  return (
    <>
      {allColumnTypes.map((columnType) => (
        <Column columnType={columnType} key={columnType} onMove={handleMove} />
      ))}
      <AddTask />
    </>
  );
}

// TODO
function Column(columnType: ColumnType) {
  return <></>;
}

// TODO
function AddTask() {
  return <></>;
}
