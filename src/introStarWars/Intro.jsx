/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import '../styles/introStarWars.css';
import logo from '../images/starWarsPlanet.png';
import music from '../audio/star-wars-intro-edit.mp3';

export default function Intro(props) { // recebendo o props (setVerifyIntro)
  const intro = useRef();
  const title = useRef();
  const background = useRef();
  const backgroundGalaxy = useRef();
  const content = useRef();
  const song = new Audio(music);
  const { setVerifyIntro } = props;

  useEffect(() => {
    // eslint-disable-next-line new-cap
    const tl = new gsap.timeline();
    tl
      .to(intro.current, { opacity: 1, delay: 1, duration: 4.5 })
      .to(intro.current, {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          song.play();
        },
      })
      .set(title.current, { opacity: 1, delay: 0.5, scale: 1.75 })
      .to(title.current, { scale: 0.05, ease: 'power2', duration: 15 })
      .to(title.current, { opacity: 0, duration: 1.5 }, '-=5.5')
      .to(content.current, { top: '-170%',
        duration: 130 }, '-=7.5')
      .to(backgroundGalaxy.current, { opacity: 1 }, '-=110')
      .to(background.current, { opacity: 1 }, '-=110')
      .to(content.current, { duration: 70,
        onComplete: () => {
          setVerifyIntro(true);
        } }, '-=122')
      .to(content.current, { opacity: 0, duration: 10 }, '-=60');
  }, []);

  return (
    <div className="container-starWars">
      <section className="intro" ref={ intro }>
        <p>Há muito tempo atrás, em uma galáxia muito, </p>
        <p>muito distante ...</p>
      </section>
      <section className="title" ref={ title }>
        <img src={ logo } alt="Code Wars title" />
      </section>
      <section className="container-background">
        <div className="galaxy" ref={ backgroundGalaxy }> </div>
        <div className="delete-letter" ref={ background }> </div>
      </section>
      <section className="crawl">
        <div className="content" ref={ content }>
          <h1 className="episode-number">Projeto XV</h1>
          <h2 className="episode-title">STAR WARS</h2>
          <h2 className="episode-title">PLANETS SEARCH</h2>
          <p>
            É um período de guerra civil.
            Partindo de um hub secreto,
            codificadores rebeldes atacam e
            conquistam sua primeira
            vitória contra o perverso
            Império Galáctico.
          </p>
          <p>
            Durante a batalha, codificadores
            rebeldes conseguem roubar
            o código secreto da arma
            decisiva do Império, a
            ESTRELA DE BUG&apos;S, um
            script especial com poder suficiente
            para destruir uma rede inteira.
          </p>
          <p>
            Perseguido pelos codificadores
            do Império, o líder do projeto
            Vitor Marcelo, apressa-se
            em realizar os commits em sua conta,
            protegendo o código roubado que
            pode salvar toda a rede e
            restaurar a liberdade na
            galáxia....
          </p>
        </div>
      </section>
    </div>
  );
}

Intro.propTypes = {
  setVerifyIntro: PropTypes.func.isRequired,
};
