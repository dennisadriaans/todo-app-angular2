var elixir = require('laravel-elixir');
var elixirTypscript = require('elixir-typescript');

require('laravel-elixir-livereload');

/*
elixir(function(mix) {
    mix.copy('public/vendor/foundation/scss', 'resources/assets/sass/foundation');
});

elixir(function(mix) {
    mix.sass([
        'app.scss',
    ], 'public/css/foundation.css', { indentedSyntax: true })
});
*/

elixir(function(mix) {
    mix.sass([
        'all.sass',
    ], 'public/css/all.css', { indentedSyntax: true });


    mix.typescript('app.js','public/app','/**/*.ts',{
        "target": "ES5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
    });

    mix.livereload();

    //mix.copy('node_modules/angular2', 'public/angular2');
    //mix.copy('node_modules/es6-promise', 'public/es6-promise');
    //mix.copy('node_modules/es6-shim', 'public/es6-shim');
    //mix.copy('node_modules/rxjs', 'public/rxjs');
    //mix.copy('node_modules/systemjs', 'public/systemjs');
    //mix.copy('node_modules/zone.js', 'public/zone.js');
});
