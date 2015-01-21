////////////////////////////////////////////////////////////////////////////////////////
// Menu Object 
////////////////////////////////////////////////////////////////////////////////////////
(function(){
	var Menu = function(elementID, url){

		// Retreive Nav JSON Object [return Promise]
		////////////////////////////////////////////////////////////////////////////////////////
		getMenu = function(url){
			// Create AJAX Request Object
			var xmlhttp;
			if (window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); }
			else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

			var promise = new Promise(function(resolve, reject) {
				// Call for Menu JSON data
				xmlhttp.open("GET", url, true);
				// Resolve if data retrieval was successful, else reject and log error msg
				xmlhttp.onload = function() {
					if (xmlhttp.status == 200) {
						var items = JSON.parse(xmlhttp.response).items;
						resolve(items);  
					}
					else { reject(Error(xmlhttp.statusText)); }
				};

				// Reject the promise if an error occurs
				xmlhttp.onerror = function() {
					reject(Error('Error fetching data.'));
				};

		    	xmlhttp.send();
			});

		    return promise;
		};

		// Create UL Dom Element (recursive)
		////////////////////////////////////////////////////////////////////////////////////////
		newMenu = function(list){
			var ul = document.createElement('ul');

			for (item in list) {
				var li = listItem(list[item]);
				ul.appendChild(li);
			}

			return ul;
		};

		// Create LI Dom Element (recursive)
		////////////////////////////////////////////////////////////////////////////////////////
		listItem = function(item){
			// Create base elements
			var li = document.createElement('li'); 
			var a = document.createElement('a');
			li.appendChild(a);
			a.innerText = item.label;

			// If Item has children, recursively loop thru and create submenus
			if (item.items && item.items.length) {
				var ul = newMenu(item.items);
				li.appendChild(ul);
				li.classList.add('subMenu');
				a.onclick = toggleSubMenu;
			// Else assign href to Anchor element
			} else { a.href = item.url; a.onclick = closeMenus; }

			return li;
		};

		// Load Menu Object and return Promise
		getMenu(url).then(function(data){
			// Parse promised Data and Append to DOM
			document.getElementById(elementID).appendChild(newMenu(data));
		});
	};

	document.addEventListener("DOMContentLoaded", function() { new Menu('mainNav', "/api/nav.json"); });
	
})();