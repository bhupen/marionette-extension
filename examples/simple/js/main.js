"use strict";

require.config({
    paths: {
        jquery: '../../../bower_components/jquery/jquery',
        underscore: '../../../bower_components/underscore/underscore',
        backbone: '../../../bower_components/backbone/backbone',
        marionette: '../../../bower_components/marionette/lib/backbone.marionette',
        text: '../../../bower_components/requirejs-text/text',
        extension: '../../../dist/marionette.extension.min',
        handlebars: '../../../bower_components/handlebars/handlebars.amd'

    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        }
    }

});

require(
    [
        // external libraries with AMD support
        "jquery",
        "underscore",
        "backbone",
        "marionette",
        "extension",
        "handlebars"

    ], function ($, _, Backbone, Marionette, Extension, Handlebars) {

        var app = new Backbone.Marionette.Application();        // create a new instance of the Marionette app

        Extension.Context.setDebug(true);                       // debug Extension Context not require during deployment

        app.addRegions({                                        // add the initial region which will contain the app
            appRegion: '#AppBase'                               // reference to container element in the HTML file
        });

        app.module('App', function (module, App, Backbone, Marionette, $, _) {   // define a module to keep the code modular
            module.BookModel = Backbone.Model.extend({                          // definition for book model, with default example of data structure
                defaults: {
                    title: '',
                    authorFirst: '',
                    authorLast: '',
                    fullName: ''
                }
            });

            module.BookCollection = Backbone.Collection.extend({                // definition for book collection
                model: module.BookModel,                                        // set model type used for this collection
                comparator: 'sortOrder' //'title' //                            // comparator determines how collection is sorted
            });

            module.BookItemView = Marionette.DualDisplayItemView.extend({        // definition for individual item view
                tagName: 'li',

                editTemplate: Handlebars.default.compile($('#hitemEdit-template').html()),    // set edit template used to display edit view
                viewTemplate: Handlebars.default.compile($('#hitemView-template').html()),    // set view template used to display this view

                events: {                                                       // define UI events that the view will handle.
                    "click .moveUp": "onClickMoveUp",
                    "click .moveDown": "onClickMoveDown"
                },

                contextSyncEvents: {                                                    // Define message bus events that this widget will handle.
                    "viewUpdated": function () {                                        // Message received when parent has finished updating collection view.
                        console.log("Received View Updated in child VIEW");
                        this.context.options.view.$el.fadeOut('slow', function () {     // Just effect to show the view received the message
                            $(this).fadeIn('slow', function () { }) });
                    },
                    "binderUpdatedModel": function () {                                 // Message received when parent has finished updating collection view.
                        console.log("Model Update by Binder.");
                        var model = this.context.options.view.model;
                        model.set('fullName', model.get('authorFirst') + ' ' + model.get('authorLast'));
                    }
                },

                onClickDivToChangeMode: function() {
                    console.log('Click to change.');

                },

                onClickMoveUp: function () {                                            // Move UP button click handler.
                    console.log('Move UP');
                    this.context.dispatchGlobally("updateView", {
                        thisModel: this.model,
                        moveDirection: 'UP',
                        thisView: this
                    });
                },

                onClickMoveDown: function () {                                          // Move DOWN button click handler.
                    console.log('Move DOWN');
                    this.context.dispatchGlobally("updateView", {
                        thisModel: this.model,
                        moveDirection: 'DOWN',
                        thisView: this
                    });
                }
            });

            /* definition for collection view */
            module.BookCollectionView = Marionette.CollectionView.extend({
                tagName: 'ul',

                itemView: module.BookItemView,                                      // explicitly set the item view used to display the models in this collection

                viewMode: Marionette.DualDisplayItemView.Constants.ViewMode,        // Just mode constants to maintain the Collection view state.

                contextSyncEvents: {                                                // Define message bus events that this widget will handle.
                    "updateView": function () {
                        console.log(this);
                        var thisView = this.context.options.view;
                        var otherModel;
                        if (this.eventData.moveDirection == 'DOWN')
                            otherModel = thisView.collection.models[thisView.collection.indexOf(this.eventData.thisModel) + 1];
                        else if (this.eventData.moveDirection == 'UP')
                            otherModel = thisView.collection.models[thisView.collection.indexOf(this.eventData.thisModel) - 1];
                        else {
                            console.log('Nothing to do');
                            return;
                        }
                        if (otherModel) {
                            var tempValue = this.eventData.thisModel.get('sortOrder');
                            this.eventData.thisModel.set('sortOrder', otherModel.get('sortOrder'));
                            otherModel.set('sortOrder', tempValue);
                            thisView.collection.sort();
                            thisView.render();
                        }
                        this.context.dispatchTo(thisView.findViewByModel(this.eventData.thisModel)[1], 'viewUpdated');
                    }
                },

                itemViewOptions: function () {                                  // Optional parameter that will be sent to the child view during creation.
                    return {parentContext: this.context};
                },

                toggleMode: function () {
                    if (this.viewMode === Marionette.DualDisplayItemView.Constants.ViewMode)
                        this.viewMode = Marionette.DualDisplayItemView.Constants.EditMode;
                    else
                        this.viewMode = Marionette.DualDisplayItemView.Constants.ViewMode;
                    this.context.dispatchToChildren("changeMode", {viewMode: this.viewMode});
                }
            });

            var MyController = Marionette.Controller.extend({                           // Marionette object that is not of type Marionette.View

                initialize: function (options) {
                    this.stuff = options.stuff;
                    Extension.Context.addContextSyncEvents(this, {                        // Manually define message that this object will handle.
                        "updateView" : function () {
                            console.log('Received update view in CONTROLLER.' );
                        }
                    });
                },

                doStuff: function () {
                    this.trigger("stuff:done", this.stuff);
                }

            });

            /* define a view; in this case a 'Layout' */
            module.AppLayoutView = Marionette.Layout.extend({

                tagName: 'div',                                                         // the auto-generated element which contains this view

                id: 'AppContainer',                                                     // id attribute for the auto-generated container element

                template: '#layout-template',                                           // reference to the template which will be rendered for this view

                regions: {                                                              // define the regions within this layout, into which we will load additional views
                    'RegionOne': '#regionOne',
                    'RegionTwo': '#regionTwo'
                },

                initialize: function () {                                               // called when the view initializes, before it displays
                    console.log('main layout: initialize');
                },

                /* called when view renders in the DOM. This is a good place to
                 add nested views, because the views need existing DOM elements
                 into which to be rendered. */
                onRender: function () {
                    console.log('main layout: onRender');

                    /* create an array of books using anonymouse objects;
                     the objects have the same structure as in the 'defaults'
                     attribute of the module.BookModel definition */
                    var bookArray = [];
                    bookArray.push({sortOrder: 1, title: 'Wolf', authorLast: 'Harrison', authorFirst: 'Jim', fullName: 'Jim Harrison'});
                    bookArray.push({sortOrder: 2, title: 'The Theory and Practice of Rivers', authorLast: 'Snyder', authorFirst: 'Gary', fullName: 'Gary Snyder'});
                    bookArray.push({sortOrder: 3, title: 'Weather Central', authorLast: 'Kooser', authorFirst: 'Ted', fullName: 'Ted Kooser'});
                    bookArray.push({sortOrder: 4, title: 'Losing Season', authorLast: 'Ridl', authorFirst: 'Jack', fullName: 'Jack Ridl'});
                    bookArray.push({sortOrder: 5, title: 'Mornings Like This', authorLast: 'Dillard', authorFirst: 'Annie', fullName: 'Annie Dillard'});

                    /* create a collection using the array of anonymous objects */
                    var bookCollection = new module.BookCollection(bookArray);

                    window.bookCollection = bookCollection;

                    /* create new instance of the collection view using the bookCollection */
                    var bookCollectionView = new module.BookCollectionView({collection: bookCollection});

                    window.bookCollectionView = bookCollectionView;

                    //    window.regionOne = this.RegionOne;

                    /* display the collection view in region 1 */
                    this.RegionOne.show(bookCollectionView);

                    // Single item view to display
                    var SortableLi = Marionette.SortableItemView.extend({
                        template: _.template('<%=title%>'),
                        className: 'box'
                    });

                    // Collection View
                    var SortableList = Marionette.SortableCollectionView.extend({
                        itemView: SortableLi,

                        onDropItem: function (model) {
                            console.log('DROPPED ITEM', model);
                        }
                    });

                    // Create the view and assign the collection to it
                    var view = new SortableList({
                        collection: bookCollection
                    });
                    //     this.RegionTwo.show(view);

                    window.textController = new MyController();

                    /*
                     * From above we can run the following code in the console.
                     * window.bookCollectionView.collection.mode ls[1].set('authorLast', 'Berman');
                     * window.bookCollectionView.collection.sort();
                     * window.bookCollectionView.render();
                     * */
                }
            });

            module.addInitializer(function () {             // Tell the module what to do when it is done loading
                var layout = new module.AppLayoutView();    // create a new instance of the layout from the module
                app.appRegion.show(layout);                 // display the layout in the region defined at the top of this file
            });
        });

        $(document).ready(function () {     // once the DOM initializes, start the app
            app.start();
        });
    }
);
