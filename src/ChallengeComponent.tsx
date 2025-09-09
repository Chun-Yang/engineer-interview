import { useState } from "react";

enum ColumnType {
  Todo, // 0
  InProgress, // 1
  Done, // 2
}

type Item = {
  id: number; // for now, id is timestamp `+new Date()`
  content: string;
};

const AllColumnTypes = [
    ColumnType.Todo,
    ColumnType.InProgress,
    ColumnType.Done,
];

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

function Column({
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

function AddTask({ onAdd }: { onAdd: (content: string) => void }) {
  const [content, setContent] = useState<string>("");
  return (
    <div style={{ display: "flex" }}>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Add Task"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          const trimedContent = content.trim();
          if (content == "") {
            window.alert("Task content can not be empty");
          } else {
            onAdd(content);
            setContent("");
          }
        }}
      >
        +
      </button>
    </div>
  );
}
