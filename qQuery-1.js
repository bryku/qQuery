let qVersion = '1.0';
let qCache = {
	limit: 50,
	nodes: [],
	limiter: function(){
		setTimeout(()=>{
			if(qCache.nodes.length > qCache.limit){
				qCache.nodes.shift()
			}
		})
	},
	query: function(query){
		this.limiter();
		return (this.nodes.find((node)=>{
			return node.query == query
		}) || this.nodes.concat({
			query: query,
			node: document.querySelectorAll(query)
		}).at(-1)).node
	},
};
function q(query){
	return {
		query: query,
		nodes: typeof query == 'string' ? qCache.query(query) : [query],
		node: function(){return this.nodes[0]},
		nodeClone: function(){
			return this.nodes[0].cloneNode(true)
		},
		findChild: function(query){
			return q(this.nodes[0].querySelector(query))
		},
		findParent: function(query){
			return q(this.nodes[0].closests(query))
		},
		forEach: function(callback){
			for(let i = 0; i < this.nodes.length; i++){
				let result = callback(this.nodes[i], i, this.nodes);
				if(result){return result}
			}
			return this
		},


		
		attribute: function(attribute, value = false){
			if(!value){ return this.nodes[0].getAttribute(attribute) }
			return this.forEach((node)=>{
				node.setAttribute(attribute, value)
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
		classContains: function(className){
			return this.nodes[0].classList.contains(className)
		},
		classes: function(){
			return this.nodes[0].className.split(' ')
		},
		style: function(style, value = false){
			if(!value){ return this.nodes[0].style[style] }
			return this.forEach((node)=>{
				node.style[style] = value
			})
		},
		value: function(value = false){
			if(!value){ return this.nodes[0].value }
			return this.forEach((node)=>{
				node.value = value
			})
		},
		text: function(text = false){
			if(!text){ return this.nodes[0].innerText }
			return this.forEach((node)=>{
				node.innerText = text
			})
		},
		html: function(html = false){
			if(!html){ return this.nodes[0].innerHTML }
			return this.forEach((node)=>{
				node.innerHTML = html
			})
		},
		htmlAppend: function(html = ''){
			return this.forEach((node)=>{
				node.innerHTML += html
			})
		},
		htmlPrepend: function(html = ''){
			return this.forEach((node)=>{
				node.innerHTML = html + node.innerHTML
			})
		},
		htmlReplace: function(match, replace){
			return this.forEach((node)=>{
				node.innerHTML = node.innerHTML.replace(match, replace)
			})
		},
		htmlFetch: function(
			url, 
			options = {}, 
			error = (err)=>{console.warn(`$('${this.query}').htmlFetch('${url}') - ${err}`)}
		){
			this.forEach((node)=>{
				fetch(url, options)
					.then((res)=>{return res.text()})
					.then((txt)=>{node.innerHTML = txt})
					.catch((err)=>{error(err)})
			})
		},
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
