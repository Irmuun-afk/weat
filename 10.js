const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '9ac1f5c2d6508db3c616a0d1f80a08fd';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/3208/3208756.png';
                    break;
                case 'Rain':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/3937/3937493.png';
                    break;

                case 'Snow':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/6635/6635320.png';
                    break;

                case 'Clouds':
                    image.src = 'https://cdn-icons-png.freepik.com/512/414/414825.png';
                    break;

                case 'Haze':
                    image.src = 'https://cdn-icons-png.flaticon.com/512/3104/3104512.png';
                    break;

                default:
                    image.src = '';
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });


});
const mouseFollower = document.querySelector('.mouse-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    let distX = mouseX - followerX;
    let distY = mouseY - followerY;
    
    followerX += distX * 0.1;
    followerY += distY * 0.1;

    mouseFollower.style.left = `${followerX - 500}px`;
    mouseFollower.style.top = `${followerY - 500}px`;

    requestAnimationFrame(animate);
}

animate();