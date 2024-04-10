from app import app, db  # Adjusted to include the correct path
from models import Event
from datetime import date


def seed_database():
    print("Seeding the database...")

    # Drop all existing data and recreate the tables
    db.drop_all()
    db.create_all()


    # Seed data: List of events
    events = [
        Event(name='Research Paper Writing Workshop', description='Learn how to write effective research papers.', date=date(2024, 5, 1)),
        Event(name='Data Analysis Basics', description='Introduction to data analysis techniques.', date=date(2024, 6, 15)),
        Event(name='Innovations in Environmental Science', description='Exploring innovative solutions for environmental conservation.', date=date(2024, 7, 20)),
        Event(name='AI in Academic Research', description='Using artificial intelligence to enhance research methodologies.', date=date(2024, 8, 5))
    ]

    # Add all events to the session and commit
    db.session.add_all(events)
    db.session.commit()

    print("Database seeded successfully!")

if __name__ == '__main__':
    with app.app_context():  
        seed_database()
