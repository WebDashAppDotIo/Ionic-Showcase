// http://forum.ionicframework.com/t/how-to-opening-links-in-content-in-system-browser-instead-of-cordova-browser-wrapper/2427/13
angular.module('starter.controllers')
.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = $sanitize(text).replace(regex, "href=\"#\" onClick=\"window.open('$1', '_blank', 'location=yes');event.preventDefault()\"");

        return $sce.trustAsHtml(newString);
    }
    //usage: <p ng-bind-html="html | hrefToJS"></p>
});