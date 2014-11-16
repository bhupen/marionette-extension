!function (a) {
    "function" == typeof define && define.amd ? define(["underscore", "jquery", "backbone", "marionette"], a) : "undefined" != typeof module && module.exports ? module.exports = a(require("underscore"), require("jquery"), require("backbone"), require("marionette")) : a(_, jQuery, Backbone, Marionette)
}(function (a, b, c, d) {
    "use strict";
    function e(b, c) {
        var d = [b, null].concat(c), e = a.bind.apply(b, d);
        return new e
    }

    if (!c)throw"Please include Backbone.js, Marionette.js before marionette.extension.js";
    c.ViewBinder = function () {
        a.bindAll.apply(a, [this].concat(a.functions(this)))
    }, c.ViewBinder.SetOptions = function (a) {
        c.ViewBinder.options = a
    }, c.ViewBinder.Constants = {
        ModelToView: "ModelToView",
        ViewToModel: "ViewToModel"
    }, a.extend(c.ViewBinder.prototype, function () {
        var d = function (a, c, d, e) {
            f.apply(this), this._model = a, this._rootEl = c, g.apply(this, [e]), this._model || F("model must be specified"), this._rootEl || F("rootEl must be specified"), d ? (this._attributeBindings = b.extend(!0, {}, d), h.apply(this), j.apply(this)) : i.apply(this), k.apply(this), o.apply(this)
        }, e = function (a, b, c, e, f) {
            this._triggers = c, d.apply(this, [a, b, e, f])
        }, f = function () {
            n.apply(this), p.apply(this), this._attributeBindings && (delete this._attributeBindings, this._attributeBindings = void 0)
        }, g = function (b) {
            this._options = a.extend({boundAttribute: "name"}, c.ViewBinder.options, b), this._options.modelSetOptions || (this._options.modelSetOptions = {}), this._options.modelSetOptions.changeSource = "ViewBinder", this._options.changeTriggers || (this._options.changeTriggers = {
                "": "change",
                "[contenteditable]": "blur"
            }), this._options.initialCopyDirection || (this._options.initialCopyDirection = c.ViewBinder.Constants.ModelToView)
        }, h = function () {
            var b, c, d, e, f;
            for (b in this._attributeBindings) {
                for (c = this._attributeBindings[b], a.isString(c) ? d = {elementBindings: [{selector: c}]} : a.isArray(c) ? d = {elementBindings: c} : a.isObject(c) ? d = {elementBindings: [c]} : F.apply(this, ["Unsupported type passed to Model Binder " + d]), e = 0; e < d.elementBindings.length; e++)f = d.elementBindings[e], f.attributeBinding = d;
                d.attributeName = b, this._attributeBindings[b] = d
            }
        }, i = function () {
            var a, c, d, e, f;
            for (this._attributeBindings = {}, c = b("[" + this._options.boundAttribute + "]", this._rootEl), a = 0; a < c.length; a++)d = c[a], e = b(d).attr(this._options.boundAttribute), this._attributeBindings[e] ? this._attributeBindings[e].elementBindings.push({
                attributeBinding: this._attributeBindings[e],
                boundEls: [d]
            }) : (f = {attributeName: e}, f.elementBindings = [{
                attributeBinding: f,
                boundEls: [d]
            }], this._attributeBindings[e] = f)
        }, j = function () {
            var a, c, d, e, f, g, h;
            for (a in this._attributeBindings)for (c = this._attributeBindings[a], d = 0; d < c.elementBindings.length; d++)if (e = c.elementBindings[d], f = "" === e.selector ? b(this._rootEl) : b(e.selector, this._rootEl), 0 === f.length)F.apply(this, ["Bad binding found. No elements returned for binding selector " + e.selector]); else for (e.boundEls = [], g = 0; g < f.length; g++)h = f[g], e.boundEls.push(h)
        }, k = function () {
            this._model.on("change", w, this), this._options.initialCopyDirection === c.ViewBinder.Constants.ModelToView && l.apply(this)
        }, l = function (b) {
            var c, d;
            for (c in this._attributeBindings)(void 0 === b || -1 !== a.indexOf(b, c)) && (d = this._attributeBindings[c], x.apply(this, [d]))
        }, m = function () {
            var a, c, d, e, f, g;
            for (a in this._attributeBindings)for (c = this._attributeBindings[a], d = 0; d < c.elementBindings.length; d++)if (e = c.elementBindings[d], r.apply(this, [e]))if (t.apply(this, [e]))g = u.apply(this, [e]), g && B.apply(this, [e, g]); else for (f = 0; f < e.boundEls.length; f++)g = b(e.boundEls[f]), s.apply(this, [g]) && B.apply(this, [e, g])
        }, n = function () {
            this._model && (this._model.off("change", w), this._model = void 0)
        }, o = function () {
            a.each(this._options.changeTriggers, function (a, c) {
                var d = this;
                b(this._rootEl).delegate(c, a, function (a) {
                    q.apply(d, [a])
                })
            }, this), this._options.initialCopyDirection === c.ViewBinder.Constants.ViewToModel && m.apply(this)
        }, p = function () {
            this._options && this._options.changeTriggers && a.each(this._options.changeTriggers, function (a, c) {
                var d = this;
                b(this._rootEl).undelegate(c, a, function (a) {
                    q.apply(d, [a])
                })
            }, this)
        }, q = function (a) {
            var c, d, e, f;
            for (c = b(a.target)[0], d = v.apply(this, [c]), e = 0; e < d.length; e++)f = d[e], r.apply(this, [f]) && B.apply(this, [f, c])
        }, r = function (a) {
            return void 0 === a.elAttribute || "text" === a.elAttribute || "html" === a.elAttribute
        }, s = function (a) {
            var b = a.attr("contenteditable");
            return b || a.is("input") || a.is("select") || a.is("textarea")
        }, t = function (a) {
            var c, d, e = a.boundEls.length > 0;
            for (c = 0; c < a.boundEls.length; c++)if (d = b(a.boundEls[c]), "radio" !== d.attr("type")) {
                e = !1;
                break
            }
            return e
        }, u = function (a) {
            var c, d;
            for (c = 0; c < a.boundEls.length; c++)if (d = b(a.boundEls[c]), "radio" === d.attr("type") && d.attr("checked"))return d;
            return void 0
        }, v = function (a) {
            var b, c, d, e, f, g, h = [];
            for (b in this._attributeBindings)for (c = this._attributeBindings[b], d = 0; d < c.elementBindings.length; d++)for (e = c.elementBindings[d], f = 0; f < e.boundEls.length; f++)g = e.boundEls[f], g === a && h.push(e);
            return h
        }, w = function () {
            var a, b;
            for (a in this._model.changedAttributes())b = this._attributeBindings[a], b && x.apply(this, [b])
        }, x = function (a) {
            var d, e, f, g, h, i;
            for (h = this._model.get(a.attributeName), d = 0; d < a.elementBindings.length; d++)for (e = a.elementBindings[d], f = 0; f < e.boundEls.length; f++)g = e.boundEls[f], g._isSetting || (i = E.apply(this, [c.ViewBinder.Constants.ModelToView, e, h]), y.apply(this, [b(g), e, i]))
        }, y = function (a, b, c) {
            b.elAttribute ? z.apply(this, [a, b, c]) : A.apply(this, [a, c])
        }, z = function (b, d, e) {
            switch (d.elAttribute) {
                case"html":
                    b.html(e);
                    break;
                case"text":
                    b.text(e);
                    break;
                case"enabled":
                    b.prop("disabled", !e);
                    break;
                case"displayed":
                    b[e ? "show" : "hide"]();
                    break;
                case"hidden":
                    b[e ? "hide" : "show"]();
                    break;
                case"css":
                    b.css(d.cssAttribute, e);
                    break;
                case"class":
                    var f = this._model.previous(d.attributeBinding.attributeName), g = this._model.get(d.attributeBinding.attributeName);
                    a.isUndefined(f) && a.isUndefined(g) || (f = E.apply(this, [c.ViewBinder.Constants.ModelToView, d, f]), b.removeClass(f)), e && b.addClass(e);
                    break;
                default:
                    b.attr(d.elAttribute, e)
            }
        }, A = function (a, b) {
            if (a.attr("type"))switch (a.attr("type")) {
                case"radio":
                    a.prop("checked", a.val() === b);
                    break;
                case"checkbox":
                    a.prop("checked", !!b);
                    break;
                case"file":
                    break;
                default:
                    a.val(b)
            } else a.is("input") || a.is("select") || a.is("textarea") ? a.val(b || (0 === b ? "0" : "")) : a.text(b || (0 === b ? "0" : ""))
        }, B = function (a, d) {
            var e, f, g;
            d._isSetting || (d._isSetting = !0, e = D.apply(this, [a, b(d)]), d._isSetting = !1, e && a.converter && (f = this._model.get(a.attributeBinding.attributeName), g = E.apply(this, [c.ViewBinder.Constants.ModelToView, a, f]), y.apply(this, [b(d), a, g])), this._associatedView && this._associatedView.context.dispatch("binderUpdatedModel", this))
        }, C = function (a, b) {
            switch (b.attr("type")) {
                case"checkbox":
                    return b.prop("checked") ? !0 : !1;
                default:
                    return void 0 !== b.attr("contenteditable") ? b.html() : b.val()
            }
        }, D = function (a, b) {
            var d = {}, e = C.apply(this, [a, b]);
            return e = E.apply(this, [c.ViewBinder.Constants.ViewToModel, a, e]), d[a.attributeBinding.attributeName] = e, this._model.set(d, this._options.modelSetOptions)
        }, E = function (a, b, c) {
            return b.converter ? c = b.converter(a, c, b.attributeBinding.attributeName, this._model, b.boundEls) : this._options.converter && (c = this._options.converter(a, c, b.attributeBinding.attributeName, this._model, b.boundEls)), c
        }, F = function (a) {
            if (!this._options.suppressThrows)throw a;
            "undefined" != typeof console && console.error && console.error(a)
        };
        return {bind: d, bindCustomTriggers: e, unbind: f}
    }()), c.ViewBinder.SelectBoxCollectionLookup = function (b) {
        if (this._collection = b, !this._collection)throw"Collection must be defined";
        a.bindAll(this, "convert")
    }, a.extend(c.ViewBinder.SelectBoxCollectionLookup.prototype, {
        convert: function (a, b) {
            return a === c.ViewBinder.Constants.ModelToView ? b ? b.id : void 0 : this._collection.get(b)
        }
    }), c.ViewBinder.createDefaultBindings = function (a, c, d, e) {
        var f, g, h, i, j = {};
        for (f = b("[" + c + "]", a), g = 0; g < f.length; g++)if (h = f[g], i = b(h).attr(c), !j[i]) {
            var k = {selector: "[" + c + '="' + i + '"]'};
            j[i] = k, d && (j[i].converter = d), e && (j[i].elAttribute = e)
        }
        return j
    }, c.ViewBinder.combineBindings = function (b, c) {
        return a.each(c, function (a, c) {
            var d = {selector: a.selector};
            a.converter && (d.converter = a.converter), a.elAttribute && (d.elAttribute = a.elAttribute), b[c] = b[c] ? [b[c], d] : d
        }), b
    }, function () {
        var a = d.ItemView.prototype.render;
        d.ItemView.prototype.render = function () {
            var b = a.apply(this);
            return this.model && this.$el && (this._modelViewBinder || (this._modelViewBinder = new c.ViewBinder), this._modelViewBinder.bind(this.model, this.$el), this._modelViewBinder._associatedView = this), b
        };
        var b = d.ItemView.prototype.close;
        d.ItemView.prototype.close = function () {
            return this._modelViewBinder && this._modelViewBinder.unbind(), b.apply(this)
        }
    }();
    var f = "no mapping found for key: ", g = {
        SINGLETON: "singleton",
        VIEW: "view",
        OTHER: "other"
    }, h = function (b, c, d) {
        if (!a.isObject(b) || !a.isFunction(b.listenTo) || !a.isFunction(b.stopListening))throw"Target for listen() must define a 'listenTo' and 'stopListening' function";
        if (!a.isString(c))throw"eventName must be a String";
        if (!a.isFunction(d))throw"callback must be a function"
    }, i = {};
    i.EVENT_CONTEXT_SHUTDOWN = "Context:contextShutdown";
    var j = {};
    i = function (b) {
        this._mappings = {}, this.options = b || {}, this.parentContext = this.options.parentContext, this.vent = {}, a.extend(this.vent, c.Events), this._contextId = a.uniqueId("Context"), j[this._contextId] = this;
        var d = this.wiring || this.options.wiring;
        d && _configureWirings.apply(this, [d]), a.isFunction(this.initialize) && this.initialize.apply(this, arguments)
    }, i.extend = c.View.extend, a.extend(i.prototype, function () {
        var b = function (b) {
            var c;
            if (b.params) {
                var d = a.map(b.params, function (b) {
                    return a.isFunction(b) && (b = b(this)), b
                }, this);
                c = e(b.clazz, d)
            } else c = new b.clazz;
            return c.initialize || x.apply(this, [c, b.wiring]), c
        }, c = function (a, d) {
            var e;
            if (this._mappings.hasOwnProperty(a)) {
                var h = this._mappings[a];
                d || h.type !== g.SINGLETON ? h.type === g.VIEW ? e = h.clazz : h.clazz && (e = b.apply(this, [h])) : (h.object || (h.object = b.apply(this, [h])), e = h.object)
            } else {
                if (!this.parentContext || !v.apply(this.parentContext, [a]))throw new Error(f + a);
                e = c.apply(this.parentContext, [a, d])
            }
            return e
        }, d = function (b) {
            a.each(b.contextEvents, function (c, d) {
                a.isFunction(c) ? this.listen(b, d, c) : a.isString(c) && this.listen(b, d, b[c])
            }, this)
        }, k = function (b) {
            b.listen = a.bind(this.listen, this), b.dispatch = a.bind(this.dispatch, this)
        }, l = function (a, b, c) {
            return h(a, b, c), a.listenTo(this.vent, b, c, a)
        }, m = function (a, b, c) {
            return h(a, b, c), a.listenToOnce(this.vent, b, c, a)
        }, n = function (b, c) {
            if (!a.isUndefined(c) && !a.isObject(c))throw"Event payload must be an object";
            c = c || {}, c.eventName = b, this.vent.trigger(b, c)
        }, o = function (a, b) {
            this.parentContext && this.parentContext.vent.trigger(a, b)
        }, p = function B(a, b) {
            !this.parentContext || b && b.propagationDisabled || (this.parentContext.vent.trigger(a, b), this.parentContext && B.apply(this.parentContext, [a, b]))
        }, q = function (b, c) {
            a.each(j, function (a) {
                return a && a.parentContext && this === a.parentContext && a.vent.trigger(b, c), !0
            }, this)
        }, r = function (b, c, d) {
            a.each(j, function (a) {
                return a && b.context && null != b.context && (a === b.context || b === a || a.options && a.options.view && b === a.options.view) && a.vent.trigger(c, d), !0
            })
        }, s = function (b, c) {
            a.each(j, function (a) {
                return a ? void a.vent.trigger(b, c) : !0
            })
        }, t = function (b, c, d) {
            var e = this;
            if (!a.isFunction(c))throw"Command must be constructable";
            this.vent.listenTo(this.vent, b, function (f) {
                var g = new c(e, b, f);
                g.context = e, g.eventName = b, g.eventData = f, e.resolve(g, d), a.isFunction(g.execute) && g.execute()
            })
        }, u = function (b) {
            var c = this;
            a.each(b, function (b, d) {
                a.isArray(b) ? a.each(b, function (a) {
                    t.apply(c, [d, a])
                }) : t.apply(c, [d, b])
            })
        }, v = function (a) {
            return this._mappings.hasOwnProperty(a) || !!this.parentContext && v.apply(this.parentContext, [a])
        }, w = function (a) {
            return c.apply(this, [a, !1])
        }, x = function (b, c) {
            if (c = c || b.wiring) {
                var e = Number(!a.isArray(c));
                a.each(c, function (a) {
                    b[arguments[e]] = w.apply(this, [a])
                }, this)
            }
            return k.apply(this, [b]), d.apply(this, [b]), this
        }, y = function (a) {
            return delete this._mappings[a], this
        }, z = function () {
            return this._mappings = {}, this
        }, A = function () {
            this.vent.stopListening(), z.apply(this), delete j[this._contextId], o.apply(this, [i.EVENT_CONTEXT_SHUTDOWN])
        };
        return {
            listen: l,
            listenToOnce: m,
            dispatch: n,
            dispatchToParent: o,
            dispatchToParents: p,
            dispatchTo: r,
            dispatchGlobally: s,
            dispatchToChildren: q,
            destroy: A,
            release: y,
            releaseAll: z,
            wireCommand: t,
            wireCommands: u,
            resolve: x
        }
    }()), i.bindContext = function (a) {
        this.options = a || {};
        var b = this.options.view, c = null;
        "function" == typeof this.options.context ? (c = new this.options.context(this.options), b.close || (b.close = function () {
            b.trigger("close"), b.remove()
        }), b.on("close", function () {
            b.off("close"), c.destroy()
        })) : "object" == typeof this.options.context && (c = this.options.context), c.resolve(b);
        var d;
        return b.wiring || (b.context = c, d = c), d
    };
    var k = {
        contexts: j, countEvents: function () {
            var b = 0;
            return a.each(j, function (c, d) {
                j.hasOwnProperty(d) && (b += a.size(c.vent._events))
            }), b
        }, countContexts: function () {
            var b = 0;
            return a.each(j, function (a, c) {
                j.hasOwnProperty(c) && b++
            }), b
        }
    };
    return i.setDebug = function (a) {
        return this.debug = a ? k : void 0, this.debug
    }, c.Context = i, function () {
        function a(a) {
            return j.lastIndex = 0, j.test(a) ? '"' + a.replace(j, function (a) {
                var b = k[a];
                return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }

        function b(e, f, g, h) {
            var i, j, k, l, m = f[e];
            switch (m && "object" == typeof m && "function" == typeof m.toPrunedJSON && (m = m.toPrunedJSON(e)), typeof m) {
                case"string":
                    return a(m);
                case"number":
                    return isFinite(m) ? String(m) : "null";
                case"boolean":
                case"null":
                    return String(m);
                case"object":
                    if (!m)return "null";
                    if (0 >= g || -1 !== c.indexOf(m))return '"-pruned-"';
                    if (c.push(m), l = [], "[object Array]" === Object.prototype.toString.apply(m)) {
                        for (k = Math.min(m.length, h), i = 0; k > i; i += 1)l[i] = b(i, m, g - 1, h) || "null";
                        return "[" + l.join(",") + "]"
                    }
                    return d(m, function (c) {
                        try {
                            j = b(c, m, g - 1, h), j && l.push(a(c) + ":" + j)
                        } catch (d) {
                        }
                    }), "{" + l.join(",") + "}"
            }
        }

        var c, d, e = 6, f = 50, g = function (a, b) {
            for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b(c)
        }, h = function (a, b) {
            for (var c in a)b(c)
        }, i = function (a, b, c) {
            null != a && (c = c || {}, Object.getOwnPropertyNames(a).forEach(function (a) {
                c[a] || (b(a), c[a] = !0)
            }), i(Object.getPrototypeOf(a), b, c))
        };
        Date.prototype.toPrunedJSON = Date.prototype.toJSON, String.prototype.toPrunedJSON = String.prototype.toJSON;
        var j = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, k = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.prune = function (a, j, k) {
            if ("object" == typeof j) {
                var l = j;
                j = l.depthDecr, k = l.arrayMaxLength, d = l.iterator || g, l.allProperties ? d = i : l.inheritedProperties && (d = h)
            } else d = g;
            return c = [], j = j || e, k = k || f, b("", {"": a}, j, k)
        }, JSON.prune.log = function () {
            console.log.apply(console, Array.prototype.slice.call(arguments).map(function (a) {
                return JSON.parse(JSON.prune(a))
            }))
        }, JSON.prune.forEachProperty = i, JSON.stringifyWithCircularRefs = function (a) {
            var b = [];
            return a = JSON.prune(a), JSON.stringify(a, function (a, c) {
                if (null != c && "object" == typeof c) {
                    if (b.indexOf(c) >= 0)return;
                    b.push(c)
                }
                return c
            })
        }
    }(), d.CollectionView = d.CollectionView.extend({
        findViewByModel: function (b) {
            return a.find(a.pairs(this.children._views), function (a) {
                return this === a[1].model
            }, b)
        }
    }), d.SortableItemView = d.ItemView.extend({
        tagName: "li",
        attributes: {draggable: !0},
        dragEvents: {
            dragstart: "start",
            dragenter: "enter",
            dragleave: "leave",
            dragend: "leave",
            dragover: "over",
            drop: "drop"
        },
        initialize: function (b) {
            a.extend(this, b)
        },
        delegateEvents: function (b) {
            var c = a.extend({}, b, this.dragEvents);
            d.View.prototype.delegateEvents.call(this, c)
        },
        start: function (a) {
            this.parent.draggedModel = this.model, a.originalEvent && (a = a.originalEvent), a.dataTransfer.effectAllowed = "move", a.dataTransfer.dropEffect = "move", a.dataTransfer.setData("text", "Drag")
        },
        enter: function (a) {
            a.preventDefault(), this.$el.addClass(this.overClass)
        },
        leave: function (a) {
            a.preventDefault(), this.$el.removeClass(this.overClass)
        },
        over: function (a) {
            return a.preventDefault(), !1
        },
        drop: function (a) {
            a.preventDefault(), this.leave(a);
            var b = this.model.collection, c = this.parent, d = this.$el.index();
            b.remove(c.draggedModel), b.add(c.draggedModel, {at: d}), this.trigger("drop", this.parent.draggedModel)
        }
    }), d.SortableCollectionView = d.CollectionView.extend({
        tagName: "ul",
        className: "sortable-view",
        itemView: d.SortableItemView,
        overClass: "over",
        childEvents: {"itemview:drop": "onDropItem"},
        delegateEvents: function (a) {
            d.View.prototype.delegateEvents.call(this, a), d.bindEntityEvents(this, this, d.getOption(this, "childEvents"))
        },
        buildItemView: function (b, c, d) {
            var e = a.extend({model: b, overClass: this.overClass, parent: this}, d);
            return new c(e)
        },
        appendHtml: function (a, b, c) {
            var d = a.itemViewContainer ? a.$(a.itemViewContainer) : a.$el, e = d.children();
            e.size() <= c ? d.append(b.el) : d.children().eq(c).before(b.el)
        },
        onDropItem: function (a) {
            console.log("DROPPED ITEM", a)
        }
    }), d.DualDisplayItemView = d.ItemView.extend({
        viewMode: "ViewMode", constructor: function () {
            if (d.ItemView.prototype.constructor.apply(this, Array.prototype.slice.call(arguments)), !this.editTemplate || !this.viewTemplate)throw"Please define an editTemplate and a viewTemplate";
            this.context && this.context.wireCommand("changeMode", function () {
                this.execute = function () {
                    this.context.options.view.viewMode = this.eventData.viewMode, this.context.options.view.render()
                }
            })
        }, getTemplate: function () {
            return this.viewMode === d.DualDisplayItemView.Constants.EditMode ? this.editTemplate : this.viewTemplate
        }
    }), d.DualDisplayItemView.Constants = {ViewMode: "ViewMode", EditMode: "EditMode"}, function () {
        var b = c.View.prototype.constructor;
        c.View.prototype.constructor = function (c) {
            var d = b.apply(this, [c]);
            return this.contextSyncEvents && (i.bindContext({
                view: this, context: i.extend({
                    initialize: function () {
                        a.each(a.pairs(this.options.view.contextSyncEvents), function (a) {
                            this.wireCommand(a[0], function () {
                                this.execute = a[1]
                            })
                        }, this)
                    }
                })
            }), this.options.parentContext && (this.context.parentContext = this.options.parentContext)), d
        }
    }(), function () {
        i.addContextSyncEvents = function (b, c, d) {
            b && c && (i.bindContext({
                view: b, context: i.extend({
                    initialize: function () {
                        a.each(a.pairs(c), function (a) {
                            this.wireCommand(a[0], function () {
                                this.execute = a[1]
                            })
                        }, this)
                    }
                })
            }), d && (this.context.parentContext = d))
        }
    }(), {addContextSyncEvents: i.addContextSyncEvents, setDebug: i.setDebug}
});