;(function (define, gettext, interpolate, undefined) {
    'use strict';
    define(['jquery', 'backbone'], function ($, Backbone) {
        var TabModel = Backbone.Model.extend({
            defaults: {
                'name': '',
                'class_name': '',
                'is_active': false,
                'is_hidden': false,
                'close': null,
                'choose': null
            }
        });

        return TabModel;
    });
}).call(this, define || RequireJS.define, gettext, interpolate);
