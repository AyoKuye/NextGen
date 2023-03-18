from flask import Flask, request
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb+srv://nextgen:<nextgen1234>@cluster0.btngql0.mongodb.net/?retryWrites=true&w=majority")
db = client.NextGen
collection = db.Users

@app.route('/api/signup/', methods=['POST'])
def signup():
    username = request.json.get('username')
    userid = request.json.get('userid')
    password = request.json.get('password')

    # Check if user already exists
    existing_user = collection.find_one({'userid': userid})
    if existing_user:
        return {'error': {'message': 'User already exists'}}, 400

    # Insert user into database
    new_user = {'username': username, 'userid': userid, 'password': password}
    collection.insert_one(new_user)
    return {'message': 'User created successfully'}, 200


@app.route('/api/login/', methods=['POST'])
def login():
    userid = request.json.get('userid')
    password = request.json.get('password')

    # Find user in database
    user = collection.find_one({'userid': userid})
    if not user:
        return {'error': {'message': 'User not found'}}, 400

    # Check password
    if password != user['password']:
        return {'error': {'message': 'Incorrect password'}}, 400

    return {'userid': userid}, 200

if __name__ == '__main__':
    app.run()
