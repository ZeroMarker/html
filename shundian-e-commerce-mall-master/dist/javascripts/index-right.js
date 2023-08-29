window.onscroll = function() {
    var rightmenu = document.querySelector('.rightmenu');
    var scrollTop = document.body.scrollTop || (document.documentElement && document.documentElement.scrollTop);
    if (scrollTop <=500) {
        rightmenu.style.display = 'none';
    } else{
        rightmenu.style.display = 'block';
    }
}