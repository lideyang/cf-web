﻿define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports = {
        init: function () {
            require('jquery/plugins/cityPicker');
            $("#areaInput").CityPicker();
        }
    }
});