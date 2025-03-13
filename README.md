# qQuery

jQuery alternative (4.9kB)

---


### q('h1')

Query Selects the matching element and returns an object with methods that are automatically applied to all nodes.



### q('h1').nodes()

Returns the native Javascript nodes, making it similar to `document.querySelectorAll()`.

```
    [
        '<h1>...</h1>,
        '<h1>...</h1>,
    ]
```



### q('h1').node()

Returns the first native Javascript node, making it similar to `document.querySelector()`.

```
    `<h1>...</h1>`
```



### q('h1').nodeClone()

Clones the native Javascript node, returning a native copy.




### q('ul').findChild('li')

Queries the matching Children Elements, making it similar to:

```
    document.querySelector('ul').querySelectorAll('li')
```



### q('li').findParent('ul')

Queries the matching parent Element, making it similar to:

```
    document.querySelector('li').closest('ul')
```



### q('ul li').forEach((node)=>{ ... })

Loops through native javascript nodes, making it similar to:

```
    document.querySelectorAll('ul li').forEach((node)=>{
    });
```



### q('button').attribute('data-clicks')

Gets the attribute value, making it similar to:

```
    document.querySelector('button').getAttribute('data-clicks')
```





###  q('button').attribute(attribute, value)

Updates the attribute value, making it similar to:

```
    document.querySelector('button').setAttribute('data-clicks', '...')
```



### q('body').classAdd('...')

Adds a class to a node, making it similar to:

```
    document.body.classList.add('...')
```



### q('body').classRemove('...')

Removes a class from a node, making it similar to:

```
    document.body.classList.remove('...')
```



### q('body').classToggle('...')

Toggles a class on a node, making it similar to:

```
    document.body.classList.toggle('...')
```


### q('body').classContains('...')

Returns true is class if found or false if not, making it similar to:

```
    document.body.classList.contains('...')
```



### q('body').classes()

Returns all the known classes on the node, making it similar to:

```
    document.body.className.split(' ')
```



### q('body').style('background')

Gets the value of a style, making it similar to:

```
    document.body.style.background
```

### q('body').style('background', 'red')

Sets the value of a style, making it similar to:

```
    document.body.style.background = 'red'
```



### q('input').value()

Gets the `.value` of an input.



### q('input').value('...')

Sets the `.value` of an input.



###  q('body').text()

Gets the `.innerText`



### q('body'.text('Hello World')

Set the `.innerText`



### q('body').html()

Gets the `.innerHTML`.



### q('body').html('...')

Sets the `.innerHTML`.



### q('body').htmlAppend('...')

Adds html to the end.



### q('body').htmlPrepend('...')

Adds html to the beginning.



### q('body').htmlReplace('hello world', 'hello john')

Replaces the substring within the HTML.



### q('body').htmlFetch(url, options)

Automatically fetches HTML and inserts it into the node.



### 


		templateDefine: function(callback){
			return this.forEach((node)=>{
				node.setAttribute('data-template', 'true');
				node.templateCallback = callback;
			})
		},
		templateUpdate: function(data){
			return this.forEach((node)=>{
				node.innerHTML = node.templateCallback(data, q(node))
			})
		},
		templateFetch: function(
			url, 
			options = {}, 
			error = (err)=>{console.warn(`$('${this.query}').templateFetch('${url}') - ${err}`)}
		){
			this.forEach((node)=>{
				fetch(url, options)
					.then((res)=>{return res.json()})
					.then((dat)=>{node.innerHTML = node.templateCallback(dat)})
					.catch((err)=>{error(err)})
			})
		},
		stateDefine: function(state, callback){
			return this.forEach((node)=>{
				node.setAttribute('data-state', state);
				node.states = node.states || {};
				node.states[state] = callback;
			})
		},
		stateUpdate: function(state, data){
			return this.forEach((node)=>{
				node.innerHTML = node.states[state](data, q(node))
			})
		},
		stateFetch: function(
			state, 
			url, 
			options = {}, 
			error = (err)=>{console.warn(`$('${this.query}').stateFetch('${url}') - ${err}`)}
		){
			return this.forEach((node)=>{
				fetch(url, options)
					.then((res)=>{return res.json()})
					.then((dat)=>{node.innerHTML = node.states[state](dat, q(node))})
					.catch((err)=>{error(err)})
			})
		},



		remove: function(){
			return this.forEach((node)=>{
				node.remove()
			})
		},
		event: function(type, callback){
			return this.forEach((node)=>{
				node.addEventListener(type, callback)
			})
		},
		click: function(){
			return this.forEach((node)=>{
				node.click()
			})
		},
		hide: function(){
			return this.forEach((node)=>{
				node.hidden = true
			})
		},
		show: function(){
			return this.forEach((node)=>{
				node.hidden = false
			})
		},
		info: function(){
			return {
				w: this.nodes[0].offsetWidth,
				h: this.nodes[0].offsetHeight,
				x: this.nodes[0].offsetLeft,
				y: this.nodes[0].offsetTop,
			}
		},
		type: function(){
			return this.nodes[0].tagName || this.nodes[0].nodeName
		},
	

		
		formData: function(form = this.nodes[0]){
			let dat = new FormData(form);
			let obj = {};
			for(const key of dat.keys()){
				obj[key] = dat.get(key)
			}
			return obj	
		},
		formValidate: function(callback){
			this.nodes[0].formValidate = callback;
			return this
		},
		formSubmit: function(callback){
			this.nodes[0].formSubmit = callback;
			this.nodes[0].addEventListener('submit', (event)=>{
				event.preventDefault();
				let form = event.target.closest('form');
				let data = this.formData(form);
				let validate = form.formValidate(data, q(form));
				if(validate){ form.formSubmit(data, q(form)) }
			});
			return this
		},
	}
}


