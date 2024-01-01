import React from "react";
import { useState } from "react";
import { data } from "./data.js";
import "./index.css";

function Accordian() {
  const [selected, singleSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleOnclick(getCurrentId) {
    singleSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMulti(getCurrentId) {
    let cpyMulti = [...multiple];
    const findIndexOfCurrenId = cpyMulti.indexOf(getCurrentId);

    if (findIndexOfCurrenId === -1) cpyMulti.push(getCurrentId);
    else cpyMulti.splice(findIndexOfCurrenId, 1);
    setMultiple(cpyMulti);
    console.log(findIndexOfCurrenId, cpyMulti);
  }
  return (
    <div className="accordian">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable
      </button>
      <div className="container">
        {data && data.length > 0 ? (
          data.map((items) => {
            return (
              <div className="items">
                <ul className="list-group  listt">
                  <li
                    key={items.id}
                    className="list-group-item"
                    onClick={
                      enableMultiSelection
                        ? () => handleMulti(items.id)
                        : () => handleOnclick(items.id)
                    }
                  >
                    {items.question} <span>+</span>
                  </li>
                </ul>
                <div>
                  {enableMultiSelection
                    ? multiple.indexOf(items.id) !== -1 && (
                        <div className="content">{items.answer}</div>
                      )
                    : selected === items.id && (
                        <div className="content">{items.answer}</div>
                      )}
                </div>
              </div>
            );
          })
        ) : (
          <div>Data no found</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
