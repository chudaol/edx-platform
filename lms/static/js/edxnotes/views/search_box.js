;(function (define, undefined) {
'use strict';
define(['jquery', 'underscore', 'backbone', 'js/edxnotes/collections/notes'],
function ($, _, Backbone, NotesCollection) {
    var SearchView = Backbone.View.extend({
        events: {
            'submit': 'submitHandler'
        },

        initialize: function (options) {
            _.bindAll(this);
            this.options = _.defaults(options, {
                search: function () {},
                error: function () {},
            });
            this.$el.removeClass('is-hidden');
        },

        submitHandler: function (event) {
            event.preventDefault();
            this.search();
        },

        /**
         * Prepares server response to appropriate structure.
         * @param  {Object} data The response form the server.
         * @return {Array}
         */
        prepareData: function (data) {
            var collection;

            if (!(data && data.total && data.rows)) {
                return [];
            }

            collection = new NotesCollection(data.rows, {parse: true});
            return [collection, data.total, this.searchQuery];
        },

        /**
         * Returns search text.
         * @return {String}
         */
        gerSearchQuery: function () {
            return this.$el.find('#search-field').val();
        },

        /**
         * Starts search.
         * @return {jQuery.Deferred}
         */
        search: function () {
            this.searchQuery = this.gerSearchQuery();
            return this.sendRequest(this.searchQuery)
                .done(this.onSuccess)
                .fail(this.onError);
        },

        onSuccess: function (data) {
            var args = this.prepareData(data);
            this.options.search.apply(this, args);
        },

        onError:function (jXHR, statusText) {
            var searchQuery = this.gerSearchQuery();
            this.options.error(statusText, searchQuery);
        },

        /**
         * Send request with appropriate configurations.
         * @param  {String} text Search query.
         * @return {jQuery.Deferred}
         */
        sendRequest: function (text) {
            return $.ajax({
                url: this.el.action,
                type: this.el.method,
                dataType: 'json',
                data: {
                    user: this.options.user,
                    course_id: this.options.courseId,
                    text: text
                }
            });
        }
    });

    return SearchView;
});
}).call(this, define || RequireJS.define);
