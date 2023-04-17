import base
import pytest_check as check


def test_encrption_decryption():
    userID = "asamant"
    password = "Temp123"

    s = 3
    d = 1
    encrypteduserid = base.encrypt(userID, s, d)
    encryptedpassword = base.encrypt(password, s, d)

    decrypteduserid = base.decrypt(encrypteduserid, s, d)
    decryptedpassword = base.decrypt(encryptedpassword, s, d)

    assert (decrypteduserid == userID) & (decryptedpassword == password)



def test_create_project():
    app.config['TESTING'] = True
    client = app.test_client()

    test_project_data = {
        "projectName": "Test Project",
        "projectID": "testProject123",
        "user": "testUser"
    }

    with client:
        response = client.post('/create_project_endpoint', json=test_project_data)
        data = json.loads(response.data)
        
        # Check if the project creation was successful
        assert data["data"] == "success"

        # Now, try to create the same project again to check if it fails as expected
        response = client.post('/create_project_endpoint', json=test_project_data)
        data = json.loads(response.data)

        # Check if the project creation failed as expected
        assert data["data"] == "failure"