chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		switch(request.command){
			
			case "getBookmarksBySearchTerm":
				const searchTerm = request.arguments.searchTerm
				chrome.bookmarks.search(searchTerm, function(bookmarks){
					sendResponse({bookmarks})
				})
				return true
			
			case "focusCurrentTab":
				chrome.tabs.getCurrent(function(tab){
					
					const propertiesToUpdate = {
						"active": true
					}
					
					chrome.tabs.update(tab.id, propertiesToUpdate, function(updatedTab){
						sendResponse()
						alert("Curren tab updated!")
					})
					
				})
				return true
			
		}
	}
)