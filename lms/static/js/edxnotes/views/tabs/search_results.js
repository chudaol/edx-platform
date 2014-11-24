;(function (define, undefined) {
'use strict';
define([
    'jquery', 'underscore', 'backbone', 'js/edxnotes/views/tab_aggregator',
    'js/edxnotes/views/subview', 'js/edxnotes/views/search'
], function ($, _, Backbone, TabAggregatorView, SubView, SearchView) {
    var SearchResultsView = TabAggregatorView.extend({

        SubViewConstructor: SubView.extend({
            id: 'edx-notes-page-search-results'
        }),

        tabInfo: {
            name: gettext('Search Results'),
            class_name: 'tab-search-results',
            is_closable: true,
            is_hidden: true
        },

        initialize: function (options) {
            TabAggregatorView.prototype.initialize.call(this, options);
            this.searchResults = null;
            this.searchBox = new SearchView({
                el: this.$('form').get(0),
                token: this.options.token,
                user: this.options.user,
                courseId: this.options.courseId,
                search: this.onSearch,
                error: this.onSearchError
            });
        },

        getCollection: function () {
            if (this.searchResults) {
                return this.searchResults.collection;
            }

            return null;
        },

        onClose: function () {
            this.searchResults = null;
        },

        onSearch: function (collection, total, searchQuery) {
            this.searchResults = {
                collection: collection,
                total: total,
                searchQuery: searchQuery
            };

            if (!this.tabModel) {
                this.createTab();
            }

            if (!this.tabModel.get('is_active')) {
                this.tabModel.set('is_active', true);
            } else {
                this.renderContent();
            }

        },

        onSearchError: function (statusText) {
            console.log(statusText);
        }
    });

    return SearchResultsView;
});
}).call(this, define || RequireJS.define);
