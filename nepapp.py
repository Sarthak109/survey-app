
from flask import Flask,jsonify, request
from flask_restful import Api,Resource
from flask.json import JSONEncoder
import nepdb as dbs
from security import authenticate,identity
from flask_jwt import JWT, jwt_required,current_identity
from flask_cors import CORS
import json


app=Flask(__name__)
app.config['SECRET_KEY'] = 'app@123!'
jwt = JWT(app,authenticate,identity)
api = Api(app)
CORS(app)



@app.route("/addsurvey",methods=["POST"])
def add_new_survey():
    surveys=request.json
    dbs.add_survey(surveys)
    return "done"

@app.route("/getquestions")
def getquestions():
    return dbs.get_questions()

@app.route("/updatequestion/<string:topic_id>",methods=["PUT"])
def updatequestion(topic_id):
    expression=request.json
    dbs.update_questions(topic_id,expression)
    return"updated"


@app.route("/addquestion/<string:topic_id>",methods=["PUT"])
def addquestion(topic_id):
    expression=request.json
    dbs.add_question(topic_id,expression)
    return "added"

@app.route("/deletequestion/<string:topic_id>/<string:ref>",methods=["DELETE"])
def deletequestion(topic_id,ref):
    dbs.delete_question(topic_id,ref)
    return "deleted"

@app.route("/addsection",methods=["POST"])
def addsection():
    tid=request.json["topicId"]
    tname=request.json["topicName"]
    doc={"topicId":tid,"topicName":tname,"data":[]}
    dbs.add_section(doc)
    return "added"

@app.route("/deletesection/<string:topic_id>",methods=["DELETE"])
def deletesection(topic_id):
    dbs.delete_section(topic_id)
    return "deleted section"

app.run(port=5000)