// -------------------------------------
//          Depndencies
// -------------------------------------

var gulp        = require( 'gulp' ),
    gutil       = require( 'gulp-util'),
    plumber     = require( 'gulp-plumber'),
    beep        = require( 'beepbeep')
    connect     = require( 'gulp-connect' )
    less        = require( 'gulp-less' ),
    notify      = require( 'gulp-notify' ),
    sourcemaps  = require( 'gulp-sourcemaps' ),
    filesize    = require( 'gulp-filesize' ),
    livereload  = require( 'gulp-livereload' ),
    browserSync = require( 'browser-sync' ),
    gulpif      = require( 'gulp-if' ),
    args        = require( 'yargs').argv,
    filter      = require( 'gulp-filter' );




// -------------------------------------
//              Variables
// -------------------------------------

var isProduction    = args.type === 'production';

var path = 
{
    src : {
        styles : 'less/',
        js: 'js/',
        images : 'images/'
    },
    
    dest: {
        styles : 'css/',
        js: 'build/js/',                            // not using yet
        images: 'build/images/'
    }
};



// -------------------------------------
//          Error Handler
// -------------------------------------

var plumberError = function (err) {
    beep([0, 0, 0]);
    gutil.log(gutil.colors.green(err));
    console.log(err);
};




// --------------- Server ------------------ 
// Note: not needed if using browser-sync as
// BS sets up its own server with sockets
// ----------------------------------------- 

/*gulp.task('webserver', function() {
    connect.server({
        port: 7000
    });
})*/




// -------------------------------------
//                Tasks
// -------------------------------------

gulp.task( 'styles', function() {
    gulp.src( 'less/bootstrap.less' )
        .pipe(plumber( function(error) {
            plumberError(error);
            this.emit('end');                   // prevents stream from crashing on error
        }))
        .pipe( sourcemaps.init())
        .pipe( less({ paths: ['less/']}))
        .pipe( sourcemaps.write('./'))
        .pipe( gulp.dest( 'css/' ))
        .pipe( filter('**/*.css'))              // allows only .css files into the stream so
                                                // that .map file doesn't retrigger browserSync
        .pipe( notify({ message: 'Styles task complete' }))
        //.pipe( filesize())
        //.pipe( gulpif() livereload());        // only if using LiveReload
        .pipe( browserSync.reload({ stream: true }));
       
});


gulp.task( 'html', function() {
    gulp.src(['./index.html']);
    //.pipe(livereload());
});

gulp.task('browser-sync', function() {
    var files = [
        './index.html',
        'css/**/*.css',
        'js/**/*.js',
        'images/**/*.png',
        'images/**/*.jpg'
    ];

    browserSync.init( files, {
        server: {
            baseDir: './'
        },
        port: 7700,
        open: false
    });
});




// -------------------------------------
//              Watch Task
// -------------------------------------

gulp.task('watch', ['browser-sync'], function() {
    
    // If using LiveReload
    //livereload.listen();

    gulp.watch('less/**/*.less', ['styles']);
    gulp.watch('./index.html', ['html']);
});

gulp.task('default', ['watch']);


