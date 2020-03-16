老師，我成功了！

只要在根目錄創建 .browserslistrc 檔案，不採用寫在 package.json 的方法，在 .browserslistrc 內寫入：

```
> .5% or last 2 versions
> .5%, last 2 versions
```

這樣就可以自動加上前綴了，我的 gulpfile.js

```
var gulp = require('gulp');
var postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('prefix',function () {
    return gulp.src('./src/css/main.css')
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('./dist/css/'))
})
```



感謝老師，也感謝我自己，這個環節卡了好長一段時間，原本以為自己會一直克服不了，但想不到一試再試，終於讓我成功了！謝謝老師的教導！



後記：

本來都是在 windows 電腦操作，原本以為是 WIN 系統的問題，特地去租了一台雲端 MAC，實測的結果發現跟作業系統沒關係，但無意間卻發現 MAC 的使用環境很親民，在操作代碼相關的工作時，終端機真的很好用。