# Sports Event Scheduler

The Sports Event Scheduler is a simple web application designed to help users keep track of upcoming sports events. Users can add events in bulk, receive desktop notifications before each event, and view a list of upcoming events.

## Features

- **Bulk Event Addition**: Users can add one or more events at once by specifying the date, time, player, and league.
- **Desktop Notifications**: The application provides desktop notifications for upcoming events, customizable to alert users a specified number of minutes before each event starts.
- **Event List Display**: Displays all upcoming sports events.
- **Local Storage**: Events are stored in the browser's local storage, allowing the list to persist even after reloading the page.
- **Delete Functionality**: Users can delete all events at once with a single click.

## How to Use

1. **Add Events**: Enter each event in the provided text area in the format `date, time, player, league`. Each event should be on a new line.
2. **Set Alert Time**: Specify how many minutes before each event you want to receive a notification.
3. **View Upcoming Events**: The list of upcoming events is displayed under the "Upcoming Events" section.
4. **Delete Events**: Click the "Delete All Events" button to clear all events.

## Important Notes

- Ensure that desktop notifications are enabled in both your browser and your operating system for the notifications to work properly.
- The application uses local storage to persist data. Clearing your browser's local storage will remove all saved events.

## Technology

This application uses HTML, inline CSS, and JavaScript with no external dependencies. It showcases the Notification API and local storage use in web development.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/daviddvorszky/event-alert/issues) if you want to contribute.

## License

[MIT License](https://github.com/daviddvorszky/event-alert/blob/main/LICENSE.txt)
