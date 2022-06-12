import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const refs = {
 input: document.querySelector('input#search-box'),
 countryInfo:document.querySelector('.country-info'),
 countryList: document.querySelector('.country-list')
}
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

  function onSearch(e) {
  clearCardContainer();
  const inputValue = e.target.value;
  inputValue.trim();
  if (inputValue === '') {
    return;
  }
    fetchCountries(inputValue)
        .then(markupCountries)
        .catch(onError)
      
    
}

 function markupCountries(countries) {
         if (countries.length > 10) {
   listInfo()
  } else if (countries.length === 1) {
    const markupCard = countries
      .map(({ name, capital, population, flags, languages }) => {
        return `<div class="card__container"><h2 class="country"><img src="${
          flags.svg
        }" alt="country flags" width = 40px> ${name.official}</h2>
          <p class="capital"><span class="span">Capital:</span> ${capital} </p>
          <p class="population"><span class="span">Population:</span> ${population} </p>
         <p class="languages"><span class="span">Languages:</span> ${Object.values(languages)}</p></div>`;
     })
      .join('');
    refs.countryInfo.innerHTML = markupCard;
  } else {
           const markupList = countries
      .map(({ name, flags }) => {
        return `<h2 class="country"><img src="${flags.svg}" alt="country flags" width = 50px> ${name.official}</h2>`;
      })
      .join('');

    refs.countryList.innerHTML = markupList;
  }
 }
    function clearCardContainer() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function onError(error) {
     Notify.failure('Oops, there is no country with that name');
    }
function listInfo() {
     Notify.info('Too many matches found. Please enter a more specific name');
}
