from flask import Flask, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')  # Ensure the uploads directory is correctly referenced
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create the uploads directory if it doesn't exist

def allowed_file(filename):
    """Check if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/events', methods=['POST'])
def upload_event():
    event_data = {}
    file = request.files.get('image')
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        event_data['filename'] = filename
    else:
        return jsonify(error="Invalid or no file uploaded"), 400
    
    for field in ['name', 'description', 'date']:
        if field in request.form:
            event_data[field] = request.form[field]
    
    # Ideally, save event_data to your database here
    
    return jsonify(message="File and data processed successfully", data=event_data), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    try:
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    except FileNotFoundError:
        return jsonify(error="File not found"), 404

if __name__ == '__main__':
    app.run(debug=True)

    
if __name__ == '__main__':
    app.run(debug=True)
