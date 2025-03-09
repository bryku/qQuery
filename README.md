# qQuery

jQuery alternative (3.5kB)

### .text() - v1

Get or set innerText.

    q('body').text('Hello World);
    q('body').text(); // "Hello World"
    

### .html() - v1

Get or set innerHTML.

    q('body').html('Hello World);
    q('body').html(); // "Hello World"

### .htmlPrepend() - v1

Adds HTML to the beginning of an element.

    q('body').htmlPrepend('<h1>Start</h1>'); 

### .htmlAppend() - v1

Adds HTML to the end of an element.

    q('body').htmlAppend('<h1>End</h1>');

### .htmlReplace() - v1

    q('body').htmlReplace('Hello World', 'Hello John'); 

### .htmlFetch() - v1

Fetch text and sets it as `.innerHTML`.

    q('body').htmlFetch('./data/news.txt');

### .templateDefine() - v1

Defines a Template function.

    q('ul').templateDefine((data)=>{
        return data.forEach((v)=>{`<li>${v}</li>`)}.join('')
    });

### .templateUpdate() - v1

Updates a Template.

    q('ul').templateUpdate([
        'Cookies',
        'Donats',
        'Pudding',
    ]);

### .templateFetch() - v1

Fetches JSON Data and passes it to the `.templateDefine()` function.

    q('ul').templateFetch('./favoriteFood.json');

### .stateDefine() - v2

    q('ul').stateDefine('favorite food', (food)=>{
        return data.forEach((v)=>{`<li class="favoriteFood">${v}</li>`)}.join('')
    });
    q('ul').stateDefine('favorite drinks', (drinks)=>{
        return data.forEach((v)=>{`<li class="favoriteDrinks">${v}</li>`)}.join('')
    });

### .stateUpdate() - v2

    q('ul').templateUpdate('favorite food',[
        'Cookies',
        'Donats',
        'Pudding',
    ]);

### .stateFetch() - v2

    q('ul').stateFetch('favorite food', './favoriteFood.json');

### .classAdd() - v1

    q('body').classAdd('background-grey');

### .classRemove() - v1

    q('body').classRemove('background-grey');

### .classToggle() - v1

    q('body').classToggle('background-grey');

### .classContains() - v1

    q('body').classContains('background-grey') // true || false

### .style() - v1

    q('body').style('background', 'red');
    q('body').style('background'); // "red"

### .attribute() - v1

    q('body').attribute('data-name', 'john doe');
    q('body').attribute('data-name'); // "john doe"

### .remove() - v1

Removes the Element from the document.

### .empty() - v1

Removes the Element's children from the document.

### .event() - v1

Creates an event.

    q('button').event('click', (event)=>{
        console.log('You clicked me!');
    })

### .info() - v1

Returns an object with w, h, x, y.

    q('button').info();

### .parent() - v1

Gets parent element.

### .query() - v1

Query selects from an element going down.

    q('ul').query('li').remove();

### .closest() - v1

Query selects from an element going up.

    q('input').closest('parent').remove();

### .clone() - v1

Clones an element. 

    q('div').clone(); // "<div></div>"

### .forEach() - v1

Loops through your element returning the javascript element without the qQuery wrapper.

    q('button').forEach((node)=>{
        node.innerText = 'Click Me';
    });

### .node() - v1

Allows you to use a javascript element without the qQuery wrapper.

    q('button').innerText = 'Click Me';





