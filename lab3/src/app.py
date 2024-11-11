from flask import Flask, render_template, Response, request, jsonify
from lab3.src.const import ALPHABET
from lab3.src.validator import validate_message, validate_key
from lab3.src.vigenere_algorithm import encrypt_vigenere, decrypt_vigenere

app = Flask(__name__)



@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/encrypt", methods=["POST"])
def encrypt() -> Response:
    request_data = request.get_json()
    message: str = request_data["message"]
    key: str = request_data["key"]

    if not message:
        response:Response = jsonify({"message": "Message is empty"})
        response.status_code=400
        return response
    if not key:
        response: Response = jsonify({"message": "Key is empty"})
        response.status_code = 400
        return response

    if not validate_message(message.upper()):
        response: Response = jsonify({"message": f"Message is invalid, you can use only {ALPHABET} characters"})
        response.status_code=400
        return response
    if not validate_key(key.upper()):
        response: Response = jsonify({"message": f"Key is invalid, you can use only {ALPHABET} characters, or your key is less than 7 characters"})
        response.status_code = 400
        return response

    encrypted_message: str = encrypt_vigenere(msg=message,key=key)
    response: Response = jsonify({"cryptogram": encrypted_message})
    response.status_code=200
    return response

@app.route("/decrypt", methods=["POST"])
def decrypt() -> Response:
    request_data = request.get_json()
    message: str = request_data["message"]
    key: str = request_data["key"]

    if not message:
        response:Response = jsonify({"message": "Message is empty"})
        response.status_code=400
        return response
    if not key:
        response: Response = jsonify({"message": "Key is empty"})
        response.status_code = 400
        return response

    if not validate_message(message.upper()):
        response: Response = jsonify({"message": f"Message is invalid, you can use only {ALPHABET} characters"})
        response.status_code=400
        return response
    if not validate_key(key.upper()):
        response: Response = jsonify({"message": f"Key is invalid, you can use only {ALPHABET} characters, or your key is less than 7 characters"})
        response.status_code = 400
        return response

    decrypted_message: str = decrypt_vigenere(msg=message,key=key)
    response: Response = jsonify({"message": decrypted_message})
    response.status_code=200
    return response










