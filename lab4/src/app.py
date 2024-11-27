from flask import Flask, render_template, Response, request, jsonify
from flask_cors import CORS


from lab4.src.des_encryption import des_encrypt, pc1_transmutation
from lab4.src.utils import format_to_bits, bits_to_string

app = Flask(__name__)
CORS(app, resources={r"/encrypt": {"origins": ["http://localhost:5001", "http://127.0.0.1:5001"]}})


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/encrypt", methods=["POST"])
def encrypt() -> Response:
    request_data = request.get_json()
    message: str = request_data["message"]
    key: str = request_data["key"]
    print("message as string = "+message)
    print("key as string"+key)

    if not message:
        response:Response = jsonify({"message": "Message is empty"})
        response.status_code=400
        return response
    if not key:
        response: Response = jsonify({"message": "Key is empty"})
        response.status_code = 400
        return response

    msg = format_to_bits(message)
    k = format_to_bits(key)
    print("message as bits = " + msg)
    print("key as bits" + k)
    encrypted_message: str = des_encrypt(m=msg,k=k)
    response: Response = jsonify({"cryptogram_bits": encrypted_message,"cryptogram_str": bits_to_string(encrypted_message)})
    response.status_code=200
    return response

@app.route("/kplus", methods=["POST"])
def decrypt() -> Response:
    request_data = request.get_json()
    key: str = request_data["key"]
    print("key as string"+key)

    if not key:
        response: Response = jsonify({"message": "Key is empty"})
        response.status_code = 400
        return response

    k = format_to_bits(key)
    print("key as bits" + k)

    k_plus: str = pc1_transmutation(data=k)
    response: Response = jsonify({"kPlusAsBits": k_plus, "kPlusAsString": bits_to_string(k_plus)})
    response.status_code=200
    return response










