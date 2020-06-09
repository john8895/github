const cssCode = `
	#chromeBookmarkSearch {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.9);
		z-index: 10000000;
		box-sizing: border-box;
		padding: 7%;
		overflow-y: auto;
		font-size: 2.0em;
	}
	
	#chromeBookmarkSearch input{
		width: 100%;
		font-size: 125%;
		border-radius: 0.5em;
		border-width: 0.1em;
		padding: 0.15em;
	}
	
	#chromeBookmarkSearch input:focus{
		width: 100%;
		font-size: 125%;
		border-radius: 0.5em;
		border-color: aqua;
		padding: 0.15em;
		outline: none;
	}
	
	#chromeBookmarkSearch ul{
		list-style-type: none;
		font-size: 100%;
	}
	
	#chromeBookmarkSearch li{
		background-color: silver;
		font-size: 100%;
		margin: 0.5em 1.5em;
		border-radius: 0.4em;
		padding: 0.1em 0.3em;
		border: 3px solid silver;
	}
	
	#chromeBookmarkSearch a{
		display: block;
		font-size: 100%;
		color: blue;
	}
	
	#chromeBookmarkSearch .selected{
		border: 3px solid white;
	}
	
	#chromeBookmarkSearch .selected::before{
		content: "→";
		color: white;
		float: left;
		margin-left: -1.5em;
		font-size: 100%;
	}
`

const htmlCode = `
	<div id="chromeBookmarkSearch">
		
		<style>${cssCode}</style>
		
		<input type="text" placeholder="Search bookmarks...">
		
		<ul></ul>
		
	</div>
`

// Convert the string with HTML code to real HTML objects.
const tempElement = document.createElement("div")
tempElement.innerHTML = htmlCode
const div = tempElement.firstElementChild
tempElement.removeChild(div)

const input = div.querySelector("input")
const ul = div.querySelector("ul")

input.addEventListener('input', function(event){
	search()
})

input.addEventListener("keydown", function(event){
	
	const enteredText = input.value
	
	// [ENTER]
	if(event.keyCode == 13){
		event.preventDefault()
		
		const selectedLi = ul.querySelector(".selected")
		
		if(selectedLi != null){
			window.location = selectedLi.querySelector("a").href
		}else if(startsWithProtocol(enteredText)){
			window.location = enteredText
		}else if(startsWithDomain(enteredText)){
			window.location = "http://"+enteredText
		}else if(startsWithIp(enteredText)){
			window.location = "http://"+enteredText
		}else{
			window.location = "https://www.google.com/search?q="+encodeURIComponent(input.value)
		}
		
	}
	
	const selectedLi = ul.querySelector(".selected")
	
	if(selectedLi != null){
		selectedLi.classList.remove("selected")
	}
	
	// [UP]
	if(event.keyCode == 38){
		event.preventDefault()
		
		let nextSelectedLi = null
		
		if(selectedLi != null){
			nextSelectedLi = selectedLi.previousElementSibling
		}
		
		if(nextSelectedLi != null){
			nextSelectedLi.classList.add("selected")
			nextSelectedLi.scrollIntoViewIfNeeded()
		}
		
	}
	
	// [DOWN]
	if(event.keyCode == 40){
		event.preventDefault()
		
		let nextSelectedLi = null
		
		if(selectedLi == null){
			nextSelectedLi = ul.querySelector("li:first-child")
		}else{
			if(selectedLi.nextElementSibling == null){
				nextSelectedLi = selectedLi
			}else{
				nextSelectedLi = selectedLi.nextElementSibling
			}
		}
		
		if(nextSelectedLi != null){
			nextSelectedLi.classList.add("selected")
			nextSelectedLi.scrollIntoViewIfNeeded()
		}
		
	}
	
})


function search(){
	
	const searchTerm = input.value.toLowerCase()
	
	const message = {
		command: "getBookmarksBySearchTerm",
		arguments: {
			searchTerm
		}
	}
	
	chrome.runtime.sendMessage(message, function(response){
		const bookmarks = response.bookmarks
		
		bookmarks.sort(function(a, b){
			
			const aTitle = a.title.toLowerCase()
			const bTitle = b.title.toLowerCase()
			
			const aStartsWith = aTitle.startsWith(searchTerm)
			const bStartsWith = bTitle.startsWith(searchTerm)
			
			if(aStartsWith == bStartsWith){
				if(aTitle < bTitle){
					return -1
				}else if(bTitle < aTitle){
					return 1
				}else{
					return 0
				}
			}else if(aStartsWith && !bStartsWith){
				return -1
			}else{
				return 1
			}
		})
		
		ul.innerText = ""
		
		bookmarks.forEach(function(bookmark){
			
			const li = document.createElement('li')
			li.innerHTML = `
				<a href="${bookmark.url}">${bookmark.title}</a>
			`
			
			ul.appendChild(li)
			
		})
		
	})
}

document.addEventListener("keydown", function(event){
	
	// [CTRL] + [L]
	if(event.ctrlKey && event.key == "l"){
		event.preventDefault()
		
		if(div.parentNode == null){
			showSearch()
		}else{
			hideSearch()
		}
		
	}
	
	// [ESC]
	if(event.which == 27){
		if(div.parentNode != null){
			event.preventDefault()
			hideSearch();
		}
	}
	
})

function showSearch(){
	document.body.appendChild(div)
	input.focus()
	search()
}

function hideSearch(){
	document.body.removeChild(div)
}

function startsWithDomain(text){
	// https://stackoverflow.com/a/30970319/2104665
	const urlRegExp = /(www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}|localhost)[-a-zA-Z0-9@:%_\+.~#?&//=]*/g
	const res = text.match(urlRegExp)
	return res != null
}

function startsWithProtocol(text){
	return text.startsWith("http://") || text.startsWith("https://")
}

function startsWithIp(text){
	const urlRegExp = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/
	const res = text.match(urlRegExp)
	return res != null
}