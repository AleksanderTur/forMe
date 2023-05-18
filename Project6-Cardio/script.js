'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance; //km
    this.duration = duration; //min
  }

  _setDescription() {
    this.type === 'running'
      ? (this.desctiption = `Біг ${new Intl.DateTimeFormat('uk-Ua').format(
          this.date
        )}`)
      : (this.desctiption = `Велосипед ${new Intl.DateTimeFormat(
          'uk-Ua'
        ).format(this.date)}`);
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, temp) {
    super(coords, distance, duration);
    this.temp = temp;
    this.calculatePace();
    this._setDescription();
  }

  calculatePace() {
    //min/km
    this.pace = this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, climb) {
    super(coords, distance, duration);
    this.climb = climb;
    this.calculateSpeed();
    this._setDescription();
  }

  calculateSpeed() {
    //km/h;
    this.sdeed = this.distance / (this.duration / 60);
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    //отримання місця розположення
    this._getPosition();

    //отримання даних з local storage
    this._getLocalStorageData();

    //опрацювання подій
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleClimbField);
    containerWorkouts.addEventListener('click', this._moveToWorkout.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert(`Неможливо отримати ваше місцерозположення.`);
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Опрацювання кліка на карті
    this.#map.on('click', this._showForm.bind(this));

    //відображення тренувань з local storage на карті
    this.#workouts.forEach(workout => {
      this._displayWorkout(workout);
    });
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputTemp.value =
      inputClimb.value =
        '';
    form.classList.add('hidden');
  }

  _toggleClimbField() {
    inputClimb.closest('.form__row').classList.toggle('form__row--hidden');
    inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const areNumbers = (...numbers) =>
      numbers.every(num => Number.isFinite(num));
    const areNumbersPositive = (...numbers) => numbers.every(num => num > 0);

    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //отримати дані з форми
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    //якщо тренування - це біг, створити running
    if (type === 'running') {
      const temp = +inputTemp.value;
      //перевірка інформації
      if (
        !areNumbers(distance, duration, temp) ||
        !areNumbersPositive(distance, duration, temp)
      )
        return alert('Внесіть правдиву інформацію!');

      workout = new Running([lat, lng], distance, duration, temp);
    }

    //якщо тренування - це велопробіжка, створити cycling
    if (type === 'cycling') {
      const climb = +inputClimb.value;
      //перевірка інформації
      if (
        !areNumbers(distance, duration, climb) ||
        !areNumbersPositive(distance, duration)
      )
        return alert('Внесіть правдиву інформацію!');
      workout = new Cycling([lat, lng], distance, duration, climb);
    }
    //додати новий об'єкт в масив тренувань
    this.#workouts.push(workout);

    //відобразити тренування на карті
    this._displayWorkout(workout);

    //відобразити тренування в списку
    this._displayWorkoutOnSidebar(workout);

    //сховати форму і очистити поля для введення даних
    this._hideForm();

    //додати всі тренування в локальне сховище
    this._addWorkoutsToLocalStorage();
  }

  _displayWorkout(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 200,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃' : '🚵‍♂️'} ${workout.desctiption}`
      )
      .openPopup();
  }
  _displayWorkoutOnSidebar(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout__title">${workout.desctiption}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃' : '🚵‍♂️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">км</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">хв</span>
    </div>`;

    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">📏⏱</span>
        <span class="workout__value">${workout.pace.toFixed(2)}</span>
        <span class="workout__unit">хв/км</span>
      </div>
      <div class="workout__details">
         <span class="workout__icon">👟⏱</span>
         <span class="workout__value">${workout.temp}</span>
        <span class="workout__unit">кроків/хв</span>
      </div>
  </li>`;
    }
    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">📏⏱</span>
        <span class="workout__value">${workout.sdeed.toFixed(2)}</span>
        <span class="workout__unit">км/год</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🏔</span>
        <span class="workout__value">${workout.climb}</span>
        <span class="workout__unit">м</span>
      </div>
  </li> `;
    }
    form.insertAdjacentHTML(`afterend`, html);
  }

  _moveToWorkout(e) {
    const workoutElement = e.target.closest('.workout');

    if (!workoutElement) return;

    const workout = this.#workouts.find(
      item => item.id === workoutElement.dataset.id
    );

    this.#map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _addWorkoutsToLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorageData() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(workout => {
      this._displayWorkoutOnSidebar(workout);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
