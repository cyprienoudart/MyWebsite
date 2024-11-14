from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/translate', methods=['GET'])
def translate():
    word = request.args.get('word')
    source_lang = request.args.get('source', 'english')
    target_lang = request.args.get('target', 'french')
    
    # Example Linguee URL (English to French)
    url = f"https://www.linguee.com/{source_lang}-{target_lang}/search?source={source_lang}&query={word}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract translation, definition, and example (adjust according to Linguee HTML structure)
    translations = []
    for entry in soup.select('.translation'):
        translation = entry.get_text(strip=True)
        translations.append(translation)

    # Example format for response data
    return jsonify({
        "translations": translations[:3],  # Limit to first 3 translations
    })

if __name__ == '__main__':
    app.run(debug=True)
