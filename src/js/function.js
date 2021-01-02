function maxlength(obj, lg = 10) {    
    for (let i in document.querySelectorAll(obj)) {
        if (i.value.length > lg) {        i.value = i.value.slice(0, lg);    }
}
}
maxlength('input');