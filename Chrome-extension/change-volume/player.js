(function () {chrome.runtime.sendMessage({action: 'getSettings'}, function (settings) {
    if(settings.exist){chrome.runtime.sendMessage({action: 'enable'})}
});})();