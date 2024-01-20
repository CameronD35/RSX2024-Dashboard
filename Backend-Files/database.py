from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Time(db.Model):

    __tablename__ = 'times'

    id = db.Column(db.Integer, primary_key=True)
    sliderVal = db.Column(db.Integer, nullable=False)

    currentDateTime = datetime.now()
    currentTime = currentDateTime.strftime("%H:%M:%S")

    time = db.Column(db.Text, nullable=False, default=currentTime)

    currentDate = f"{currentDateTime.month}/{currentDateTime.day}"

    day = db.Column(db.Text, nullable=False, default=currentDate)

def connect_db(app):
    db.app = app
    db.init_app(app)