import React, { useState, useEffect, useContext } from "react";
import { Formik, Field } from "formik";
import Modal from "./Modal";
import iconButtonNew from "../images/NewButton.png";
import { GlobalContext } from "../context/GlobalContext.js";
import "../styles/modal.css";

const NewUserForm = () => {
  const { addUser } = useContext(GlobalContext);
  const [statusSelect, setStatusSelect] = useState([
    "activo",
    "inactivo",
    "pendiente",
  ]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {" "}
      <button id="button-new" onClick={() => setIsOpen(true)}>
        <img alt="button-new" src={iconButtonNew} />
      </button>
      <Modal open={isOpen} close={() => setIsOpen(false)}>
        <Formik
          initialValues={{
            fullname: "",
            socialUrl: "",
            status: "",
            age: "",
            image: "",
            isAdmin: false,
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
          onSubmit={(valores, { resetForm }) => {
            addUser(valores);
            resetForm();
            alert("Succes");
            setIsOpen(false);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
            <form className="formulario" onSubmit={handleSubmit}>
              <label htmlFor="Full name">Nombre</label>
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

              <label htmlFor="Status">Estado</label>

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

              <label htmlFor="Age">Edad</label>
              <input
                type="number"
                id="age"
                name="age"
                required
                value={values.age}
                onChange={handleChange}
              />

              {errors.age && <p className="error">{errors.age}</p>}

              <label htmlFor="Image">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                value={values.image}
                onChange={handleChange}
              />

              <div className="container-slider">
                <label htmlFor="Image">Admin?</label>
                <label className="switch">
                  <Field
                    type="checkbox"
                    name="isAdmin"
                    onChange={handleChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="container-buttons">
                <button type="submit" className="button-apply">
                  Agregar
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
      </Modal>
    </>
  );
};

export default NewUserForm;
