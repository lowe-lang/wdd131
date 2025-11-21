document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastmodified').textContent = document.lastModified;

const temperature = 8; // °C
const windSpeed = 10; // km/h

function calculateWindChill(temp, speed) {
    return Math.round(
        13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)
    );
}

let windChillDisplay = 'N/A';
if (temperature <= 10 && windSpeed > 4.8) {
    windChillDisplay = calculateWindChill(temperature, windSpeed);
}

document.getElementById('windchill').textContent = windChillDisplay;
