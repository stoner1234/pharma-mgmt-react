export const formatDate = (inputDate = "") => {
    // Create a JavaScript Date object from the input string
    const dateParts = inputDate.split('-');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    const date = new Date(`${month} ${day}, ${year}`);
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthName = monthNames[date.getMonth()];
    const formattedDate = `${day} ${monthName}, ${year}`;
    return formattedDate;
};