from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
import json
from bson.json_util import dumps
# from flask_cors import CORS

api = Flask(__name__)
cors = CORS(api)

client = pymongo.MongoClient(
    "mongodb+srv://nextgen:OVh1edzm5KoDudsU@cluster0.btngql0.mongodb.net/test")

passworddb = client.credentials
projectdb = client.projects
usersdb = client.users
hardwaredb = client.hardwareSet

passwords = passworddb.password
projects = projectdb.project
users = usersdb.user
hardware = hardwaredb.hardware

# Incoming- {'userid': , 'password': }
# Outgoing-
# if success {"data": 200}
# if failure {"data": 208}


# encryption function
def encrypt(inputText, N, D):
    # convert string to list
    inputText = list(inputText)

    # reverse the list
    inputText.reverse()

    # +1 shift right else left
    if D == 1:
        for i in range(0, len(inputText)):
            if inputText[i] == ' ' or inputText[i] == '!':
                print("Input text can't contain \' \' and !")
            else:
                inputText[i] = chr(ord(inputText[i])+N)
    else:
        for i in range(0, len(inputText)):
            if inputText[i] == ' ' or inputText[i] == '!':
                print("Input text can't contain \' \' and !")
            else:
                inputText[i] = chr(ord(inputText[i])-N)
    answerString = "".join(inputText)
    return answerString

# decryption function


def decrypt(inputText, N, D):
    # convert string to list
    inputText = list(inputText)

    # reverse the list
    inputText.reverse()

    # +1 shift right else left
    if D == 1:
        for i in range(0, len(inputText)):
            inputText[i] = chr(ord(inputText[i])-N)
    else:
        for i in range(0, len(inputText)):
            inputText[i] = chr(ord(inputText[i])+N)
    answerString = "".join(inputText)
    return answerString


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
    temp2.append(newstr)
    x3 = {"$set": {'projectId': temp2}}
    users.update_one(myquery2, x3)

    return jsonify({"data": "success"})


@api.route('/api/getProjects/<user>', methods=['POST', 'GET'])
def getProjects(user):
    myquery = {"userId": user}
    userlist = list(users.find_one(myquery)['projectId'])

    allproject = []

    for project in userlist:
        myquery2 = {"ProjectId": project}
        x = projects.find_one(myquery2)
        allproject.append(x)

    data = {}

    data['data'] = json.loads(dumps(allproject))
    data["hardware"] = json.loads(dumps(hardware.find()))

    return data


@api.route('/api/checkin/<projectid>/<set>/<qty>', methods=['POST', 'GET'])
def checkIn_hardware(projectid, set, qty):
    print(projectid + " " + set + " " + qty)
    myquery = {"ProjectId": projectid}
    x = projects.find_one(myquery)
    if x is None:
        return jsonify({"data": "failure"})

    checkinqty = int(qty)
    if checkinqty > x[set]:
        checkinqty = x[set]

    print(checkinqty)
    x4 = {"$set": {set: x[set] - checkinqty}}
    projects.update_one(myquery, x4)

    myquery2 = {"name": set}
    x2 = hardware.find_one(myquery2)

    x3 = {"$set": {'value': x2['value'] + checkinqty}}
    hardware.update_one(myquery2, x3)

    return jsonify({"data": "success"})


@api.route('/api/checkout/<projectid>/<set>/<qty>', methods=['POST', 'GET'])
def checkOut_hardware(projectid, set, qty):
    print(projectid + " " + set + " " + qty)
    myquery = {"ProjectId": projectid}
    x = projects.find_one(myquery)

    if x is None:
        return jsonify({"data": "failure"})

    myquery2 = {"name": set}
    x2 = hardware.find_one(myquery2)
    # print(x2)
    if x2 is None:
        return jsonify({"data": "failure"})
    value = x2["value"]

    checkoutqty = int(qty)

    # print(value)
    if value < checkoutqty:
        checkoutqty = value
    print(checkoutqty)
    x3 = {"$set": {'value': value-checkoutqty}}
    hardware.update_one(myquery2, x3)

    x4 = {"$set": {set: x[set]+checkoutqty}}
    projects.update_one(myquery, x4)
    return jsonify({"data": "success"})

    return jsonify({"data": "success"})


@api.route('/api/join/<projectid>/<userid>', methods=['POST', 'GET'])
def joinProject(projectid, userid):
    myquery = {"ProjectId": projectid}
    x = projects.find_one(myquery)
    if x is None:
        return jsonify({"id": "failure", "data": "Project don't exist!"})

    projectUsers = x['users']
    if userid in projectUsers:
        return jsonify({"id": "failure", "data": "You are already part of the project!"})

    projectUsers.append(userid)
    projects.update_one(myquery, {"$set": {"users": projectUsers}})

    myquery2 = {"userId": userid}
    x2 = users.find_one(myquery2)
    temp2 = list(x2['projectId'])
    temp2.append(projectid)
    users.update_one(myquery2, {"$set": {'projectId': temp2}})

    return jsonify({"data": "success"})


@api.route('/api/leave/<projectid>/<user>', methods=['POST', 'GET'])
def leaveProject(projectid, user):
    myquery = {"ProjectId": projectid}
    x = projects.find_one(myquery)
    if x is None:
        return jsonify({"data": "failure"})

    projectUsers = x['users']
    if user in projectUsers:
        projectUsers.remove(user)
        projects.update_one(myquery, {"$set": {"users": projectUsers}})

    myquery2 = {"userId": user}
    x2 = users.find_one(myquery2)
    temp2 = list(x2['projectId'])
    if projectid in temp2:
        temp2.remove(projectid)
        users.update_one(myquery2, {"$set": {'projectId': temp2}})

    return jsonify({"data": "success"})
