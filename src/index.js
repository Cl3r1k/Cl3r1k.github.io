/* eslint-disable no-undef */

import 'particles.js';
import throttle from 'lodash/throttle';

// Constants
import { introTypingTexts } from '../settings/config';

// Styles
import './scss/main.scss';

const navBarElement = document.getElementById('navBarId');
const mainNavLinks = document.querySelectorAll('nav ul li a');
const typingTextElement = document.getElementById('typingTextId');
// const mainDivs = document.querySelectorAll('main div');
// Set of texts to display in Typing Texts module

const scrollHandler = () => {
  // console.log('evt: ', evt);
  // console.log('document.scrollTop: ', document.scrollTop());
  // console.log('window.scrollY: ', window.scrollY);

  const scrollPosition = window.scrollY;
  navBarElement.classList.toggle('scrolled', scrollPosition > 100);

  mainNavLinks.forEach(link => {
    const divElement = document.querySelector(link.hash);

    const isScrollInDivArea =
      divElement.offsetTop <= scrollPosition &&
      divElement.offsetTop + divElement.offsetHeight > scrollPosition;

    link.parentElement.classList.toggle('active', isScrollInDivArea);
  });

  // console.log('mainDivs: ', mainDivs);
};

// const logIt = () => {
//   console.log('logIt() called');
//   scrollHandler();
// };

const typingTextAnimate = () => {
  let counter = 0;
  setInterval(() => {
    if (counter === introTypingTexts.length - 1) {
      counter = 0;
    } else {
      counter += 1;
    }
    typingTextElement.textContent = introTypingTexts[counter];
    typingTextElement.style.display = 'none';
    typingTextElement.style.display = 'initial';
  }, 4000);
};

const throttledScrollHandler = throttle(scrollHandler, 100);

const initApp = () => {
  document.addEventListener('scroll', throttledScrollHandler);

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', 'assets/particlesjs-config.json', () => {
    // console.log('callback - particles-js config loaded');
  });

  typingTextAnimate();

  // console.log('navBarElement: ', navBarElement);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
