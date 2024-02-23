// Script Name: LongmanToAnkiExtension.js

function getDefinition(word) {
    // Define the URL pattern for Longman Dictionary searches
    const queryURL = `https://www.ldoceonline.com/dictionary/${word}`;

    fetch(queryURL)
        .then(response => response.text())
        .then(html => {
            // Parse the HTML to find the definition
            // This is a simplistic approach; actual implementation may require more robust HTML parsing
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const definition = doc.querySelector('.definition').innerText;

            // Display the definition or further process it for Anki
            console.log(definition);

            // Here, you'd add functionality to format this definition and
            // send it to Anki, either via AnkiConnect or by generating a suitable import file
        })
        .catch(err => {
            console.error('Error fetching definition:', err);
        });
}

// Example usage
getDefinition('example');
