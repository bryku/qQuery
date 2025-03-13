# qQuery

jQuery alternative at 4.8kb (qQuery-1.min.js) or 6.5kb (qQuery-1.js).

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



### q('ul').templateDefine(()=>{ ... })

Defines a template.

```
    q('ul').templateDefine((array)=>{
        return array.map((item)=>{
            return `<li>${item}</li>`
        }).join('')
    });
    q('ul).templateUpdate(['Apple', 'Blueberry', 'Carrot']);
```



### q('ul').templateUpdate(...)

Updates a template.

```
    q('ul').templateDefine((array)=>{
        return array.map((item)=>{
            return `<li>${item}</li>`
        }).join('')
    });
    q('ul).templateUpdate(['Apple', 'Blueberry', 'Carrot']);
```



### q('ul').templateFetch(url, options)

Fetches JSON to automatically update a template.

```
    q('ul').templateDefine((array)=>{
        return array.map((item)=>{
            return `<li>${item}</li>`
        }).join('')
    });
    q('ul').templateFetch('/api/news')
```



### q('ul').stateDefine(name, callback)

Defines a State which allows you to use multiple templates.

```
    q('ul').stateDefine('food', (array)=>{
        return array.map((item)=>{
            return `<li class="food">${item}</li>`
        }).join('')
    });
    q('ul').stateDefine('animals', (array)=>{
        return array.map((item)=>{
            return `<li class="animals'>${item}</li>`
        }).join('')
    });
    q('ul').stateUpdate('food', ['Apple', 'Blueberry', 'Carrot']);
```



### q('ul').stateUpdate(name, ...)

Updates a state.

```
    q('ul').stateDefine('food', (array)=>{
        return array.map((item)=>{
            return `<li class="food">${item}</li>`
        }).join('')
    });
    q('ul').stateDefine('animals', (array)=>{
        return array.map((item)=>{
            return `<li class="animals'>${item}</li>`
        }).join('')
    });
    q('ul').stateUpdate('food', ['Apple', 'Blueberry', 'Carrot']);
```


### q('ul').stateFetch(name, ...)

Fetches json to automatically update a state.

```
    q('ul').stateDefine('food', (array)=>{
        return array.map((item)=>{
            return `<li class="food">${item}</li>`
        }).join('')
    });
    q('ul').stateDefine('animals', (array)=>{
        return array.map((item)=>{
            return `<li class="animals'>${item}</li>`
        }).join('')
    });
    q('ul').stateUpdate('food', ['Apple', 'Blueberry', 'Carrot']);
```

### q('button').remove()

Removes the node from dom (document).



### q('button').click()

Triggers the click event on a node.



### q('button').hide()

Hides an node in dom.



### q('button').show()


Shows an element in dom.



### q('button').event(type, ()=>{})

Creates an event listener.



### q('button').type()

Gets the node type.

```
    q('button').type() // "BUTTON"
```



### q('button').info()

Gets position information.

```
    q('button').info() 
    
    // {w: ...., h: ..., x: ..., y:...}
```

### q('form').formValidate((data)=>{ ... })

Validates the form before submitting.

```
    q('form').formValidate((data)=>{
        if(data.password.length == 0){
            return false; 
        }
        return true
    }).formSubmit((data)=>{
        console.log(data);
    })
```

### q('form').formSubmit((data)=>{ ... })

Handles the form if validation is true.

```
    q('form').formValidate((data)=>{
        if(data.password.length == 0){
            return false; 
        }
        return true
    }).formSubmit((data)=>{
        console.log(data);
    })
```



