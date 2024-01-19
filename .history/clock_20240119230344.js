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

setNewAlarmBtn.addEventListener('click', () => {
    // getting the input value
    const timeInput = setNewAlarm.value;
    let [hourVal, minVal] = timeInput.split(':');

    const period = hourVal >= 12 ? 'PM' : 'AM';

    // console.log(minVal, hourVal)
    if (hourVal === '00') {
        hourVal = 12;
    } else if (hourVal > 12) {
        hourVal %=
    } else {
        
    }

    // html for newly created alarm
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

    // inserting the html to the container
    setTimeout(() => {
        allAlarmsContainer.insertAdjacentHTML('beforeend', newAlarm);
        setNewAlarm.value = '00:00';
        startCountDown(hourVal, minVal, period);
    }, 300);

});

// --------------------------------------------
function startCountDown(hours, minutes, period) {
    // Convert hours to 24-hour format if PM
    if (period.toLowerCase() === 'pm') {
        hours = (hours % 12) + 12;
    } else {
        hours = hours % 12;
    }

    // calculating seconds
    const totalMin = (hours * 60) + minutes;
    let totalSeconds = totalMin * 60;

    setTimeout(() => {
        alert('alarm ended!!');
   }, totalSeconds * 1000); 
}

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
