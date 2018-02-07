(function() {

  'use strict';

  const scrollTo = scrollY => { window.scrollTo(0, scrollY) };
  const scrollToSection = (section) => { scrollTo(section.offsetTop) };

  const onInit = () => { if (window.scrollY > 0) scrollTo(0) };
  window.setTimeout(onInit, 100);

  let sectionInView = document.querySelector('section');

  const loadImage = (section) => {
    if (!section) return;

    const src = section.getAttribute('image-src');
    if (!src) return;

    console.log('Load ' + src);
    section.style['background-image'] = 'url("'+ src +'")';
  };

  const fadeInImage = (section) => {
    console.log('Fade in ' + section.getAttribute('image-src'));
    section.classList.add("in");
  };

  const checkEntry = (entry, observer) => {
    if (!(entry.isIntersecting && entry.intersectionRatio > 0)) return;

    const section = entry.target;
    sectionInView = section;

    fadeInImage(section);
    loadImage(section.nextElementSibling);
  };

  const config = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => { checkEntry(entry, self) });
  }, config);

  const sections = document.querySelectorAll('section');
  sections.forEach(section => { observer.observe(section) });

  const goTo = direction => {
    if (direction < 0) {
      const section = sectionInView.previousElementSibling || sectionInView;
      scrollToSection(section);
    } else if (direction > 0) {
      const section = sectionInView.nextElementSibling || sectionInView;
      if (section.tagName !== 'SECTION') return; // End of sections
      scrollToSection(section);
    }
  };

  const LEFT_BUTTON = 1;
  document.addEventListener('click', event => {
    if (event.which === LEFT_BUTTON) {
      goTo(1);
      event.preventDefault();
    }
  });

  const ARROW_LEFT = 37;
  const ARROW_UP = 38;
  const ARROW_RIGHT = 39;
  const ARROW_DOWN = 40;
  document.addEventListener('keydown', event => {
    const keyCode = event.which;
    if (keyCode === ARROW_UP || keyCode === ARROW_LEFT) {
      goTo(-1);
      event.preventDefault();
      return;
    }
    
    if (keyCode === ARROW_DOWN || keyCode === ARROW_RIGHT) {
      goTo(1);
      event.preventDefault();
      return;
    }
  });

}());