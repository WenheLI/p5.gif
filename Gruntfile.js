module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'build/p5gif.pre-min.js': 'build/p5gif.js'
                }
            }
        },
        uglify: {
            options: {
                compress: {
                    global_defs: {
                        IS_MINIFIED: true
                    }
                },
            },
            dist: {
                files: {
                    'build/p5gif.min.js': 'build/p5gif.pre-min.js'
                }
            }
        },
        copy: {
            copy_browser_test: {
                files: [
                    { expand: true, cwd: 'browser_test', src: ['**'], dest: 'build/test/' },
                    { expand: true, cwd: 'lib/dist', src: ['**'], dest: 'build/p5/' }
                ]
            }
        },
        eslint: {
            target: ['src/*.js', 'src/components/*.js']
        }
    });

    grunt.loadTasks('tasks/build');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-eslint');
    
    // grunt.registerTask('build', ['browserify', 'browserify:min', 'uglify']);
    grunt.registerTask('default', ['eslint', 'browserify', 'browserify:min', 'babel', 'uglify', 'copy']);

}