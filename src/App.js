import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  }); // object as i will pass the text & color
  const handelSubmit = (e) => {
    e.preventDefault();
    // value is empty
    if (!name) {
      showAlert(true, " please enter value", "danger");
    }
    // in case of editing
    else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setName("");
      setEditID(null);
      setIsEditing(false);
    }

    // in case of inserting new item
    else {
      // show alert with added new item
      showAlert(true, "new item added to the list ", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  // general  alert function
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  // clear  item list
  const clearList = () => {
    showAlert(true, "empty list ", "danger");
    setList([]);
  };

  // remove specific item
  const removeItem = (id) => {
    showAlert(true, "item removed", "danger");
    const newItems = list.filter((item) => item.id !== id);
    setList(newItems);
  };

  // edit specific item
  const editItem = (id) => {
    const editedItem = list.find((item) => item.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(editedItem.title);
  };

  // local storage  to store data
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handelSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3> grocery bud</h3>
        <div className="form-control">
          <input
            type="tex"
            className="grocery"
            placeholder="eg.eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit" className="submit-btn">
            {" "}
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            {" "}
            clear items{" "}
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
