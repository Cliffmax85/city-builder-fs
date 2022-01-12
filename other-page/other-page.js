import { 
    checkAuth, 
    logout,
    createCity,
    updateCastle,
    updateSkyline,
    updateWaterfront,
    updateSlogans,
    updateName,
    getCity
} from '../fetch-utils.js';

checkAuth();

const waterfrontDropdown = document.querySelector('.waterfront-dropdown');
const skylineDropdown = document.querySelector('.skyline-dropdown');
const castleDropdown = document.querySelector('.castle-dropdown');
const waterfrontEl = document.querySelector('.waterfront-img');
const skylineEl = document.querySelector('.skyline-img');
const castleEl = document.querySelector('.castle-img');
const nameFormEl = document.querySelector('.name-form');
const sloganFormEl = document.querySelector('.slogan-form');
const cityNameEl = document.querySelector('.city-name');
const slogansEl = document.querySelector('.slogan-list');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    let city = await getCity();

    if (!city) {
        const city = await createCity();
        displayCity(city);
    } else {
        displayCity();
    }
       
    
});

waterfrontDropdown.addEventListener('change', async() => {
    const updatedCity = await updateWaterfront(waterfrontDropdown.value);
    displayCity(updatedCity);

});

skylineDropdown.addEventListener('change', async() => {
    const updatedCity = await updateSkyline(skylineDropdown.value);
    displayCity(updatedCity);
});

castleDropdown.addEventListener('change', async() => {
    const updatedCity = await updateCastle(castleDropdown.value);
    displayCity(updatedCity);
});

nameFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(nameFormEl);
    const name = data.get('name');

    const updatedCity = await updateName(name);
    displayCity(updatedCity); 

});

sloganFormEl.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(sloganFormEl);
    const city = await getCity();
    const slogan = data.get('slogan');

    city.slogans.push(slogan);

    const updatedCity = await updateSlogans(city.slogans);
    displayCity(updatedCity);
});

function displayCity(city) {
    cityNameEl.textContent = city.name;
    waterfrontEl.src = `../assets/${city.waterfront}-waterfront.jpg`;
    skylineEl.src = `../assets/${city.skyline}-skyline.jpg`;
    castleEl.src = `../assets/${city.castle}-castle.jpg`;
    slogansEl.textContent = '';

    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');
        sloganEl.classList.add('slogans');
        sloganEl.textContent = slogan;
        slogansEl.append(sloganEl);
    }
}