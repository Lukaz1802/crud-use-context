import React, { useEffect, useState, useContext } from "react";
import "../styles/table.css";
import "../styles/input.css";
import FormEdit from "./FormEdit";
import iconNoResults from "../images/no-results.png";
import iconDeleteUSer from "../images/delete-icon.png";
import noPickUser from "../images/no-pic.png";
import { GlobalContext } from "../context/GlobalContext";

const Table = () => {
  const [ListPost, setListPost] = useState([]);
  const [ListTablePost, setListTablePost] = useState([]);
  const [statusSelect, setStatusSelect] = useState([
    "Activo",
    "Inactivo",
    "Pendiente",
  ]);
  const [nameSearch, setNameSearch] = useState("");

  const { Users, deleteUser } = useContext(GlobalContext);

  useEffect(() => {
    setListPost(Users);
    setListTablePost(Users);
  }, [Users]);

  const handleChangeName = (e) => {
    setNameSearch(e.target.value);
    filter(e.target.value);
  };

  const handleChangeSelect = (e) => {
    const opcion = e.target.value;
    if (opcion === "Estado") {
      setListPost(Users);
      setListTablePost(Users);
    } else {
      filter(opcion);
    }
  };

  const filter = (terminoBusqueda) => {
    let resultadoBusqueda = ListTablePost.filter((el) => {
      if (
        el.fullname
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return el;
      }
      if (el.status === terminoBusqueda.toLowerCase()) {
        return el;
      }
    });
    setListPost(resultadoBusqueda);
  };

  return (
    <div>
      <div className="container-input">
        <div className="input-icono">
          <input
            type="text"
            value={nameSearch}
            onChange={handleChangeName}
            name="input"
            placeholder="Nombre"
          />
        </div>
        <select
          name="status-search"
          id="status-search"
          onClick={handleChangeSelect}
        >
          <option>Estado</option>
          {statusSelect.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>

      {ListPost?.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Nombre</th>
              <th>Social Url</th>
              <th>Edad</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ListTablePost &&
              ListPost?.map((el) => (
                <tr key={el?.id}>
                  <td>
                    <b>#{el?.id || "-"}</b>
                  </td>

                  <td>
                    <div className="image-user-container">
                      <img
                        alt="avatar"
                        className="image-user"
                        src={el?.image || noPickUser}
                      />
                    </div>
                  </td>
                  <td>
                    <b>{el?.fullname || "-"}</b>
                  </td>
                  <td>
                    <a href={el?.socialUrl}>{el?.socialUrl || "-"}</a>
                  </td>
                  <td>{el?.age || "-"}</td>
                  <td>
                    {el?.status === "activo" ? (
                      <button id="button-status-active">
                        {el?.status || "-"}
                      </button>
                    ) : (
                      " "
                    )}{" "}
                    {el?.status === "inactivo" ? (
                      <button id="button-status-inactive">
                        {el?.status || "-"}
                      </button>
                    ) : (
                      ""
                    )}
                    {el?.status === "pendiente" ? (
                      <button id="button-status-pending">
                        {el?.status || "-"}
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                  {/* <td>
                    <FormEdit userId={el?.id} />
                  </td> */}
                  <td>
                    <button
                      id="button-delete"
                      onClick={() => deleteUser(el?.id)}
                    >
                      {" "}
                      <img
                        id="delete-icon"
                        alt="delete-icon"
                        src={iconDeleteUSer}
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <img id="no-results-icon" alt="no-results-icon" src={iconNoResults} />
      )}
    </div>
  );
};

export default Table;
