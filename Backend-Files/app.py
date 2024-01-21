from flask import Flask, request, redirect, render_template, jsonify
from flask_cors import CORS
from database import db, connect_db, Time
import simplejson as json
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:3416SbSp13MS@localhost/rsx2024"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
cors = CORS(app)
connect_db(app)

def getTime():
    currentDateTime = datetime.now()
    currentTime = currentDateTime.strftime("%H:%M:%S")

    return currentTime

def getDate():
    currentDateTime = datetime.now()
    currentDate = f"{currentDateTime.month}/{currentDateTime.day}"

    return currentDate

with app.app_context():
    db.create_all()

@app.route("/dashboard", methods=["POST"])
def dashboard():

    print(request.json['value'])

    valueDict = {}

    valueList = db.session.query(Time.id, Time.sliderVal).all()

    for value in valueList:
        valueDict[value[0]] = value[1]
        #valueDict.update(dict(((x, y) for x, y in value)))

    # valueDict = json.loads(json.dumps(request.get_json()))
    # print(valueDict)
    # print(datetime.time)

    
    # db.session.add(time)
    # db.session.commit()

    return jsonify(valueDict)

    
    # print("test")
    # value = request.args["value"]
    # print(value)
    # return jsonify({"value": value})