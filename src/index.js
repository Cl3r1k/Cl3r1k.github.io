/* eslint-disable no-undef */

import 'particles.js';
import throttle from 'lodash/throttle';

import './scss/main.scss';

const navBarElement = document.getElementById('navBarId');
const mainNavLinks = document.querySelectorAll('nav ul li a');
// const mainDivs = document.querySelectorAll('main div');

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

const throttledScrollHandler = throttle(scrollHandler, 100);

const initApp = () => {
  document.addEventListener('scroll', throttledScrollHandler);

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', 'assets/particlesjs-config.json', () => {
    // console.log('callback - particles-js config loaded');
  });

  // console.log('navBarElement: ', navBarElement);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
