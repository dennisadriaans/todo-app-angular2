System.register(['angular2/core', './constants'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, constants_1;
    var INITIAL_VALUE, DowngradeNg2ComponentAdapter, Ng1Change;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            INITIAL_VALUE = {
                __UNINITIALIZED__: true
            };
            DowngradeNg2ComponentAdapter = (function () {
                function DowngradeNg2ComponentAdapter(id, info, element, attrs, scope, parentInjector, parse, viewManager, hostViewFactory) {
                    this.id = id;
                    this.info = info;
                    this.element = element;
                    this.attrs = attrs;
                    this.scope = scope;
                    this.parentInjector = parentInjector;
                    this.parse = parse;
                    this.viewManager = viewManager;
                    this.hostViewFactory = hostViewFactory;
                    this.component = null;
                    this.inputChangeCount = 0;
                    this.inputChanges = null;
                    this.hostViewRef = null;
                    this.changeDetector = null;
                    this.contentInsertionPoint = null;
                    this.element[0].id = id;
                    this.componentScope = scope.$new();
                    this.childNodes = element.contents();
                }
                DowngradeNg2ComponentAdapter.prototype.bootstrapNg2 = function () {
                    var childInjector = this.parentInjector.resolveAndCreateChild([core_1.provide(constants_1.NG1_SCOPE, { useValue: this.componentScope })]);
                    this.contentInsertionPoint = document.createComment('ng1 insertion point');
                    this.hostViewRef = this.viewManager.createRootHostView(this.hostViewFactory, '#' + this.id, childInjector, [[this.contentInsertionPoint]]);
                    var hostElement = this.viewManager.getHostElement(this.hostViewRef);
                    this.changeDetector = this.hostViewRef.changeDetectorRef;
                    this.component = this.viewManager.getComponent(hostElement);
                };
                DowngradeNg2ComponentAdapter.prototype.setupInputs = function () {
                    var _this = this;
                    var attrs = this.attrs;
                    var inputs = this.info.inputs;
                    for (var i = 0; i < inputs.length; i++) {
                        var input = inputs[i];
                        var expr = null;
                        if (attrs.hasOwnProperty(input.attr)) {
                            var observeFn = (function (prop) {
                                var prevValue = INITIAL_VALUE;
                                return function (value) {
                                    if (_this.inputChanges !== null) {
                                        _this.inputChangeCount++;
                                        _this.inputChanges[prop] =
                                            new Ng1Change(value, prevValue === INITIAL_VALUE ? value : prevValue);
                                        prevValue = value;
                                    }
                                    _this.component[prop] = value;
                                };
                            })(input.prop);
                            attrs.$observe(input.attr, observeFn);
                        }
                        else if (attrs.hasOwnProperty(input.bindAttr)) {
                            expr = attrs[input.bindAttr];
                        }
                        else if (attrs.hasOwnProperty(input.bracketAttr)) {
                            expr = attrs[input.bracketAttr];
                        }
                        else if (attrs.hasOwnProperty(input.bindonAttr)) {
                            expr = attrs[input.bindonAttr];
                        }
                        else if (attrs.hasOwnProperty(input.bracketParenAttr)) {
                            expr = attrs[input.bracketParenAttr];
                        }
                        if (expr != null) {
                            var watchFn = (function (prop) { return function (value, prevValue) {
                                if (_this.inputChanges != null) {
                                    _this.inputChangeCount++;
                                    _this.inputChanges[prop] = new Ng1Change(prevValue, value);
                                }
                                _this.component[prop] = value;
                            }; })(input.prop);
                            this.componentScope.$watch(expr, watchFn);
                        }
                    }
                    var prototype = this.info.type.prototype;
                    if (prototype && prototype.ngOnChanges) {
                        // Detect: OnChanges interface
                        this.inputChanges = {};
                        this.componentScope.$watch(function () { return _this.inputChangeCount; }, function () {
                            var inputChanges = _this.inputChanges;
                            _this.inputChanges = {};
                            _this.component.ngOnChanges(inputChanges);
                        });
                    }
                    this.componentScope.$watch(function () { return _this.changeDetector && _this.changeDetector.detectChanges(); });
                };
                DowngradeNg2ComponentAdapter.prototype.projectContent = function () {
                    var childNodes = this.childNodes;
                    var parent = this.contentInsertionPoint.parentNode;
                    if (parent) {
                        for (var i = 0, ii = childNodes.length; i < ii; i++) {
                            parent.insertBefore(childNodes[i], this.contentInsertionPoint);
                        }
                    }
                };
                DowngradeNg2ComponentAdapter.prototype.setupOutputs = function () {
                    var _this = this;
                    var attrs = this.attrs;
                    var outputs = this.info.outputs;
                    for (var j = 0; j < outputs.length; j++) {
                        var output = outputs[j];
                        var expr = null;
                        var assignExpr = false;
                        var bindonAttr = output.bindonAttr ? output.bindonAttr.substring(0, output.bindonAttr.length - 6) : null;
                        var bracketParenAttr = output.bracketParenAttr ?
                            "[(" + output.bracketParenAttr.substring(2, output.bracketParenAttr.length - 8) + ")]" :
                            null;
                        if (attrs.hasOwnProperty(output.onAttr)) {
                            expr = attrs[output.onAttr];
                        }
                        else if (attrs.hasOwnProperty(output.parenAttr)) {
                            expr = attrs[output.parenAttr];
                        }
                        else if (attrs.hasOwnProperty(bindonAttr)) {
                            expr = attrs[bindonAttr];
                            assignExpr = true;
                        }
                        else if (attrs.hasOwnProperty(bracketParenAttr)) {
                            expr = attrs[bracketParenAttr];
                            assignExpr = true;
                        }
                        if (expr != null && assignExpr != null) {
                            var getter = this.parse(expr);
                            var setter = getter.assign;
                            if (assignExpr && !setter) {
                                throw new Error("Expression '" + expr + "' is not assignable!");
                            }
                            var emitter = this.component[output.prop];
                            if (emitter) {
                                emitter.subscribe({
                                    next: assignExpr ? (function (setter) { return function (value) { return setter(_this.scope, value); }; })(setter) :
                                        (function (getter) { return function (value) { return getter(_this.scope, { $event: value }); }; })(getter)
                                });
                            }
                            else {
                                throw new Error("Missing emitter '" + output.prop + "' on component '" + this.info.selector + "'!");
                            }
                        }
                    }
                };
                DowngradeNg2ComponentAdapter.prototype.registerCleanup = function () {
                    var _this = this;
                    this.element.bind('$remove', function () { return _this.viewManager.destroyRootHostView(_this.hostViewRef); });
                };
                return DowngradeNg2ComponentAdapter;
            }());
            exports_1("DowngradeNg2ComponentAdapter", DowngradeNg2ComponentAdapter);
            Ng1Change = (function () {
                function Ng1Change(previousValue, currentValue) {
                    this.previousValue = previousValue;
                    this.currentValue = currentValue;
                }
                Ng1Change.prototype.isFirstChange = function () { return this.previousValue === this.currentValue; };
                return Ng1Change;
            }());
        }
    }
});
