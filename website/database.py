from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class Time(db.Model):

    __tablename__ = 'times'

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer, nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)

def connect_db(app):
    db.app = app
    db.init_app(app)