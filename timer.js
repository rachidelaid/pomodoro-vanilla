const circle = document.querySelector('.progress');
const stat = document.querySelector('.content h4');
const progress = document.querySelector('.progress svg path');
const time = document.querySelector('.content h1');
const options = document.querySelectorAll('.options p');

const maxBreak = 90;

let breakStarted = false;

let seconds = 0;
let maxTime = 0;
let loop;

function clockify(n) {
  return `${n}`.length < 2 ? '0' + n : n;
}

function startBreak() {
  breakStarted = true;
  loop = setInterval(() => {
    if (seconds === 0) {
      clearInterval(loop);
      setTime();
      startTimer();
      return;
    }
    seconds--;
    render();
  }, 1000);
}

function startTimer() {
  loop = setInterval(() => {
    if (seconds === 0) {
      seconds = maxBreak;
      clearInterval(loop);
      startBreak();
      return;
    }
    seconds--;
    render();
  }, 1000);
}

circle.addEventListener('click', () => {
  if (stat.innerText === 'PLAY') {
    stat.innerText = 'PAUSE';
    if (breakStarted) {
      startBreak();
    } else {
      startTimer();
    }
  } else {
    stat.innerText = 'PLAY';
    clearInterval(loop);
  }
});

function render(brk) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;

  time.innerText = `${clockify(mins)}:${clockify(secs)}`;
  document.title = `${clockify(mins)}:${clockify(secs)} - pomodoro timer`;

  if (breakStarted) {
    progress.setAttribute(
      'stroke-dasharray',
      100 - (seconds * 100) / maxBreak + ', 100',
    );
  } else {
    progress.setAttribute(
      'stroke-dasharray',
      (seconds * 100) / maxTime + ', 100',
    );
  }
}

function setTime() {
  breakStarted = false;
  const option = document.querySelector('.options .active').textContent;
  switch (option) {
    case 'pomodoro':
      seconds = Number(document.querySelector('#pomodoro').value) * 60;
      break;
    case 'short break':
      seconds = Number(document.querySelector('#short').value) * 60;
      break;

    default:
      seconds = Number(document.querySelector('#long').value) * 60;
      break;
  }
  maxTime = seconds;
  render();
}
setTime();

document.querySelectorAll('input').forEach((inp) => {
  inp.addEventListener('change', setTime);
});

options.forEach((opt) => {
  opt.addEventListener('click', () => {
    options.forEach((o) => o.classList.remove('active'));
    opt.classList.add('active');
    setTime();
  });
});
