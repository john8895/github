之後有一個 AMP 的網頁要做，這是新的技術我還沒接觸過，所以我看了 Google 的 AMP 開發文件，實際轉換一個初稿的靜態頁面，先說結論：

1. 雖然 AMP HTML 結構沒有差很多，但因為 CSS 只能用<style>寫在 HTML 裡且要壓縮至 50KB 以下，以一般 300-400KB 的網站 CSS 來說，重寫 CSS 會比刪代碼快，因此 AMP 網頁要重新製作。
2. 因為靜態頁重做，所以程式要重新套，不建議正式站直接改成 AMP 網頁，因為設計的工時增加很多很多，而且錯誤會除不完。
3. 會遇到的問題主要會有三個：CSS、JS、圖片，以下詳述。



----



目前會遇到的問題主要有三個，如果無法通過AMP驗證，就無法在Google搜尋頁被顯示出來：

1. CSS不能用外部 style.css，只能用內嵌而且要壓縮至 50KB 以下，這是極困難的，因為版型網站 CSS 一般約在 300-400KB上下，要篩選出只有本頁所需的 CSS，不如重新製作一個AMP網頁並重寫 CSS 會比較快。（文件建議採用 SASS 或 SCSS 來減少代碼）

```css
<style amp-custom>

/* The content from base.css */

</style>
```

2. 圖片<img>要改用<amp-img>，並且加上寬高

3. 外部 JS 必須加入 JS iframe及非同步屬性（async），或是替換為AMP模組

```html
<script async custom-element="amp-iframe" src="js/plugins.min.js"></script>
```



* Google 提供AMP驗證工具，可測試網址與單頁代碼，如果驗證不過，會顯示錯誤的地方，讓你逐一修正
  https://search.google.com/test/amp



* 文檔有提供各種錯誤的解決方法
  https://amp.dev/documentation/guides-and-tutorials/start/converting/resolving-errors/?format=websites



**相關資源：**

* 創建您的AMP HTML頁面（基本模版）
  https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup/?format=websites

* 將HTML轉換為AMP-amp.dev
  https://amp.dev/documentation/guides-and-tutorials/start/converting/?format=websites

* 添加高級AMP功能（採用AMP模組）
  https://amp.dev/documentation/guides-and-tutorials/start/add_advanced/?format=websites

* 結構化資料測試工具（這應該是程式要處理）
  https://search.google.com/structured-data/testing-tool?utm_source=search_console&utm_campaign=sc-amp-test