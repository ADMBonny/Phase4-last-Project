from flask import Flask, jsonify
from flask_migrate import Migrate
from extensions import db,  LoginManager
from flask_cors import CORS

import os


login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'default-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    CORS(app)
    Migrate(app, db)

    
    from auth import auth_bp
    app.register_blueprint(auth_bp)

    @app.route('/')
    def home():
        return jsonify({'message': 'Welcome to the Flask application!'})

    return app
