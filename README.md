# qQuery

jQuery alternative (3.5kB)

### .text()

Get or set innerText.

    q('body').text('Hello World);
    q('body').text(); // "Hello World"
    

### .html()

Get or set innerHTML.

    q('body').html('Hello World);
    q('body').html(); // "Hello World"

### .htmlPrepend()

Adds HTML to the beginning of an element.

    q('body').htmlPrepend('<h1>Start</h1>'); 

### .htmlAppend()

Adds HTML to the end of an element.

    q('body').htmlAppend('<h1>End</h1>');

### .htmlReplace()

    q('body').htmlReplace('Hello World', 'Hello John'); 

### .htmlFetch()

Fetch text and sets it as `.innerHTML`.

    q('body').htmlFetch('./data/news.txt');

### .templateDefine()

Defines a Template function.

    q('ul').templateDefine((data, node)=>{
        return data.forEach((v)=>{`<li>${v}</li>`)}.join('')
    });

### .templateUpdate()

Updates a Template.

    q('ul').templateUpdate([
        'Cookies',
        'Donats',
        'Pudding',
    ]);

### .templateFetch()

Fetches JSON Data and passes it to the `.templateDefine()` function.

    q('ul').templateFetch('./favoriteFood.json');

### .classAdd()

    q('body').classAdd('background-grey');

### .classRemove()

    q('body').classRemove('background-grey');

### .classToggle()

    q('body').classToggle('background-grey');

### .classContains()

    q('body').classContains('background-grey') // true || false

### .style()

    q('body').style('background', 'red');
    q('body').style('background'); // "red"

### .attribute()

    q('body').attribute('data-name', 'john doe');
    q('body').attribute('data-name'); // "john doe"

### .remove()

Removes the Element from the document.

### .empty()

Removes the Element's children from the document.

### .event()

Creates an event.

    q('button').event('click', (event)=>{
        console.log('You clicked me!');
    })

### .info()

Returns an object with w, h, x, y.

    q('button').info();

### .parent()

Gets parent element.

### .query()

Query selects from an element going down.

    q('ul').query('li').remove();

### .closest()

Query selects from an element going up.

    q('input').closest('parent').remove();

### .clone()

Clones an element. 

    q('div').clone(); // "<div></div>"

### .forEach()

Loops through your element returning the javascript element without the qQuery wrapper.

    q('button').forEach((node)=>{
        node.innerText = 'Click Me';
    });

### .node()

Allows you to use a javascript element without the qQuery wrapper.

    q('button').innerText = 'Click Me';





