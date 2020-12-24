window.addEventListener('load', () => {
    usePoint = document.getElementById('usePoint');
    usePoint.addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:block');
    })
    usePointbtn = document.getElementById('usePointbtn');
    usePointbtn.addEventListener('click', () => {
        document.getElementById('pointTable').setAttribute('style', 'display:none');
    })
})