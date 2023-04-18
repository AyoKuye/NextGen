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
