import React, { useState, useEffect } from "react";
import listSvg from "./assets/img/list.svg";
import { List, AddList, Tasks } from "./components";
import axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3030/lists?_expand=color").then(({ data }) => {
      setLists(data);
    });
    axios.get("http://localhost:3030/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    const newLists = [...lists, obj];
    setLists(newLists);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: <img src={listSvg} alt="list-icon" />,
              name: "Все задачи",
            },
          ]}
        />
        {lists ? (
          <List
            items={lists}
            isRemovable={true}
            onRemove={(id) => {
              const newLists = lists.filter((item) => item.id !== id);
              setLists(newLists);
            }}
          />
        ) : (
          "Загрузка..."
        )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
