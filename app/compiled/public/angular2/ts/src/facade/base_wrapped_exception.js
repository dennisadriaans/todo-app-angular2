System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BaseWrappedException;
    return {
        setters:[],
        execute: function() {
            /**
             * A base class for the WrappedException that can be used to identify
             * a WrappedException from ExceptionHandler without adding circular
             * dependency.
             */
            BaseWrappedException = (function (_super) {
                __extends(BaseWrappedException, _super);
                function BaseWrappedException(message) {
                    _super.call(this, message);
                }
                Object.defineProperty(BaseWrappedException.prototype, "wrapperMessage", {
                    get: function () { return ''; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "wrapperStack", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "originalException", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "originalStack", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "context", {
                    get: function () { return null; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseWrappedException.prototype, "message", {
                    get: function () { return ''; },
                    enumerable: true,
                    configurable: true
                });
                return BaseWrappedException;
            }(Error));
            exports_1("BaseWrappedException", BaseWrappedException);
        }
    }
});