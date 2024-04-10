from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=False)  # Use db.Date for dates without times


    def __repr__(self):
        return f'<Event {self.name}>'