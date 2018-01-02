/*!
 * iui's Gruntfile
 */

/* jshint node: true */
module.exports = function(grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	RegExp.quote = function(string) {
		return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	var generateNamespace = require('./grunt/iui-namespace-generator.js');
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Metadata.
		meta: {
			libPath: 'lib/',
			distPath: 'dist/',
			jsPath: 'js/',
			sassPath: 'sass/',
			examplesPath: 'examples/'
		},

		banner: '/*!\n' +
			' * =====================================================\n' +
			' * iui v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
			' * =====================================================\n' +
			' */\n',

		clean: {
			all: ['<%= meta.distPath %>'],
			sourceMap: ['<%= meta.distPath %>css/*.map']
		},

		concat: {
			iui: {
				options: {
					banner: '<%= banner %>'
				},
				src: [
					'src/js/iui.core.js',
//					'js/iui.load.js',
					'src/js/iui.detect.js',
					'src/js/iui.detect.5+.js',
					'src/js/iui.event.js',
					'src/js/iui.target.js',
					'src/js/iui.fixed.js',
					'src/js/iui.fixed.bind.js',
					'src/js/iui.fixed.classlist.js',
					'src/js/iui.fixed.animation.js',
					'src/js/iui.fixed.fastclick.js',
					'src/js/iui.fixed.keyboard.js',
					'src/js/iui.namespace.js',
					'src/js/iui.gestures.js',
					'src/js/iui.gestures.flick.js',
					'src/js/iui.gestures.swipe.js',
					'src/js/iui.gestures.drag.js',
					'src/js/iui.gestures.tap.js',
					'src/js/iui.gestures.longtap.js',
					'src/js/iui.gestures.hold.js',
					'src/js/iui.gestures.pinch.js',
					'src/js/iui.init.js',
					'src/js/iui.init.5+.js',
					'src/js/iui.back.js',
					'src/js/iui.back.5+.js',
					'src/js/iui.init.pullrefresh.js',
					'src/js/iui.ajax.js',
					'src/js/iui.ajax.5+.js',
					'src/js/iui.layout.js',
					'src/js/iui.animation.js',
					'src/js/iui.class.js',
					'src/js/iui.pullRefresh.js',
					'src/js/iui.class.scroll.js',
					'src/js/iui.class.scroll.pullrefresh.js',
					'src/js/iui.class.scroll.slider.js',
					'src/js/pullrefresh.5+.js',
					'src/js/iui.offcanvas.js',
					'src/js/actions.js',
					'src/js/modals.js',
					'src/js/popovers.js',
					'src/js/segmented-controllers.js',
					'src/js/switches.js',
					'src/js/tableviews.js',
					'src/js/iui.dialog.alert.js',
					'src/js/iui.dialog.confirm.js',
					'src/js/iui.dialog.prompt.js',
					'src/js/iui.dialog.toast.js',
					'src/js/iui.popup.js',
					'src/js/iui.progressbar.js',
					'src/js/input.plugin.js',
					'src/js/iui.transparent.js',
					'src/js/iui.number.js',
					'src/js/iui.button.js'
				],
//				dest: '<%= meta.distPath %>/<%= pkg.name %>.js',
				dest: '<%= meta.distPath %>/modules/iui.core.js'

			}
		},

		sass: {
			options: {
				style: 'expanded',
				unixNewlines: true
			},
			dist: {
				files: {
					'<%= meta.distPath %>css/<%= pkg.name %>.css':'src/sass/iui.scss',
				}
			}
		},

		csscomb: {
			options: {
				config: 'sass/.csscomb.json'
			},
			dist: {
				files: {
					'<%= meta.distPath %>/css/<%= pkg.name %>.css': '<%= meta.distPath %>/css/<%= pkg.name %>.css'
				}
			},
		},

		copy: {
			fonts: {
				expand: true,
				src: 'src/fonts/*',
				dest: '<%= meta.distPath %>/',
				rename: function (dest, src) {  
                  var folder = src.substring(3, src.lastIndexOf('/'));  
                  var filename = src.substring(src.lastIndexOf('/'), src.length);  
                  //  var filename=src;  
//                filename = filename.substring(0, filename.lastIndexOf('.'));  
                  var fileresult=dest + folder + filename ;  
                  return fileresult;  
                  //return  filename + '.min.js';  
              } 
			},
			css: {
				expand: true,
//				cwd: '<%= meta.distPath %>',
				src: ['src/css/*.css'],
				dest: '<%= meta.distPath %>',
				rename: function (dest, src) {  
                  var folder = src.substring(3, src.lastIndexOf('/'));  
                  var filename = src.substring(src.lastIndexOf('/'), src.length);  
                  //  var filename=src;  
//                filename = filename.substring(0, filename.lastIndexOf('.'));  
                  var fileresult=dest + folder + filename ;  
                  return fileresult;  
                  //return  filename + '.min.js';  
              } 
			},
			libs: {
				expand: true,
				src: ['src/libs/*.*','src/libs/**/*.*'],
				dest: '<%= meta.distPath %>/',
				rename: function (dest, src) {  
                  var folder = src.substring(3, src.lastIndexOf('/'));  
                  var filename = src.substring(src.lastIndexOf('/'), src.length);  
                  //  var filename=src;  
//                filename = filename.substring(0, filename.lastIndexOf('.'));  
                  var fileresult=dest + folder + filename ;  
                  return fileresult;  
                  //return  filename + '.min.js';  
              } 
			}
		},

		cssmin: {
			options: {
				banner: '', // set to empty; see bellow
				keepSpecialComments: '*', // set to '*' because we already add the banner in sass
				sourceMap: false
			},
			iui: {
				src: '<%= meta.distPath %>css/<%= pkg.name %>.css',
				dest: '<%= meta.distPath %>css/<%= pkg.name %>.min.css'
			},
			build: {
		        expand:true,
		        cwd:'./src/admin/css/',
		        src: '*.css',
		        dest: '<%= meta.distPath %>/admin/css/',
		        ext:'.css'
		    }
//			compress: {  
//           files: {  
//               'assets/css/default.css': [  
//                   "css/global.css",  
//                   "css/pops.css",  
//                   "css/index.css"  
//               ]  
//           }  
//       }  
		
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				compress: {},
				mangle: true,
				preserveComments: false
			},
			iuiAll: {
				src: '<%= concat.iui.dest %>',
				dest: '<%= meta.distPath %>js/<%= pkg.name %>.min.js'
			},
			ajaxForm:{
				src: 'src/js/ajaxForm.js',
				dest: '<%= meta.distPath %>js/ajaxForm.min.js'
			},
			validate:{
				src: 'src/js/validate.js',
				dest: '<%= meta.distPath %>js/validate.min.js'
			},
			iui:{
				src: 'src/js/iui.load.js',
				dest: '<%= meta.distPath %>/iui.js'
			},
			modules: {
                src: 'src/modules/*.js',
                dest: '<%= meta.distPath %>',
                expand:true,
                rename: function (dest, src) {  
                  var folder = src.substring(3, src.lastIndexOf('/'));  
                  var filename = src.substring(src.lastIndexOf('/'), src.length);  
                  //  var filename=src;  
                  filename = filename.substring(0, filename.lastIndexOf('.'));  
                  var fileresult=dest + folder + filename + '.js';  
                  grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  
                  return fileresult;  
                  //return  filename + '.min.js';  
              } 
            }
		},

		watch: {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
				},
				livereload: true
			},
			scripts: {
				files: [
					'<%= meta.sassPath %>/**/*.scss',
					'<%= meta.jsPath %>/**/*.js',
				],
				tasks: 'dist'
			}
		},

		jshint: {
			options: {
				jshintrc: 'js/.jshintrc'
			},
			grunt: {
				src: ['Gruntfile.js', 'grunt/*.js']
			},
			src: {
				src: 'js/*.js'
			}
		},

		jscs: {
			options: {
				config: 'js/.jscsrc'
			},
			grunt: {
				src: '<%= jshint.grunt.src %>'
			},
			src: {
				src: '<%= jshint.src.src %>'
			},
			docs: {
				src: '<%= jshint.docs.src %>'
			}
		},

		csslint: {
			options: {
				csslintrc: 'sass/.csslintrc'
			},
			src: [
				'<%= meta.distPath %>/css/<%= pkg.name %>.css',
			]
		},
		sed: {
			versionNumber: {
				pattern: (function() {
					var old = grunt.option('oldver');
					return old ? RegExp.quote(old) : old;
				})(),
				replacement: grunt.option('newver'),
				recursive: true
			}
		}
	});
	// Load the plugins
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies'
	});
	require('time-grunt')(grunt);
	// Default task(s).
	grunt.registerTask('cleanAll', ['clean']);
	grunt.registerTask('dist-css', ['sass', 'csscomb', 'cssmin', 'clean:sourceMap']);
	grunt.registerTask('dist-js', ['concat', 'build-namespace', 'uglify']);
	grunt.registerTask('dist', ['clean:all', 'dist-css', 'dist-js', 'copy']);
	grunt.registerTask('build', ['dist']);
	grunt.registerTask('default', ['dist','copy']);
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build-namespace', generateNamespace);

	grunt.registerTask('server', ['dist','watch']);



	// Version numbering task.
	// grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
	// This can be overzealous, so its changes should always be manually reviewed!
	grunt.registerTask('change-version-number', 'sed');

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};

