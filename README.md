# qQuery

jQuery alternative (3.5kB)

### .text()

Get or set innerText.

    q('body').text();              // get innerText
    q('body').text('Hello World);  // set innerText

### .html()

Get or set innerHTML.

    q('body').html();
    q('body').html('Hello World);

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




