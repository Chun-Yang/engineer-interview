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

export function ChallengeComponent() {
  const [itemsByColumn, setItemsByColumn] = useState({
    [ColumnType.Todo]: [],
    [ColumnType.InProgress]: [],
    [ColumnType.Done]: [],
  });
  const allColumnTypes = [
    ColumnType.Todo,
    ColumnType.InProgress,
    ColumnType.Done,
  ];

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
    <div>
      {allColumnTypes.map((columnType) => (
        <Column key={columnType} columnType={columnType} onMove={handleMove} />
      ))}
      <AddTask />
    </div>
  );
}

// TODO
function Column({
  columnType,
  onMove,
}: {
  columnType: ColumnType;
  onMove: (
    item: Item,
    columTypeFrom: ColumnType,
    columTypeTo: ColumnType,
  ) => void;
}) {
  return <></>;
}

function AddTask({ onAdd }: { onAdd: (content: string) => void }) {
  const [content, setContent] = useState<string>("");
  return (
    <div>
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
