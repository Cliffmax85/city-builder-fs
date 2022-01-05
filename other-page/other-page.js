import { 
    checkAuth, 
    logout,
    createCity,
    updateCastle,
    updateSkyline,
    updateWaterfront,
    updateSlogans,
    getCity
} from '../fetch-utils.js';

checkAuth();

const waterfrontDropdown = document.querySelector('.waterfront-dropdown');
const skylineDropdown = document.querySelector('.skyline-dropdown');
const castleDropdown = document.querySelector('.castle-dropdown');
const waterfrontEl = document.querySelector('.waterfront');
const skylineEl = document.querySelector('.skyline');
const castleEl = document.querySelector('.castle');

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load' async() => {
    let city = await getCity();

    if (!city) {
        const defaultCity = {
            waterfront: 'canal',
            skyline: 'dubai',
            castle: 'budapest',
            name: 'Boring',
            slogans: []
        };
        city = await createCity(defaultCity);
    }
})