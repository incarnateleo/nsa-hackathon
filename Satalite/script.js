document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        launchSatellite();
    }
});

function launchSatellite() {
    var satellite = document.querySelector('.satellite');
    var t = 0;
    var g = 9.81; // acceleration due to gravity in m/s^2
    var v0 = 50; // initial velocity in m/s
    var angle = 45; // launch angle in degrees
    var v0x = v0 * Math.cos(angle * (Math.PI / 180));
    var v0y = v0 * Math.sin(angle * (Math.PI / 180));

    var interval = setInterval(function() {
        var x = v0x * t;
        var y = v0y * t - 0.5 * g * Math.pow(t, 2);

        var moon = document.querySelector('.moon');
        var moonX = moon.offsetLeft + moon.offsetWidth / 2;
        var moonY = moon.offsetTop + moon.offsetHeight / 2;

        var satelliteX = satellite.offsetLeft + satellite.offsetWidth / 2;
        var satelliteY = satellite.offsetTop + satellite.offsetHeight / 2;

        var deltaX = moonX - satelliteX;
        var deltaY = moonY - satelliteY;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        var v = v0 / 2; // Adjust this value to control the speed of the satellite

        if (distance > v) {
            var angleToMoon = Math.atan2(deltaY, deltaX);
            var vx = v * Math.cos(angleToMoon);
            var vy = v * Math.sin(angleToMoon);

            satellite.style.transform = `translate(${x + vx}px, ${y + vy}px)`;
        } else {
            clearInterval(interval);
        }

        t += 0.1;
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    const satellite = document.querySelector('.satellite');

    document.addEventListener('keydown', function(event) {
        if (event.key === ' ' || event.key === 'Spacebar') {
            satellite.style.animation = 'projectile-motion 2s forwards';
        }
    });
});

