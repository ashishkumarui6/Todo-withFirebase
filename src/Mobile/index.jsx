import React from "react";
import "./index.css";

const Mobile = ({ id, name, email, phone, onFn }) => {
  return (
    <div>
      <table className="m-table">
        <thead>
          <tr>
            <th className="m-th">id</th>
            <th className="m-th">Name</th>
            <th className="m-th">Email</th>
            <th className="m-th">Phone</th>
            <th className="m-th">Action</th>
            <th className="m-th">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="m-td">1{id}</td>
            <td className="m-td">{name}</td>
            <td className="m-td">{email}</td>
            <td className="m-td">{phone}</td>
            <td className="m-td D-btn" onClick={onFn}>
              Delete
            </td>
            <td className="m-td Up-btn">Update</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Mobile;
