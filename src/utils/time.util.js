function hoursClocked(swipedOut, swipedIn) {
    let diffInMilliSeconds = Math.abs(swipedOut - swipedIn) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
        difference += (days === 1) ? `${days} d, ` : `${days} d, `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} h, ` : `${hours} h, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} m` : `${minutes} m`;

    return difference;
}

function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;

    // return new Date(year, month, 0).getDate();
}


module.exports = {
    hoursClocked,
    getDaysInMonth
}