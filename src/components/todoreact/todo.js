import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  // in order to write on the main input field
  const [inputdata, setInputData] = useState("");
  // for storing all of the items in the to-do list
  const [items, setItems] = useState(getLocalData());
  // this stateVariable will be used for the edit process
  const [isEditItem, setIsEditItem] = useState("");
  // for toggling the + logo with the edit logo, we'll use the following useState()
  const [toggleButton, setToggleButton] = useState(false);

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill in some data in the input field.");
      // condition to make sure the edited item is being edited and not a duplicate copy within the to do list
    } else if (inputdata && toggleButton) {
      setItems(
        // using a map method here (matching the id with the edited item that is selected)
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            // spread operator => keep the original while changing the name of the edited item
            return { ...curElem, name: inputdata };
          }
          // else keep the originals as it is
          return curElem;
        })
      );
      // after adding the item by pressing the + button, empty out the text field
      setInputData("");
      // now set the default of the isEditItem value to null, before it was an id of a certain item to be editted
      setIsEditItem(null);
      // and kept setToggleButton to false because we have now completed our operation of editing the item
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      // spread operator, keep the original data in the list while including my new added input data as well: initially: inputData
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_to_edit = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_to_edit.name);
    // passing an id to the isEditItem variable
    setIsEditItem(index);
    // to display the edit logo, use true
    setToggleButton(true);
  };

  // how to delete items section
  // return in a form of an array only those that should not be deleted
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    // set only those updated items that shouldn't be deleted
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage (whenever the items useState is changed, the local storage will automatically become updated using this function)
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {/* used a ternary operator to apply what should be displayed on the input field */}
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items: (this is where our list items will appear)  */}
          <div className="showItems">
            {/* iterate for each item in the itemslist and display */}
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  {/* Item name */}
                  <h3>{curElem.name}</h3>
                  {/* add and edit buttons */}
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
