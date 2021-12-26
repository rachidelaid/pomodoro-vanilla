const setting = document.querySelector('.settings');
const modalWrapper = document.querySelector('.modal-wrap');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal .title svg');
const colors = document.querySelectorAll('.color span');
const fonts = document.querySelectorAll('.font span');

function toggle() {
  modalWrapper.classList.toggle('show');
}

setting.addEventListener('click', toggle);
modalClose.addEventListener('click', toggle);

fonts.forEach((font) => {
  font.addEventListener('click', () => {
    fonts.forEach((f) => f.classList.remove('active'));

    switch (font.className) {
      case 'f1':
        document.documentElement.style.setProperty(
          '--primary-font',
          'var(--font-one)'
        );
        break;
      case 'f2':
        document.documentElement.style.setProperty(
          '--primary-font',
          'var(--font-two)'
        );
        break;

      default:
        document.documentElement.style.setProperty(
          '--primary-font',
          'var(--font-three)'
        );
        break;
    }
    font.classList.add('active');
  });
});

colors.forEach((color) => {
  color.addEventListener('click', () => {
    colors.forEach((c) => c.classList.remove('active'));

    switch (color.className) {
      case 'c1':
        document.documentElement.style.setProperty(
          '--primary-color',
          'var(--color-one)'
        );
        break;
      case 'c2':
        document.documentElement.style.setProperty(
          '--primary-color',
          'var(--color-two)'
        );
        break;

      default:
        document.documentElement.style.setProperty(
          '--primary-color',
          'var(--color-three)'
        );
        break;
    }
    color.classList.add('active');
  });
});
