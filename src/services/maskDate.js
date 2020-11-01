export const maskDate = value => {
    var predate         = new Date(value);
    var preday          = (predate.getDate() < 10) ? "0" + predate.getDate() : predate.getDate();
    var premonth        = ((predate.getMonth()+1) < 10) ? "0" + (predate.getMonth()+1) : (predate.getMonth()+1);
    var predateformated = preday  + "-" + premonth + "-" + predate.getFullYear();

    var date         = new Date(predateformated);
    var day          = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
    var month        = ((date.getMonth()+1) < 10) ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
    var dateformated = date.getFullYear() + "-" + month + "-" + day ;

    return dateformated;
}

export const unmaskDate = value => {
    var date         = new Date(value);    
    var day          = ((date.getDate()+1) < 10) ? "0" + (date.getDate()+1) : (date.getDate()+1);
    var month        = ((date.getMonth()+1) < 10) ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
    var dateformated = day  + "/" + month + "/" + date.getFullYear();

    return dateformated;
}