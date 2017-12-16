var gulp =   require('gulp');
var pug =    require("gulp-pug");
var uglify = require("gulp-uglify");

gulp.task("css", function() {
	return gulp.src("src/css/*.css")
		.pipe(gulp.dest("dist"));
});

gulp.task("pug-index", function() {
	return gulp.src("src/pug/index.pug")
		.pipe(pug())
		.pipe(gulp.dest("dist"));
});

gulp.task("pug-blog", function() {
	pug_filters = {
		'markdown': function (text) {
			var md = require('markdown-it')().use(require('markdown-it-sub'));
			return md.render(text)
		}
	}
	return gulp.src("src/pug/blog/*.pug")
		.pipe(pug({'filters': pug_filters}))
		.pipe(gulp.dest("dist/blog"));
});

gulp.task("js", function() {
	return gulp.src("src/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist"));
});

gulp.task("files", function() {
	return gulp.src("src/files/*")
		.pipe(gulp.dest("dist/files"));
});

gulp.task("keybase", function() {
	return gulp.src("src/keybase.txt")
		.pipe(gulp.dest("dist"));
});

gulp.task("default", ["files", "js", "css", "pug-index", "pug-blog", "keybase"]);
