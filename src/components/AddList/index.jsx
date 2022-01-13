import React, { useState, useEffect } from "react";
import addSvg from "../../assets/img/add.svg";
import List from "../List";
import Badge from "../Badge";

import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";
import axios from "axios";

const AddList = ({ colors, onAdd }) => {
  const [visiablePopup, setVisiablePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiablePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return;
    }
    axios.post();

    const color = colors.filter((c) => c.id === selectedColor)[0].name;
    onAdd({
      id: Math.random(),
      name: inputValue,
      color: color,
    });
    onClose();
  };
  return (
    <div className="add-list">
      <List
        onClick={() => setVisiablePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: <img src={addSvg} alt="add-icon" />,
            name: "Добавить список",
          },
        ]}
      />
      {visiablePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="close Button"
            className="add-list__popup-close-btn"
          ></img>
          <input
            type="text"
            placeholder="Название списка"
            className="field"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
