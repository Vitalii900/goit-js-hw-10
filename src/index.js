import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));

function findCountry(event) {
  fetchCountries(event.target.value).then(addCountriesMurkup);
}

function addCountriesMurkup(countries) {
  if (countries.length === 1) {
    countryListRef.innerHTML = ''
    countriesCard(countries);
  } else if (countries.length > 1 && countries.length <= 10) {
    countryInfoRef.innerHTML = '';
    countriesList(countries);
  } else Notify.info('Too many matches found. Please enter a more specific name.');
}

function countriesList(items) {
  const murkupFromArray = items.map(item => {
    return `<li class="flagAndName"><img class="countres_flag" src="${item.flags.svg}">
    <p class="country_title">${item.name.common}</p></li>`;
  }).join('');
  countryListRef.innerHTML = murkupFromArray;
}


function countriesCard(countries) {
  const singleMurkup = countries.map(item => {
    return `<div class="flagAndName">
    <img class="countres_flag" src="${item.flags.svg}">
    <p>${item.name.common}</p></div>
    <p>Capital: ${item.capital}</p>
    <p>Population: ${item.population}</p>
    <p>Languages: ${Object.values(item.languages)}</p>`;
  });
  countryInfoRef.innerHTML = singleMurkup;
}