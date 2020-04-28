export const introTypingTexts = ['Creative', 'Experienced', 'Supper-Pupper'];

/*
  |--------------------------------------------------------------------------
  | AOS - Animate on Scroll
  |--------------------------------------------------------------------------
  | This template uses AOS - small library to animate elements on your page 
  | when you scroll. Here you can configure global settings.
  | All available options you can find at https://github.com/michalsnik/aos
*/
export const AOSConfig = {
  offset: 120, // Change offset to trigger animations sooner or later (px)
  duration: 600, // Duration of animation (accepted values from 50 to 3000, with step 50ms)
  easing: 'ease-out-quart', // Choose timing function to ease elements in different ways
  delay: 100, // Delay animation (ms)
  anchor: null, // Anchor element, whose offset will be counted to trigger animation instead of actual elements offset
  placement: 'top-bottom', // Anchor placement - which one position of element on the screen should trigger animation
  once: true, // Choose wheter animation should fire once, or every time you scroll up/down to element
};

export const SEND_SUCCESS_DELAY = 3000;
