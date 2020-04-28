/* eslint-disable no-undef */
import 'particles.js';
import throttle from 'lodash/throttle';
import AOS from 'aos';
import Swiper from 'swiper';
import 'aos/dist/aos.css';
import 'font-awesome/scss/font-awesome.scss';
import '../node_modules/swiper/css/swiper.min.css';

// Constants
import {
  introTypingTexts,
  AOSConfig,
  SEND_SUCCESS_DELAY,
  LOADER_DELAY,
  LOADING_DELAY,
  COUNTER_DELAY,
  TYPING_DELAY,
  SCROLL_THROTTLE,
  SKILL_SCROLL_TRIGGER,
  COUNTER_SCROLL_TRIGGER,
} from '../settings/config';

// Styles
import './scss/main.scss';

const preloader = document.getElementById('Preloader');
const navBarElement = document.getElementById('navBarId');
const mainNavLinks = document.querySelectorAll('nav.nav-bar ul li a');
const typingTextElement = document.getElementById('typingTextId');
const parentTypingTextElement = typingTextElement.parentElement;
const skillsElements = document.querySelectorAll('section.skill-card');
const countersElements = document.querySelectorAll('div.stat-card-counter');
const portfolioNavLinks = document.querySelectorAll('nav.portfolio-nav ul li');
const portfolioCardsElements = document.querySelectorAll(
  'section.portfolio-card'
);
const portfolioCardsParent = document.getElementById('portfolioListId');
// const submitContactButton = document.getElementById('submitContactButton');
const formContact = document.getElementById('formContact');
const formStatusElement = document.getElementById('formStatus');
const formControls = document.querySelectorAll('form .form-control');
const bodySections = document.querySelectorAll('.hidden');

// App State
const state = {
  skillsScrolled: false,
  countersScrolled: false,
};

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
  }, COUNTER_DELAY);
};

const scrollHandler = () => {
  const scrollPosition = window.scrollY;
  navBarElement.classList.toggle('scrolled', scrollPosition > 100);

  mainNavLinks.forEach(link => {
    const divElement = document.querySelector(link.hash);

    const isScrollInDivArea =
      divElement.offsetTop <= scrollPosition + navBarElement.clientHeight &&
      divElement.offsetTop + divElement.offsetHeight >
        scrollPosition + navBarElement.clientHeight;

    link.parentElement.classList.toggle('active', isScrollInDivArea);
  });

  if (scrollPosition > SKILL_SCROLL_TRIGGER && !state.skillsScrolled) {
    fireSkills();
  }

  if (scrollPosition > COUNTER_SCROLL_TRIGGER && !state.countersScrolled) {
    fireCounters();
  }
};

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
  }, TYPING_DELAY);
};

const throttledScrollHandler = throttle(scrollHandler, SCROLL_THROTTLE);

const portfolioNavHandler = evt => {
  const tagName = evt.target.dataset.tag;

  portfolioNavLinks.forEach(item =>
    item.classList.toggle('active', item.dataset.tag === tagName)
  );

  while (portfolioCardsParent.firstChild) {
    portfolioCardsParent.firstChild.remove();
  }
  portfolioCardsElements.forEach(item => {
    if (item.dataset.tag === tagName || !tagName) {
      portfolioCardsParent.append(item);
    }
  });
};

const submitHandler = () => {
  formContact.reset();
  formStatusElement.classList.add('success');
  setTimeout(
    () => formStatusElement.classList.remove('success'),
    SEND_SUCCESS_DELAY
  );
};

const changeHandler = evt => {
  evt.target.classList.toggle('filled', !!evt.target.value);
};

const postLoading = () => {
  setTimeout(() => {
    preloader.classList.add('--loaded');
    bodySections.forEach(item => item.classList.remove('hidden'));
    setTimeout(
      () => preloader.parentElement.removeChild(preloader),
      LOADING_DELAY
    );
  }, LOADER_DELAY);
};

const initApp = () => {
  document.addEventListener('scroll', throttledScrollHandler);

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS.load('particles-js', 'assets/particlesjs-config.json', () => {
    // console.log('callback - particles-js config loaded');
  });

  typingTextAnimate();

  AOS.init(AOSConfig);

  portfolioNavLinks.forEach(item =>
    item.addEventListener('click', portfolioNavHandler)
  );

  // eslint-disable-next-line no-unused-vars
  const mySwiper = new Swiper('.swiper-container', {
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  formContact.addEventListener('submit', submitHandler);
  formControls.forEach(item => item.addEventListener('blur', changeHandler));

  postLoading();
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
