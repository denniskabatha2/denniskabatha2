from flask import Flask, render_template, request, jsonify
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit-contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        # Here you would typically send an email or store in database
        # For now, we'll just log it
        print(f"Contact form submission: {data}")
        return jsonify({"status": "success", "message": "Message sent successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/projects')
def get_projects():
    # Sample project data
    projects = [
        {
            "id": 1,
            "title": "3D Visualization",
            "description": "Interactive 3D product configurator",
            "image": "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
            "category": "3d",
            "technologies": ["Three.js", "WebGL", "JavaScript"]
        },
        {
            "id": 2,
            "title": "E-commerce Platform",
            "description": "Modern shopping experience",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
            "category": "web",
            "technologies": ["React", "Node.js", "MongoDB"]
        }
    ]
    category = request.args.get('category', 'all')
    if category != 'all':
        projects = [p for p in projects if p['category'] == category]
    return jsonify(projects)

@app.route('/api/blog-posts')
def get_blog_posts():
    # Sample blog post data
    posts = [
        {
            "id": 1,
            "title": "Modern Web Development",
            "excerpt": "Exploring the latest trends in web development...",
            "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
            "date": datetime.now().strftime("%B %d, %Y")
        },
        {
            "id": 2,
            "title": "3D Graphics with Three.js",
            "excerpt": "Creating immersive 3D experiences on the web...",
            "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            "date": datetime.now().strftime("%B %d, %Y")
        }
    ]
    return jsonify(posts)

if __name__ == '__main__':
    os.makedirs('static/assets', exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)