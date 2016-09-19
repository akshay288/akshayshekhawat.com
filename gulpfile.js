var gulp =   require('gulp');
var sass =   require("gulp-sass");
var pug =    require("gulp-pug");
var uglify = require("gulp-uglify");

gulp.task("sass", function() {
	return gulp.src("src/scss/main.scss")
		.pipe(sass())
    	.pipe(gulp.dest("dist"));
});

gulp.task("pug-index", function() {
	return gulp.src("src/pug/index.pug")
		.pipe(pug())
		.pipe(gulp.dest("dist"));
});

gulp.task("pug-blog", function() {
	return gulp.src("src/pug/blog/*.pug")
		.pipe(pug())
		.pipe(gulp.dest("dist/blog"));
});

gulp.task("js", function() {
	return gulp.src("src/js/main.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist"));
});

gulp.task("default", ["js", "sass", "pug-index", "pug-blog"]);
