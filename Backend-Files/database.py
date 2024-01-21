from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def getTime():
    currentDateTime = datetime.now()
    currentTime = currentDateTime.strftime("%H:%M:%S")

    return currentTime

def getDate():
    currentDateTime = datetime.now()
    currentDate = f"{currentDateTime.month}/{currentDateTime.day}"

    return currentDate

class Time(db.Model):

    __tablename__ = 'times'

    id = db.Column(db.Integer, primary_key=True)
    sliderVal = db.Column(db.Integer, nullable=False)

    currentDateTime = datetime.now()
    currentTime = currentDateTime.strftime("%H:%M:%S")

    time = db.Column(db.Text, nullable=False, default=getTime())

    currentDate = f"{currentDateTime.month}/{currentDateTime.day}"

    day = db.Column(db.Text, nullable=False, default=getDate())

def connect_db(app):
    db.app = app
    db.init_app(app)