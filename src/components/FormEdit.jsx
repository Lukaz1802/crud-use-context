import React, { useState, useEffect, Suspense } from "react";
import { Formik, Field } from "formik";
import ModalEdited from "./ModalEdited";
import iconEdit from "../images/icon-edit.png";
import "../styles/modal.css";

const FormEdit = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusSelect, setStatusSelect] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [postUser, setPostUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPostUser = async () => {
    await fetch(
      `https://my-json-server.typicode.com/fizzmod/dummy-server/posts/${props.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPostUser(data);
        setLoading(true);
      });
  };

  const getStatus = async () => {
    await fetch("https://my-json-server.typicode.com/fizzmod/dummy-server/page")
      .then((response) => response.json())
      .then((data) => setStatusSelect(data["fields"][2].options));
  };

  useEffect(() => {
    getStatus();
  }, []);

  const handleChangeStatus = (postUser) => {
    if (postUser.isAdmin == true) {
      if (isAdmin == true) {
        alert(postUser, "our value");
      }
      setIsAdmin(!isAdmin);
    }
  };
  return (
    <>
      {" "}
      <button
        id="button-edit"
        onClick={() => {
          setIsOpen(true);
          getPostUser();
        }}
      >
        <img alt="button-edit" src={iconEdit} />
      </button>
      <ModalEdited open={isOpen} close={() => setIsOpen(false)}>
        {loading ? (
          <Formik
            initialValues={{
              fullname: postUser.fullname,
              socialUrl: postUser.socialUrl,
              status: postUser.status,
              age: postUser.age,
              address: postUser.age,
              image: postUser.image,
              isAdmin: postUser.isAdmin,
            }}
            validate={(valores) => {
              let errores = {};

              if (!valores.fullname) {
                errores.nombre = "Required";
              }
              if (!valores.status) {
                errores.status = "Required";
              }
              if (!valores.age) {
                errores.age = "Required";
              }

              return errores;
            }}
            onSubmit={(valores) => {
              fetch(
                `https://my-json-server.typicode.com/fizzmod/dummy-server/posts/${props.userId}`,
                {
                  method: "PUT",
                  body: JSON.stringify(valores),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => console.log("Success:", response));
              setIsOpen(false);
            }}
          >
            {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
              <form className="formulario" onSubmit={handleSubmit}>
                <label htmlFor="Full name">Full name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  required
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.nombre && <p className="error">{errors.nombre}</p>}

                <label htmlFor="Social Url">Social Url</label>
                <input
                  type="text"
                  id="socialUrl"
                  name="socialUrl"
                  value={values.socialUrl}
                  onChange={handleChange}
                />

                <label htmlFor="Status">Status</label>

                <select
                  name="status"
                  id="status"
                  required
                  value={values.status}
                  onChange={handleChange}
                >
                  <option>Seleccionar estado</option>
                  {statusSelect.map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>

                {errors.status && <p className="error">{errors.status}</p>}

                <label htmlFor="Age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  value={values.age}
                  onChange={handleChange}
                />

                {errors.age && <p className="error">{errors.age}</p>}

                <label htmlFor="Adress">Adress</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />

                <label htmlFor="Image">Image</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                />

                <div className="container-slider">
                  <label htmlFor="Image">Is admin</label>
                  <label className="switch">
                    <Field type="checkbox" name="isAdmin" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="container-buttons">
                  <button type="submit" className="button-apply">
                    Aplicar
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="button-cancel"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        )}
      </ModalEdited>
    </>
  );
};

export default FormEdit;
