// ==UserScript==
// @name         Examensarbete
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Examensarbete Frida Lövborg (a18frilo)
// @author       You
// @match        http://localhost:8888/lenasys/DuggaSys/courseed.php
// @grant        none
// ==/UserScript==

(function() {
    var date = new Date();
    var counter = parseInt(localStorage.getItem("Counter"));
    var reload = 100;

    if (counter > reload) {
        downloadMeasure();
    } else {
        if (isNaN(counter)) counter = 0;
        if (counter == 0) {
            str = 'data:text/csv;charset=utf-8';
        } else {
            // Calculate the time between each reload, new time subtract old time
            var oldValue = new Date(localStorage.getItem('oldValue'));
            var delta = date - oldValue;
            var str = localStorage.getItem('data');
            str += ', ' + delta;
        }

        // Increase counter and save data to local storage
        counter++;
        localStorage.setItem('Counter', counter);
        localStorage.setItem('data', str);

        var newDate = new Date();
        localStorage.setItem('oldValue', newDate);

        // Reload page
        location.reload(true);
    }

    // File download when measurments is done
    function downloadMeasure() {
        var str = localStorage.getItem('data');
        var anchor = document.createElement('a');
        anchor.setAttribute('href', encodeURI(str));
        anchor.setAttribute('download', 'measurments.js');
        anchor.innerHTML = 'Download measurments';
        document.body.appendChild(anchor);
        anchor.click();
    }
})();