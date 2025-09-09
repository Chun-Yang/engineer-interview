import { useState } from "react";
import {AllColumnTypes, ColumnType, Item} from './lib/constants';
import {Column} from './lib/Column';
import {AddTask} from './lib/AddTask';

export function ChallengeComponent() {
  const [itemsByColumn, setItemsByColumn] = useState({
    [ColumnType.Todo]: [],
    [ColumnType.InProgress]: [],
    [ColumnType.Done]: [],
  });

  function handleAdd(content) {
    const newItem: Item = {
      id: +new Date(),
      content,
    };
    setItemsByColumn({
      ...itemsByColumn,
      [ColumnType.Todo]: itemsByColumn[ColumnType.Todo].concat([newItem]),
    });
  }

  function handleMove(
    item: Item,
    columTypeFrom: ColumnType,
    columTypeTo: ColumnType,
  ) {
    setItemsByColumn({
      ...itemsByColumn,
      [columTypeFrom]: itemsByColumn[columTypeFrom].filter(
        (i) => i.id != item.id,
      ),
      [columTypeTo]: itemsByColumn[columTypeTo].concat([item]),
    });
  }

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <div style={{ display: "flex" }}>
        {AllColumnTypes.map((columnType) => (
          <Column
            key={columnType}
            columnType={columnType}
            onMove={handleMove}
            items={itemsByColumn[columnType]}
          />
        ))}
      </div>
      <AddTask onAdd={handleAdd} />
    </div>
  );
}
