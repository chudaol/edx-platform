;(function (define, undefined) {
'use strict';
define([
    'backbone',
    'js/edxnotes/collections/tabs',
    'js/edxnotes/views/tabs',
    'js/edxnotes/views/search',
    'js/edxnotes/views/recent_activity_view',
    'js/edxnotes/views/search_results_view'
], function (
    Backbone, TabsCollection, TabsView, SearchView, RecentActivityView, SearchResultsView
) {
    var NotesPageView = Backbone.View.extend({
        views: {
            'recent': RecentActivityView,
            'search': SearchResultsView
        },

        initialize: function (options) {
            _.bindAll(this);
            this.options = options;
            this.searchResults = null;
            this.previousView = null;

            this.searchBox = new SearchView({
                el: this.$el.find('form').get(0),
                token: this.options.authToken,
                user: this.options.user,
                courseId: this.options.courseId,
                search: this.onSearch,
                error: this.onSearchError
            });

            this.tabsView = new TabsView({
                collection: new TabsCollection([
                    {
                        name: gettext('Recent Activity'),
                        class_name: 'tab-recent-activity',
                        choose: this.displayRecentActivity
                    },
                    {
                        name: gettext('Search Results'),
                        class_name: 'tab-search-results',
                        choose: this.displaySearchResults,
                        close: this.closeSearchResults
                    }
                ])
            }).render();

            this.tabsView.$el.appendTo(this.$('.course-info'));

            this.displayDefaultView();
        },

        render: function (viewName, collection) {
            var ViewConstructor = this.getViewConstructor(viewName);

            // this.chooseTab(viewName);
            collection = collection || this.collection;
            this.showLoadingIndicator();

            if (this.currentView) {
                // Destroy current view.
                this.currentView.destroy();
            }

            // this.previousView = this.currentView;
            this.currentView = new ViewConstructor({collection: collection}).render();
            this.$('.course-info').append(this.currentView.$el);
            this.hideLoadingIndicator();
        },

        getViewConstructor: function (viewName) {
            return this.views[viewName];
        },

        onSearch: function (collection, total, searchQuery) {
            this.searchResults = {
                collection: collection,
                total: total,
                searchQuery: searchQuery
            };
            this.displaySearchResults();
        },

        onSearchError: function (statusText) {
            console.log(statusText);
        },

        displayDefaultView: function () {
            this.displayRecentActivity();
        },

        displaySearchResults: function () {
            if (this.searchResults) {
                this.render('search', this.searchResults.collection);
            }
        },

        displayRecentActivity: function () {
            this.render('recent');
        },

        closeSearchResults: function () {
            this.searchResults = null;
        },

        /**
         * Show the page's loading indicator.
         */
        showLoadingIndicator: function() {
            this.$('.ui-loading').removeClass('is-hidden');
        },

        /**
         * Hide the page's loading indicator.
         */
        hideLoadingIndicator: function() {
            this.$('.ui-loading').addClass('is-hidden');
        }
    });

    return NotesPageView;
});
}).call(this, define || RequireJS.define);
