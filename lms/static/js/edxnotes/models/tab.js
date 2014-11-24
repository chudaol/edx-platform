;(function (define, gettext, interpolate, undefined) {
    'use strict';
    define(['jquery', 'backbone'], function ($, Backbone) {
        var TabModel = Backbone.Model.extend({
            defaults: {
                'name': '',
                'class_name': '',
                'is_active': false,
                'is_closable': false,
                'close': null,
                'render': null
            }
        });

        return TabModel;
    });
}).call(this, define || RequireJS.define, gettext, interpolate);
