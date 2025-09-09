import {AllColumnTypes, ColumnType, Item} from './constants';

export function Column({
  columnType,
  onMove,
  items,
}: {
  columnType: ColumnType;
  onMove: (
    item: Item,
    columTypeFrom: ColumnType,
    columTypeTo: ColumnType,
  ) => void;
  items: Item[];
}) {
  function handleMoveWithDirection(item: Item, direction: -1 | 1) {
    const columTypeTo = columnType + direction;
    if (!AllColumnTypes.includes(columTypeTo)) {
      throw new Error(`Invalid column type: ${columTypeTo}`);
    }
    onMove(item, columnType, columTypeTo);
  }
  return (
    <div
      style={{
        border: "2px solid black",
        width: "100%",
        minHeight: "200px",
      }}
    >
      <h2 style={{ width: "100%", textAlign: "center" }}>
        {getTitleForColumn(columnType)}
      </h2>
      {items.map((item) => {
        return (
          <div
            style={{
              width: "100%",
              padding: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={item.id}
          >
            <button onClick={() => handleMoveWithDirection(item, -1)}>←</button>
            {item.content}
            <button onClick={() => handleMoveWithDirection(item, 1)}>→</button>
          </div>
        );
      })}
    </div>
  );
}

function getTitleForColumn(columnType: ColumnType) {
  switch (columnType) {
    case ColumnType.Todo:
      return "To Do";
    case ColumnType.InProgress:
      return "In Progress";
    case ColumnType.Done:
      return "Done";
  }
}

