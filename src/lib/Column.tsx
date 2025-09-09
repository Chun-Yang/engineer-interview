import { AllColumnTypes, ColumnType, Item } from "./constants";

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
            <button
              type="button"
              disabled={columnType == ColumnType.Todo}
              className="disabled:bg-gray-300 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => handleMoveWithDirection(item, -1)}
            >
              ←
            </button>
            {item.content}
            <button
              type="button"
              disabled={columnType == ColumnType.Done}
              className="disabled:bg-gray-300 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => handleMoveWithDirection(item, 1)}
            >
              →
            </button>
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
