module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browser_sync: {
            files: {
                src : ['*.js', 'public/stylesheets/*.css', 'views/*.ejs']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browser-sync');

    // Default task(s).
    grunt.registerTask('default', ['browser_sync']);

};