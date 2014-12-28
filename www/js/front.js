// see https://blog.nraboy.com/2014/12/open-dynamic-links-using-cordova-inappbrowser/
document.onclick = function (e) {
    e = e ||  window.event;
    var element = e.target || e.srcElement;
    if (element.tagName == 'A') {
        window.open(element.href, "_blank", "location=yes");
        return false;
    }
};
