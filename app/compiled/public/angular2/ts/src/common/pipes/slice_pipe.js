System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var lang_1, exceptions_1, collection_1, core_1, invalid_pipe_argument_exception_1;
    var SlicePipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            /**
             * Creates a new List or String containing only a subset (slice) of the
             * elements.
             *
             * The starting index of the subset to return is specified by the `start` parameter.
             *
             * The ending index of the subset to return is specified by the optional `end` parameter.
             *
             * ### Usage
             *
             *     expression | slice:start[:end]
             *
             * All behavior is based on the expected behavior of the JavaScript API
             * Array.prototype.slice() and String.prototype.slice()
             *
             * Where the input expression is a [List] or [String], and `start` is:
             *
             * - **a positive integer**: return the item at _start_ index and all items after
             * in the list or string expression.
             * - **a negative integer**: return the item at _start_ index from the end and all items after
             * in the list or string expression.
             * - **`|start|` greater than the size of the expression**: return an empty list or string.
             * - **`|start|` negative greater than the size of the expression**: return entire list or
             * string expression.
             *
             * and where `end` is:
             *
             * - **omitted**: return all items until the end of the input
             * - **a positive integer**: return all items before _end_ index of the list or string
             * expression.
             * - **a negative integer**: return all items before _end_ index from the end of the list
             * or string expression.
             *
             * When operating on a [List], the returned list is always a copy even when all
             * the elements are being returned.
             *
             * ## List Example
             *
             * This `ngFor` example:
             *
             * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_list'}
             *
             * produces the following:
             *
             *     <li>b</li>
             *     <li>c</li>
             *
             * ## String Examples
             *
             * {@example core/pipes/ts/slice_pipe/slice_pipe_example.ts region='SlicePipe_string'}
             */
            SlicePipe = (function () {
                function SlicePipe() {
                }
                SlicePipe.prototype.transform = function (value, args) {
                    if (args === void 0) { args = null; }
                    if (lang_1.isBlank(args) || args.length == 0) {
                        throw new exceptions_1.BaseException('Slice pipe requires one argument');
                    }
                    if (!this.supports(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(SlicePipe, value);
                    }
                    if (lang_1.isBlank(value))
                        return value;
                    var start = args[0];
                    var end = args.length > 1 ? args[1] : null;
                    if (lang_1.isString(value)) {
                        return lang_1.StringWrapper.slice(value, start, end);
                    }
                    return collection_1.ListWrapper.slice(value, start, end);
                };
                SlicePipe.prototype.supports = function (obj) { return lang_1.isString(obj) || lang_1.isArray(obj); };
                SlicePipe = __decorate([
                    core_1.Pipe({ name: 'slice', pure: false }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SlicePipe);
                return SlicePipe;
            }());
            exports_1("SlicePipe", SlicePipe);
        }
    }
});
