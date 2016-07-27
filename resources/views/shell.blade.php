<!DOCTYPE html>
<html>
<head>
    <title>Taskapp - invoice manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

    <script src="/es6-shim/es6-shim.min.js"></script>
    <script src="/systemjs/dist/system-polyfills.js"></script>

    <script src="/angular2/bundles/angular2-polyfills.js"></script>
    <script src="/systemjs/dist/system.src.js"></script>
    <script src="/rxjs/bundles/Rx.js"></script>
    <script src="/angular2/bundles/angular2.dev.js"></script>
    <script src="/angular2/bundles/router.dev.js"></script>
    <script src="/angular2/bundles/http.dev.js"></script>

    <link href="{{ asset('css/animate.css') }}" rel="stylesheet">
    <link href="{{ asset('css/foundation.css') }}" rel="stylesheet">
    <link href="{{ asset('css/all.css') }}" rel="stylesheet" type="text/css">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <base href="/"/>

    <script>
        System.config({
            packages: {
                app: {
                    format: 'register',
                    defaultExtension: 'js'
                }
            }
        });
        System.import('app/typescript/boot')
                .then(null, console.error.bind(console));
    </script>
</head>

<body>
    <div class="container">
        <div class="content">
            <my-app>Loading...</my-app>
        </div>
    </div>
    @if ( Config::get('app.debug') )
        <script type="text/javascript">
            document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
        </script>
    @endif
</body>
</html>
