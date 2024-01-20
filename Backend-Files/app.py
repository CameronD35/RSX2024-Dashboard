from flask import Flask, request, redirect, render_template, jsonify
from flask_cors import CORS
from database import db, connect_db, Time
import simplejson as json

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:3416SbSp13MS@localhost/rsx2024"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
cors = CORS(app)
connect_db(app)

with app.app_context():
    db.create_all()

@app.route("/dashboard", methods=["POST"])
def dashboard():
    valueDict = json.loads(json.dumps(request.get_json()))
    print(valueDict['value'])

    time = Time(sliderVal=valueDict['value'])
    print(time)
    db.session.add(time)
    db.session.commit()

    return jsonify(valueDict)

    
    # print("test")
    # value = request.args["value"]
    # print(value)
    # return jsonify({"value": value})