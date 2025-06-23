import React, { useState } from "react";
import classes from '../Styles/Card.module.css';
import classes2 from '../Styles/CardWhite.module.css';

const Card = ({ mode, photocandidate, namecandidate, integrantes, onClick, numberlist }) => {
  const [mostrarIntegrantes, setMostrarIntegrantes] = useState(false);
  const currentClasses = mode.includes('dark') ? classes : classes2;

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className={currentClasses.CardDiv}>
      {!mostrarIntegrantes ? (
        <>
          <div
            className={classes.DivImg}
            style={{ backgroundImage: `url(${photocandidate})` }}
          >
            <button className={classes.VoteButtonTopRight} onClick={onClick}>
              VOTAR
            </button>
          </div>

          <div className={classes.CardContent}>
            <h6 className={currentClasses.namecandidate}>
              {truncateText(namecandidate, 40)}
            </h6>

            <p className={classes.ListNumber}>Número de lista: {numberlist}</p>

            <button
              className={classes.ActionButton}
              onClick={() => setMostrarIntegrantes(true)}
            >
              INTEGRANTES
            </button>
          </div>
        </>
      ) : (
        <div className={classes.CardContent}>
          <h4 className={classes.ModalTitle}>Integrantes de la lista</h4>
          <ul className={classes.List}>
            {integrantes.map((nombre, index) => (
              <li key={index}>{nombre}</li>
            ))}
          </ul>
          <button
            className={classes.SmallButton}
            onClick={() => setMostrarIntegrantes(false)}
          >
            VOLVER
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
