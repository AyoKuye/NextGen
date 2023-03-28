from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
import json
from bson.json_util import dumps
# from flask_cors import CORS

api = Flask(__name__)
cors = CORS(api)

client = pymongo.MongoClient("mongodb+srv://nextgen:OVh1edzm5KoDudsU@cluster0.btngql0.mongodb.net/test")

passworddb = client.credentials
projectdb = client.projects
usersdb = client.users
hardwaredb = client.hardwareSet

passwords = passworddb.password
projects = projectdb.project
users = usersdb.user

# Incoming- {'userid': , 'password': }
# Outgoing-
# if success {"data": 200}
# if failure {"data": 208}
@api.route('/api/login/', methods=['POST'])
def log():
    print(request.json)
    if login(request.json['userid'], request.json['password']):
        return jsonify({"data": 200})
    return jsonify({"data": 208})


def login(user_input, pass_input):
    myquery = {"userId": user_input, "password": pass_input}
    x = passwords.find_one(myquery)
    if (x == None):
        return False
    return True


# Incoming - {"userid":"", "name":"", "password": ""}
# Outgoing -
# if success {"data": "success"}
# if failure {"data": "failure"}
@api.route('/api/signup/', methods=['POST'])
def sign():
    print(request.json)
    myquery = {"userId": request.json['userid']}
    x = passwords.find_one(myquery)
    if (x == None):
        password_document = {
            "name": request.json['name'],
            "userId": request.json['userid'],
            "password": request.json['password']
        }
        passwords.insert_one(password_document)
        user_document = {
            "userId": request.json['userid'],
            "projectId": list()
        }
        users.insert_one(user_document)
        return jsonify({"data": "success"})
    return jsonify({"data": "failure"})


# Incoming- {"projectName" : "", "projectID" : "", "user":""}
# Outgoing -
# if success {"data": "success"}
# if failure {"data": "failure"}
@api.route('/api/createproject/', methods=['POST'])
def createProject():
    print(request.json)
    myquery = {"ProjectId": request.json['projectID']}
    x = projects.find_one(myquery)
    if x != None:
        print("failure")
        return jsonify({"data": "failure"})

    projectUsers = []
    projectUsers.append(request.json['user'])
    projectDocument = {
        "ProjectName": request.json['projectName'],
        "ProjectId": request.json['projectID'],
        "hwset1": 0,
        "hwset2": 0,
        "users": projectUsers
    }
    projects.insert_one(projectDocument)

    myquery2 = {"userId": request.json['user']}
    x2 = users.find_one(myquery2)
    temp2 = x2['projectId']
    newstr = request.json['projectID']
    print(type(temp2))
    print(newstr)
    temp2.append(newstr)
    print(temp2)
    x3 = {"$set": {'projectId': temp2}}
    users.update_one(myquery2, x3)


    return jsonify({"data": "success"})


@api.route('/api/getProjects/<user>', methods=['POST', 'GET'])
def getProjects(user):
    data = list(projects.find())
    return json.loads(dumps(data))


@api.route('/api/checkin/<projectid>/<qty>', methods=['POST', 'GET'])
def checkIn_hardware(projectid, qty):
    return jsonify(projectid, qty)


@api.route('/api/checkout/<projectid>/<qty>', methods=['POST', 'GET'])
def checkOut_hardware(projectid, qty):
    return jsonify(projectid, qty)


@api.route('/api/join/<projectid>/<userid>', methods=['POST', 'GET'])
def joinProject(projectid, userid):
    return projectid


@api.route('/api/leave/<projectid>', methods=['POST', 'GET'])
def leaveProject(projectid):
    return projectid



