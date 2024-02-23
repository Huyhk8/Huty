async function findLongman(word) {
    const url = `https://www.ldoceonline.com//${encodeURIComponent(word)}`;
    let notes = [];

    try {
        let data = await api.fetch(url); // Assuming 'api.fetch' is a function that can perform an HTTP GET request.
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, "text/html");

        // Example of parsing for definitions - you need to adjust selectors based on actual page structure
        let definitions = doc.querySelectorAll('.Def'); // Adjust '.Def' to the actual selector for definitions
        let audios = [];
        // Example for audio - adjust based on actual attributes
        let pronunciation = doc.querySelector('.pronunciation .audio_play_button');
        if (pronunciation) {
            audios.push(pronunciation.getAttribute('data-src-mp3'));
        }

        definitions.forEach(def => {
            // Again, this is conceptual. You'll need to adjust based on how Longman structures its definitions.
            let definitionText = def.innerText.trim();
            if (definitionText) {
                notes.push({
                    expression: word,
                    reading: '', // Assuming Longman provides IPA or similar, adjust accordingly.
                    definition: definitionText,
                    audios // Assuming we've found audio URLs as noted above
                });
            }
        });
    } catch (err) {
        console.error('Error fetching Longman definition:', err);
        return null;
    }

    return notes;
}
