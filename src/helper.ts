
export const formatDate = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    if (hours === 0) hours = 12;
  
    // Pad day and month with a leading zero if needed
    const dayStr = day < 10 ? `0${day}` : day;
    const monthStr = month < 10 ? `0${month}` : month;

    // Ensure minutes are two digits
    const minuteStr = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${dayStr}-${monthStr}-${year} ${hours}.${minuteStr} ${ampm}`;
};
