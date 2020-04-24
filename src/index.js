/* eslint-disable no-undef */

import 'particles.js';
import throttle from 'lodash/throttle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'font-awesome/scss/font-awesome.scss';

// Constants
import { introTypingTexts, AOSConfig } from '../settings/config';

// Styles
import './scss/main.scss';

const SKILL_SCROLL_TRIGGER = 400;
const COUNTER_SCROLL_TRIGGER = 500;

const navBarElement = document.getElementById('navBarId');
const mainNavLinks = document.querySelectorAll('nav ul li a');
const typingTextElement = document.getElementById('typingTextId');
const parentTypingTextElement = typingTextElement.parentElement;
const skillsElements = document.querySelectorAll('section.skill-card');
const countersElements = document.querySelectorAll('div.stat-card-counter');

// App State
const state = {
  skillsScrolled: false,
  countersScrolled: false,
};
// const mainDivs = document.querySelectorAll('main div');
// Set of texts to display in Typing Texts module

const fireSkills = () => {
  state.skillsScrolled = true;
  skillsElements.forEach(item => item.classList.add('scrolled-skills'));
};

const fireCounters = () => {
  state.countersScrolled = true;
  const dataCounters = [];
  countersElements.forEach(item => dataCounters.push(+item.dataset.counter));
  const counters = Array(dataCounters.length).fill(0);
  const maxDataCounter = dataCounters.reduce(
    (acc, curr) => (curr > acc ? curr : acc),
    0
  );
  const timer = setInterval(() => {
    counters.forEach((item, idx) => {
      if (item < dataCounters[idx]) {
        counters[idx] += 1;
        countersElements[idx].textContent = counters[idx];
      }
    });

    const maxCounter = counters.reduce(
      (acc, curr) => (curr > acc ? curr : acc),
      0
    );

    if (maxCounter >= maxDataCounter) {
      clearInterval(timer);
    }
  }, 10);
};

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

  if (scrollPosition > SKILL_SCROLL_TRIGGER && !state.skillsScrolled) {
    fireSkills();
  }

  if (scrollPosition > COUNTER_SCROLL_TRIGGER && !state.countersScrolled) {
    fireCounters();
  }

  // console.log('mainDivs: ', mainDivs);
};

// const logIt = () => {
//   console.log('logIt() called');
//   scrollHandler();
// };

const typingTextAnimate = () => {
  let counter = 0;
  setInterval(() => {
    typingTextElement.textContent = introTypingTexts[counter];
    if (counter === introTypingTexts.length - 1) {
      counter = 0;
    } else {
      counter += 1;
    }
    parentTypingTextElement.removeChild(typingTextElement);
    parentTypingTextElement.appendChild(typingTextElement);
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

  AOS.init(AOSConfig);

  // console.log('navBarElement: ', navBarElement);
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
