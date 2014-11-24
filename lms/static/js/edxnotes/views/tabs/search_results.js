;(function (define, undefined) {
'use strict';
define([
    'gettext', 'js/edxnotes/views/tab_aggregator',
    'js/edxnotes/views/subview', 'js/edxnotes/views/search_box'
], function (gettext, TabAggregatorView, SubView, SearchBoxView) {
    var SearchResultsView = TabAggregatorView.extend({

        SubViewConstructor: SubView.extend({
            id: 'edx-notes-page-search-results'
        }),

        tabInfo: {
            name: gettext('Search Results'),
            class_name: 'tab-search-results',
            is_closable: true
        },

        initialize: function (options) {
            TabAggregatorView.prototype.initialize.call(this, options);
            this.searchResults = null;
            this.searchBox = new SearchBoxView({
                el: this.$('form').get(0),
                token: this.options.token,
                user: this.options.user,
                courseId: this.options.courseId,
                search: this.onSearchError,
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
            this.hideErrorMessage();

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
            this.showErrorMessage(statusText);
        }
    });

    return SearchResultsView;
});
}).call(this, define || RequireJS.define);
