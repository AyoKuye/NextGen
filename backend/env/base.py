from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo
# from flask_cors import CORS

api = Flask(__name__)
cors = CORS(api)

client = pymongo.MongoClient("mongodb+srv://nextgen:OVh1edzm5KoDudsU@cluster0.btngql0.mongodb.net/test")
db = client.credentials

passwords = db.password




@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body


@api.route('/api/login/', methods=['POST'])
def log():
    print(request.json)
    if login(request.json['userid'], request.json['password']):
        return jsonify({"data": 200})
    return jsonify({"data": 208})


@api.route('/api/signup/', methods=['POST'])
def sign():
    print(request.json)
    passwordDocument = {
        "name": request.json['name'],
        "userId": request.json['userid'],
        "password": request.json['password']
    }
    passwords.insert_one(passwordDocument)
    return jsonify({"data": "success"})


def login(user_input, pass_input):
    myquery = {"userId": user_input, "password": pass_input}
    x = passwords.find_one(myquery)
    if (x == None):
        return False
    return True

