var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('build-android', function (cb) {
  exec('cd android && ./gradlew clean assemble \
        && cp app/build/outputs/aar/app-release.aar ../dist/android \
        && mv ../dist/android/app-release.aar ../dist/android/maxleap-react-native.aar',
   function (err, stdout, stderr) {
     console.log(stdout);
     console.log(stderr);
     cb(err);
   });
});

gulp.task('build-ios', function (cb) {
  exec('cd ./ios/src && ./build.sh',
        function(err, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          console.log('err: ' + err);
          cb(err);
        }
      );
});

gulp.task('build', ['build-android', 'build-ios'], function () {
  console.log('finish building...');
});
