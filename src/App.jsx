import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import axios from "axios";
import { v4 as id } from "uuid";
const reducer = (state, action) => {
  switch (action.type) {
    case "User":
      return { ...state, ...action.payload };
    case "clear":
      return (state = action.payload);
    default:
      return state;
  }
};
const App = () => {
  const [user, setUser] = useState([]);
  const [state, Dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    phone: "",
  });

  const getUservall = () => {
    axios
      .get("https://phone-book-bd63e-default-rtdb.firebaseio.com/user.json")
      .then((res) => {
        const newAddData = [];

        for (const id in res.data) {
          newAddData.push({ ...res.data[id], dId: id });
        }
        setUser(newAddData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUservall();
  }, []);

  const OnGetSaveData = () => {
    const confing = {
      url: "https://phone-book-bd63e-default-rtdb.firebaseio.com/user.json",
      method: "POST",
      data: state,
    };
    axios(confing)
      .then((res) => {
        getUservall();
        Dispatch({
          type: "clear",
          payload: {
            name: "",
            email: "",
            phone: "",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OnGetData = (e) => {
    let id = e.target.id;
    let val = e.target.value;
    let newData = { ...state, [id]: val };

    Dispatch({ type: "User", payload: newData });
  };

  const onGetDelete = (id) => {
    const config = {
      url: `https://phone-book-bd63e-default-rtdb.firebaseio.com/user/${id}.json`,
      method: "DELETE",
    };
    axios(config)
      .then((res) => getUservall(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div>
          <h2>PhoneBook</h2>
          <div className="Allinput">
            <input
              value={state.name}
              onChange={OnGetData}
              type="text"
              name=""
              id="name"
            />
            <input
              value={state.email}
              onChange={OnGetData}
              type="email"
              name=""
              id="email"
            />
            <input
              value={state.phone}
              onChange={OnGetData}
              type="phone"
              name=""
              id="phone"
            />
          </div>
          <div className="btn">
            <button onClick={OnGetSaveData}>Add</button>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            {user.map((it, ix) => {
              return (
                <tbody key={ix}>
                  <tr>
                    <td>{it.name}</td>
                    <td>{it.email}</td>
                    <td>{it.phone}</td>
                    <td
                      style={{
                        backgroundColor: "Green",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => onGetDelete(it.dId)}
                    >
                      Delete
                    </td>
                    <td style={{ backgroundColor: "yellow" }}>Edit</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
