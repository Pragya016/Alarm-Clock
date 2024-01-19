// selecting all the elements of html
const currentTime = document.querySelector('.cur-time');
const setNewAlarm = document.querySelector('.set-time');
const setNewAlarmBtn = document.querySelector('#set-alarm-btn');
const preSetAlarmTime = document.querySelector('.preSetAlarmTime');
const deleteBtn = document.querySelector('.dlt-alarm-btn');
const allAlarmsContainer = document.querySelector('#all-alarms');



// --------------------------------------------
// display the current time

function updateTime() {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    // selecting am or pm
    var ampm = (hours >= 12) ? "PM" : "AM";

    // getting hours minutes and seconds
    hours = (hours < 10) ? "0" + hours : hours - 12;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    // setting the tet content to current time
    let currentTimeString = `${hours} : ${minutes} : ${seconds} ${ampm}`;
    currentTime.textContent = currentTimeString;
}

setInterval(updateTime, 1000);
updateTime();


// --------------------------------------------
// setting new alarm 
// Assuming you have the startCountDown function defined here

setNewAlarmBtn.addEventListener('click', () => {
    // getting the input value
    const timeInput = setNewAlarm.value;
    let [hourVal, minVal] = timeInput.split(':');

    // Adjusting hourVal to 24-hour format if needed
    if (hourVal === '00') {
        hourVal = 12;
    }

    // html for newly created alarm
    const newAlarm = `
        <div class="alarm">
            <p class="preSetAlarmTime">
                ${hourVal}:${minVal} ${hourVal >= 12 ? 'PM' : 'AM'}
            </p>
            <button type="button" class="dlt-alarm-btn">
                Delete
            </button>
        </div>
    `;

    // inserting the html to the container
    setTimeout(() => {
        allAlarmsContainer.insertAdjacentHTML('beforeend', newAlarm);
        setNewAlarm.value = '00:00';

        // starting countdown timer
        startCountDown(parseInt(hourVal), parseInt(minVal), hourVal >= 12 ? 'PM' : 'AM');
    }, 300);
});

// --------------------------------------------
function startCountDown(hours, minutes, period) {
    const dateObj = new Date();
    const curHour = dateObj.getHours();
    const curPeriod = (curHour >= 12) ? "PM" : "AM";

    // Adjust hours to 24-hour format if the period matches the current period
    if (period === curPeriod) {
        hours = (hours % 12) + 12;
    } else {
        hours = hours % 12;
    }

    // Calculate total seconds
    const totalMin = (hours * 60) + minutes;
    let totalSeconds = totalMin * 60;

    // If the current time is already past the alarm time, adjust totalSeconds for the next day
    if (hours < curHour || (hours === curHour && minutes <= dateObj.getMinutes())) {
        totalSeconds += 24 * 60 * 60; // Add 24 hours in seconds
    }

    setTimeout(() => {
        alert('Alarm ended!!');
    }, (totalSeconds - (curHour * 60 + dateObj.getMinutes()) * 60) * 1000);
}

// Example usage
startCountDown(2, 30, 'PM');


// --------------------------------------------
// deleting the alarm
allAlarmsContainer.addEventListener('click', (e) => {
    // checking if delete alarm btn is present or not
    if (e.target.classList.contains('dlt-alarm-btn')) {

        // finding the closest element
        const alarmElement = e.target.closest('.alarm');

        // deleting the alarm
        if (alarmElement) {
            setTimeout(() => {
                alarmElement.remove();
            }, 300);
        }
    }
});
