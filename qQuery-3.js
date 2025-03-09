qVersion = 3;
qCache = [];
qCacheLimit = 50;
qCacheQuery = (query)=>{
	let q = qCache.find((object)=>{return object.query == query});
	if(!q){
		q = {
			query: query,
			node: document.querySelectorAll(query)
		}
		qCache.push(q)
	}
	if(qCache.length > qCacheLimit){
		setTimeout(function(){
			qCache.shift()
		})
	}
	return q.node
};
function q(query){
	return {
		query: query,
		nodes: typeof query == 'string' ? qCacheQuery(query) : query,
		node: function(){return this.nodes[0]},
		forEach: function(callback){
			for(let i = 0; i < this.nodes.length; i++){
				let v = callback(this.nodes[i], i, this.nodes);
				if(v){return v}
			}
			return this
		},
		value: function(str){
			return this.forEach((node)=>{
				if(str){node.value = str}
				else{return node.value}
			})
		},
		values: function(){
			let obj = {};
			let dat = new FormData(this.nodes[0].closest('form'));
			for(const key of dat.keys()){
				obj[key] = dat.get(key)
			}
			return obj
		},
		text: function(str){
			return this.forEach((node)=>{
				if(str){node.innerText = str}
				else{return node.innerText}
			})
		},
		html: function(str){
			return this.forEach((node)=>{
				if(str){node.innerHTML = str}
				else{return node.innerHTML}
			})
		},
		htmlAppend: function(str){
			return this.forEach((node)=>{
				node.innerHTML += str
			})
		},
		htmlPrepend: function(str){
			return this.forEach((node)=>{
				node.innerHTML = str + node.innerHTML
			})
		},
		htmlReplace: function(str, newstr){
			return this.forEach((node)=>{
				node.innerHTML = node.innerHTML.replace(str, newstr)
			})
		},
		htmlFetch: function(url, options = {}){
			this.forEach((node)=>{
				fetch(url, options)
					.then((res)=>{return res.text()})
					.then((txt)=>{node.innerHTML = txt})
					.catch((err)=>{console.warn(`$('${this.query}').htmlFetch('${url}') - Error 404`)})
			})
		},
		templateDefine: function(callback){
			return this.forEach((node)=>{
				node.templateCallback = callback
			})
		},
		templateUpdate: function(data){
			return this.forEach((node)=>{
				if(!node.templateCallback){
					console.warn(`$('${this.query}').templateUpdate() - No template defined`);
				}else{
					node.innerHTML = node.templateCallback(data, node)
				}
			})
		},
		templateFetch: function(url, options = {}){
			this.forEach((node)=>{
				fetch(url, options)
					.then((res)=>{return res.json()})
					.then((dat)=>{node.innerHTML = node.templateCallback(dat, node)})
					.catch((err)=>{console.warn(`$('${this.query}').templateFetch('${url}') - Error 404`)})
			})
		},
		stateDefine: function(state, callback){
			return this.forEach((node)=>{
				node.states = node.states || {};
				node.states[state] = callback;
			})
		},
		stateUpdate: function(state, data){
			return this.forEach((node)=>{
				if(!node.states[state]){
					console.warn(`$('${this.query}').stateUpdate('${state}') - No state defined`);
				}else{
					node.innerHTML = node.states[state](data, node)
				}				
			})
		},
		stateFetch: function(state, url, options = {}){
			this.forEach((node)=>{
				fetch(url, options)
					.then((res)=>{return res.json()})
					.then((dat)=>{node.innerHTML = node.states[state](dat, node)})
					.catch((err)=>{console.warn(`$('${this.query}').stateFetch('${url}') - Error 404`)})
			})
		},
		classAdd: function(...classes){
			return this.forEach((node)=>{
				node.classList.add(...classes)
			})
		},
		classRemove: function(...classes){
			return this.forEach((node)=>{
				node.classList.remove(...classes)
			})
		},
		classToggle: function(...classes){
			return this.forEach((node)=>{
				node.classList.toggle(...classes)
			})
		},
		classContains: function(class_name){
			this.nodes[0].classList.contains(class_name)
		},
		classes: function(){
			this.nodes[0].className.split(' ')
		},
		style: function(style, value){
			return this.forEach((node)=>{
				if(value){node.style[style] = value}
				else{return node.style[style]}
			})
		},
		attribute: function(key, value){
			return this.forEach((node)=>{
				if(value){node.setAttribute(key, value)}
				else{return node.getAttribute(key)}
			})
		},
		remove: function(){
			return this.forEach((node)=>{
				node.remove()
			})
		},
		empty: function(){
			return this.forEach((node)=>{
				for(let i = 0; i < node.children.length; i++){
					node.children[i].remove()
				}
			})
		},
		event: function(type, callback){
			return this.forEach((node)=>{
				node.addEventListener(type, callback)
			})
		},
		click: function(){
			this.nodes[0].click()
		},
		info: function(){
			return {
				w: this.nodes[0].offsetWidth,
				h: this.nodes[0].offsetHeight,
				x: this.nodes[0].offsetLeft,
				y: this.nodes[0].offsetTop,
			}
		},
		parent: function(){
			return q(this.nodes[0].parentElement)
		},
		closest: function(query){
			return q(this.nodes[0].closest(query))
		},
		query: function(query){
			return q(this.nodes[0].querySelector(query))
		},
		clone: function(){
			return this.nodes[0].cloneNode(true)
		},
	}
}
