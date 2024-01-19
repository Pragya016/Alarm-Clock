// Selecting all the elements of HTML
const currentTime = document.querySelector('.cur-time');
const setNewAlarm = document.querySelector('.set-time');
const setNewAlarmBtn = document.querySelector('#set-alarm-btn');
const preSetAlarmTime = document.querySelector('.preSetAlarmTime');
const deleteBtn = document.querySelector('.dlt-alarm-btn');
const allAlarmsContainer = document.querySelector('#all-alarms');

// --------------------------------------------
// Display the current time

function updateTime() {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    // Selecting AM or PM
    var ampm = (hours >= 12) ? "PM" : "AM";

    // Getting hours, minutes, and seconds
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    // Setting the text content to current time
    let currentTimeString = `${hours} : ${minutes} : ${seconds} ${ampm}`;
    currentTime.textContent = currentTimeString;
}

setInterval(updateTime, 1000);
updateTime();

// --------------------------------------------
// Setting new alarm

setNewAlarmBtn.addEventListener('click', () => {
    // Getting the input value
    const timeInput = setNewAlarm.value;
    let [hourVal, minVal] = timeInput.split(':');

    const period = hourVal >= 12 ? 'PM' : 'AM';

    // Adjusting hourVal for 12-hour format
    if (hourVal === '00') {
        hourVal = 12;
    } else if (hourVal > 12) {
        hourVal %= 12;
    }

    // HTML for the newly created alarm
    const newAlarm = `
            <div class="alarm">
                <p class="preSetAlarmTime">
                    ${hourVal}:${minVal} ${period}
                </p>
                <button type="button" class="dlt-alarm-btn">
                    Delete
                </button>
            </div>
        `;

    // Inserting the HTML to the container
    allAlarmsContainer.insertAdjacentHTML('beforeend', newAlarm);

    // Starting countdown for the new alarm
    startCountDown(hourVal, minVal, period);

    // Clearing the input field
    setNewAlarm.value = '00:00';
});

// --------------------------------------------
// Deleting the alarm

allAlarmsContainer.addEventListener('click', (e) => {
    // Checking if delete alarm btn is present or not
    if (e.target.classList.contains('dlt-alarm-btn')) {

        // Finding the closest element
        const alarmElement = e.target.closest('.alarm');

        // Deleting the alarm
        if (alarmElement) {
            alarmElement.remove();
        }
    }
});

// --------------------------------------------
// Countdown function

function startCountDown(hours, minutes, period) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    let targetDate = new Date();

    // Convert hours to 24-hour format if PM
    if (period.toLowerCase() === 'pm') {
        hours = (hours % 12) + 12;
    } else {
        hours = hours % 12;
    }

    // Check if the specified time has already passed today
    if (currentHours > hours || (currentHours === hours && currentMinutes > minutes)) {
        // If yes, set the alarm for the same time on the next day
        targetDate.setDate(targetDate.getDate() + 1);
    }

    // Set the target time on the specified date
    targetDate.setHours(hours, minutes, 0, 0);

    const remainingTime = targetDate.getTime() - now.getTime();

    setTimeout(() => {
        alert('Alarm ended!!');
    }, remainingTime);
}
