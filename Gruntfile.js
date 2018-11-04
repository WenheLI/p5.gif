module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            minify_lib: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'build/p5gif.min.map'
                },
                files: {
                    'build/p5gif.min.js': ['src/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default", ["uglify"]);

}