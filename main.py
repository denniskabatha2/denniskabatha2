from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Create static/assets directory if it doesn't exist
    os.makedirs('static/assets', exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)