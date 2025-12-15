const formContainer = document.querySelector('.form-container');
const formInput = document.querySelector('.form-input');
const formBtn = document.querySelector('.form-btn');
const countriesContainer = document.querySelector('.countries-container');
const countries = [];

const renderCountry = function (data, className) {
  const html = ` <article class="country ${className}">
                <img class="country__img" src="${data.flags.png}" />
                <div class="country__data">
                  <h3 class="country__name">نام کشور: ${
                    Object.values(data.name)[0]
                  }</h3>
                  <h4 class="country__region">قاره: ${data.region}</h4>
                  <p class="country__row">جمعیت: ${
                    data.population
                  }<span>👫</span></p>
                  <p class="country__row">زبان رسمی: ${Object.values(
                    data.languages
                  )}<span>🗣️</span></p>
                  <p class="country__row">واحد پول: ${
                    Object.values(data.currencies)[0].name
                  }<span>💰</span></p>
                </div>
              </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const createNewReq = function (code) {
      const request = new XMLHttpRequest();
      request.open('GET', `https://restcountries.com/v3.1/alpha/${code}`);
      request.send();
      request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        renderCountry(data, 'neighbour');
      });
    };

    const codes = data.borders;
    codes.forEach(code => {
      createNewReq(code);
    });
  });
};

request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/all?fields=name');
request.send();
request.addEventListener('load', function () {
  const allCountries = JSON.parse(this.responseText);

  allCountries.forEach(conutry => {
    const countryName = conutry.name.common;
    countries.push(countryName.toLowerCase());
  });

  formBtn.addEventListener('click', function () {
    const country = formInput.value.trim();
    if (!country.trim()) return;
    if (!countries.includes(country.toLowerCase())) {
      alert('کشوری با این نام یافت نشد!');
    }
    if (countries.includes(country.toLowerCase())) {
      formContainer.style.display = 'none';
      getCountryAndNeighbour(country);
    }
  });
});
