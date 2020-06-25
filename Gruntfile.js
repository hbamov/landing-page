module.exports = function (grunt) {

	//**********************************************************//
	//	CONFIG 													//
	//**********************************************************//
	grunt.initConfig({

		// ----- PACKAGE ----- //
		pkg: grunt.file.readJSON("package.json"),

		// ----- CONNECT (SERVER) ----- //
		connect: {
			server: {
				options: {
					port: 9999,
					base: "build",
					hostname: "localhost",
					open: true,
					keepalive: true
				}
			}
		},

		// ----- BROWSERIFY ----- //
		browserify: {
			"build/js/index.js": ["src/**.ts"],
			options: {
				browserifyOptions: {
					debug: true
				},
				plugin: [
					"tsify"
				]
			}
		},

		// ----- WATCH ----- //
		watch: {
			scripts: {
				files: ["src/**/*.ts"],
				tasks: ["build"]
			}
		}

	});

	//**********************************************************//
	//	PLUGINS													//
	//**********************************************************//
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");

	//**********************************************************//
	//	TASKS 													//
	//**********************************************************//
	grunt.registerTask("serve", ["connect"]);
	grunt.registerTask("build", ["browserify"]);

};