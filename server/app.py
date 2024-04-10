from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from models import db, Event
from datetime import datetime
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config.from_object(Config)

# Ensure the upload folder exists
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

CORS(app)
db.init_app(app)
with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

def format_date(date):
    """Convert a datetime.date object into 'YYYY-MM-DD' string format."""
    return date.strftime('%Y-%m-%d') if date else ''

def allowed_file(filename):
    """Check if the file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/events', methods=['POST'])
def create_event():
    if 'image' in request.files:
        image = request.files['image']
        if image.filename == '' or not allowed_file(image.filename):
            return jsonify({"error": "No selected file or file type not allowed"}), 400
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
    else:
        return jsonify({"error": "Image file is required"}), 400
    
    name = request.form.get('name')
    description = request.form.get('description')
    date_str = request.form.get('date')
    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date() if date_str else None
        event = Event(name=name, description=description, date=date_obj)
        db.session.add(event)
        db.session.commit()
        return jsonify({"message": "Event added successfully", "id": event.id, "image_path": image_path}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/events', methods=['GET'])
def list_events():
    events = Event.query.all()
    events_data = [{"id": event.id, "name": event.name, "description": event.description, "date": format_date(event.date)} for event in events]
    return jsonify(events_data), 200

@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    event_data = {"id": event.id, "name": event.name, "description": event.description, "date": format_date(event.date)}
    return jsonify(event_data), 200

@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = Event.query.get_or_404(event_id)
    data = request.json
    try:
        event.date = datetime.strptime(data['date'], '%Y-%m-%d').date() if data.get('date') else event.date
        event.name = data.get('name', event.name)
        event.description = data.get('description', event.description)
        db.session.commit()
        return jsonify({"message": "Event updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    try:
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Event deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
