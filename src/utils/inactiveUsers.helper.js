const calculateTime = (last_online) => {
    const current_date = new Date();
    const timeDiff = Math.floor((current_date-last_online) / 8.64e7);
    
    if(timeDiff > 2) return false;
    return true
}

module.exports = calculateTime