enum ColumnType {
  Todo,
  InProgress,
  Done,
}

export function ChallengeComponent() {
  const allColumnTypes = [
    ColumnType.Todo,
    ColumnType.InProgress,
    ColumnType.Done,
  ];
  return (
    <>
      {allColumnTypes.map((columnType) => (
        <Column columnType={columnType} key={columnType} />
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
