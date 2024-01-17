from flask import Flask, request, redirect, render_template, jsonify
from database import db, connect_db, Time

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:3416SbSp13MS@localhost/rsx2024"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    print("test")
    value = request.args["value"]
    print(value)
    return jsonify({"value": value})