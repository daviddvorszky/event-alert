document.addEventListener('DOMContentLoaded', () => {
    const bulkAddButton = document.getElementById('bulkAddButton');
    const deleteAllButton = document.getElementById('deleteAllButton');
    const eventList = document.getElementById('eventList');
    const alertTimeInput = document.getElementById('alertTime');
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let alertSetForEvents = [];
    let alertTimeouts = [];

    // Request permission for desktop notifications
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            }
        });
    }

    bulkAddButton.addEventListener('click', () => {
        const bulkInput = document.getElementById('bulkEvents').value;
        const bulkEvents = bulkInput.split('\n');
        bulkEvents.forEach(eventLine => {
            const [date, time, player, league] = eventLine.split(',').map(s => s.trim());
            if (date && time && player && league) {
                addEvent({ date, time, player, league });
            }
        });
    });

    deleteAllButton.addEventListener('click', () => {
        events = []; // Clear all events
        localStorage.setItem('events', JSON.stringify(events));
        displayEvents();
    
        // Clear all timeouts and reset arrays
        alertTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        alertTimeouts = [];
        alertSetForEvents = []; // Reset the alert set events array
    });
    

    function addEvent(event) {
        event.id = new Date().getTime() + Math.random().toString();
        // Check for duplicate event
        if (!events.some(e => e.date === event.date && e.time === event.time && e.player === event.player && e.league === event.league)) {
            events.push(event);
            events.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
            localStorage.setItem('events', JSON.stringify(events));
        } else {
            console.log("Duplicate event not added:", event);
        }
        displayEvents();
        setAlerts();
    }

    function displayEvents() {
        eventList.innerHTML = '';
        const now = new Date();
        events = events.filter(event => new Date(event.date + ' ' + event.time) > now); // Filter out past events
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = `${event.date} ${event.time} - ${event.player} - ${event.league}`;
            eventList.appendChild(li);
        });
        localStorage.setItem('events', JSON.stringify(events)); // Update local storage
    }

    function setAlerts() {
        events.forEach(event => {
            if (!alertSetForEvents.includes(event.id)) { // Check if alert is already set for this event
                const eventDateTime = new Date(event.date + ' ' + event.time);
                const alertLeadTime = parseInt(alertTimeInput.value, 10) * 60000;
                const alertTime = new Date(eventDateTime.getTime() - alertLeadTime);
                const now = new Date();
    
                if (alertTime > now) {
                    const timeoutId = setTimeout(() => {
                        new Notification(`Upcoming event: ${event.player} in ${event.league}`);
                    }, alertTime.getTime() - now.getTime());
    
                    alertTimeouts.push(timeoutId); // Store the setTimeout identifier
                    alertSetForEvents.push(event.id); // Mark this event as having an alert set
                }
            }
        });
    }
    

    displayEvents();
    setAlerts();
});
