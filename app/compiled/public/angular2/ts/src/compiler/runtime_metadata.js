System.register(['angular2/src/core/di', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', './directive_metadata', 'angular2/src/core/metadata/directives', 'angular2/src/core/linker/directive_resolver', 'angular2/src/core/linker/pipe_resolver', 'angular2/src/core/linker/view_resolver', 'angular2/src/core/linker/directive_lifecycle_reflector', 'angular2/src/core/linker/interfaces', 'angular2/src/core/reflection/reflection', 'angular2/src/core/platform_directives_and_pipes', './util', 'angular2/src/compiler/url_resolver'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var di_1, lang_1, exceptions_1, cpl, md, directive_resolver_1, pipe_resolver_1, view_resolver_1, directive_lifecycle_reflector_1, interfaces_1, reflection_1, di_2, platform_directives_and_pipes_1, util_1, url_resolver_1;
    var RuntimeMetadataResolver;
    function flattenDirectives(view, platformDirectives) {
        var directives = [];
        if (lang_1.isPresent(platformDirectives)) {
            flattenArray(platformDirectives, directives);
        }
        if (lang_1.isPresent(view.directives)) {
            flattenArray(view.directives, directives);
        }
        return directives;
    }
    function flattenPipes(view, platformPipes) {
        var pipes = [];
        if (lang_1.isPresent(platformPipes)) {
            flattenArray(platformPipes, pipes);
        }
        if (lang_1.isPresent(view.pipes)) {
            flattenArray(view.pipes, pipes);
        }
        return pipes;
    }
    function flattenArray(tree, out) {
        for (var i = 0; i < tree.length; i++) {
            var item = di_1.resolveForwardRef(tree[i]);
            if (lang_1.isArray(item)) {
                flattenArray(item, out);
            }
            else {
                out.push(item);
            }
        }
    }
    function isValidType(value) {
        return lang_1.isPresent(value) && (value instanceof lang_1.Type);
    }
    function calcModuleUrl(type, cmpMetadata) {
        var moduleId = cmpMetadata.moduleId;
        if (lang_1.isPresent(moduleId)) {
            var scheme = url_resolver_1.getUrlScheme(moduleId);
            return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId :
                "package:" + moduleId + util_1.MODULE_SUFFIX;
        }
        else {
            return reflection_1.reflector.importUri(type);
        }
    }
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
                di_2 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (cpl_1) {
                cpl = cpl_1;
            },
            function (md_1) {
                md = md_1;
            },
            function (directive_resolver_1_1) {
                directive_resolver_1 = directive_resolver_1_1;
            },
            function (pipe_resolver_1_1) {
                pipe_resolver_1 = pipe_resolver_1_1;
            },
            function (view_resolver_1_1) {
                view_resolver_1 = view_resolver_1_1;
            },
            function (directive_lifecycle_reflector_1_1) {
                directive_lifecycle_reflector_1 = directive_lifecycle_reflector_1_1;
            },
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            },
            function (reflection_1_1) {
                reflection_1 = reflection_1_1;
            },
            function (platform_directives_and_pipes_1_1) {
                platform_directives_and_pipes_1 = platform_directives_and_pipes_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (url_resolver_1_1) {
                url_resolver_1 = url_resolver_1_1;
            }],
        execute: function() {
            RuntimeMetadataResolver = (function () {
                function RuntimeMetadataResolver(_directiveResolver, _pipeResolver, _viewResolver, _platformDirectives, _platformPipes) {
                    this._directiveResolver = _directiveResolver;
                    this._pipeResolver = _pipeResolver;
                    this._viewResolver = _viewResolver;
                    this._platformDirectives = _platformDirectives;
                    this._platformPipes = _platformPipes;
                    this._directiveCache = new Map();
                    this._pipeCache = new Map();
                }
                RuntimeMetadataResolver.prototype.getDirectiveMetadata = function (directiveType) {
                    var meta = this._directiveCache.get(directiveType);
                    if (lang_1.isBlank(meta)) {
                        var dirMeta = this._directiveResolver.resolve(directiveType);
                        var moduleUrl = null;
                        var templateMeta = null;
                        var changeDetectionStrategy = null;
                        if (dirMeta instanceof md.ComponentMetadata) {
                            var cmpMeta = dirMeta;
                            moduleUrl = calcModuleUrl(directiveType, cmpMeta);
                            var viewMeta = this._viewResolver.resolve(directiveType);
                            templateMeta = new cpl.CompileTemplateMetadata({
                                encapsulation: viewMeta.encapsulation,
                                template: viewMeta.template,
                                templateUrl: viewMeta.templateUrl,
                                styles: viewMeta.styles,
                                styleUrls: viewMeta.styleUrls
                            });
                            changeDetectionStrategy = cmpMeta.changeDetection;
                        }
                        meta = cpl.CompileDirectiveMetadata.create({
                            selector: dirMeta.selector,
                            exportAs: dirMeta.exportAs,
                            isComponent: lang_1.isPresent(templateMeta),
                            dynamicLoadable: true,
                            type: new cpl.CompileTypeMetadata({ name: lang_1.stringify(directiveType), moduleUrl: moduleUrl, runtime: directiveType }),
                            template: templateMeta,
                            changeDetection: changeDetectionStrategy,
                            inputs: dirMeta.inputs,
                            outputs: dirMeta.outputs,
                            host: dirMeta.host,
                            lifecycleHooks: interfaces_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType); })
                        });
                        this._directiveCache.set(directiveType, meta);
                    }
                    return meta;
                };
                RuntimeMetadataResolver.prototype.getPipeMetadata = function (pipeType) {
                    var meta = this._pipeCache.get(pipeType);
                    if (lang_1.isBlank(meta)) {
                        var pipeMeta = this._pipeResolver.resolve(pipeType);
                        var moduleUrl = reflection_1.reflector.importUri(pipeType);
                        meta = new cpl.CompilePipeMetadata({
                            type: new cpl.CompileTypeMetadata({ name: lang_1.stringify(pipeType), moduleUrl: moduleUrl, runtime: pipeType }),
                            name: pipeMeta.name,
                            pure: pipeMeta.pure
                        });
                        this._pipeCache.set(pipeType, meta);
                    }
                    return meta;
                };
                RuntimeMetadataResolver.prototype.getViewDirectivesMetadata = function (component) {
                    var _this = this;
                    var view = this._viewResolver.resolve(component);
                    var directives = flattenDirectives(view, this._platformDirectives);
                    for (var i = 0; i < directives.length; i++) {
                        if (!isValidType(directives[i])) {
                            throw new exceptions_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
                        }
                    }
                    return directives.map(function (type) { return _this.getDirectiveMetadata(type); });
                };
                RuntimeMetadataResolver.prototype.getViewPipesMetadata = function (component) {
                    var _this = this;
                    var view = this._viewResolver.resolve(component);
                    var pipes = flattenPipes(view, this._platformPipes);
                    for (var i = 0; i < pipes.length; i++) {
                        if (!isValidType(pipes[i])) {
                            throw new exceptions_1.BaseException("Unexpected piped value '" + lang_1.stringify(pipes[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
                        }
                    }
                    return pipes.map(function (type) { return _this.getPipeMetadata(type); });
                };
                RuntimeMetadataResolver = __decorate([
                    di_2.Injectable(),
                    __param(3, di_2.Optional()),
                    __param(3, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_DIRECTIVES)),
                    __param(4, di_2.Optional()),
                    __param(4, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_PIPES)), 
                    __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, pipe_resolver_1.PipeResolver, view_resolver_1.ViewResolver, Array, Array])
                ], RuntimeMetadataResolver);
                return RuntimeMetadataResolver;
            }());
            exports_1("RuntimeMetadataResolver", RuntimeMetadataResolver);
        }
    }
});
