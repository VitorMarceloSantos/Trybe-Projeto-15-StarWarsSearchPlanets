/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import '../styles/lightSaber.css';
import saber from '../images/sabreluz.png';

export default function LightSaber() {
  let [count, setCount] = useState(Number(0));
  const array = ['blue', 'green', 'yellow', 'red'];
  const NUMBER_FOUR = 4;
  const NUMBER_SECONDS = 2000;

  const addClassColor = () => {
    const divLaser = document.querySelector('.laser');
    if (count === NUMBER_FOUR) {
      setCount(count = 0);
    }
    divLaser.removeAttribute('class');
    divLaser.classList.add('laser', array[count], 'animation');
    setCount(count += 1);
  };
  useEffect(() => {
    // addClassColor();
    const interval = setInterval(() => {
      addClassColor();
    }, NUMBER_SECONDS);
    return () => clearInterval(interval);
  }, count);
  return (
    <div className="container-light-saber">
      <div className="container-saber">
        <div className="container-title">
          <h2 className="title-loading">Loading</h2>
        </div>
        <div className="handle">
          <img src={ saber } alt="Sabre de Luz" className="img-saber" />
        </div>
        <div className="laser red animation" />
      </div>
    </div>
  );
}
