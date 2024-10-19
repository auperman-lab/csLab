
from flask import Flask, request, render_template, jsonify

from lab2.FrequencyAnalysis import FrequencyAnalysis
from lab2.serialize import Serializable
from lab2.eng import eng_digraphs_frequency_map, eng_trigraphs_frequency_map, eng_doubles_frequency_map, \
    eng_frequency_map

# instance of flask application
app = Flask(__name__)
analyzer = FrequencyAnalysis()


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/set", methods=["POST"])
def set_freq():
    data = request.get_json()
    text = data["text"]

    if text:
        try:
            analyzer.set_data(
                body=text,
                freq=eng_frequency_map,
                doubles=eng_doubles_frequency_map,
                trigraphs=eng_trigraphs_frequency_map,
                digraphs=eng_digraphs_frequency_map
            )
            return jsonify({"succes": 1}), 201
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
    else:
        return jsonify({"error": "No text provided."}), 400


@app.route("/get-frequencies", methods=["GET"])
def get_freq():
    data = analyzer.get_frequencies()
    return_data = Serializable.serialize_letter_frequency(data)

    if data[0] and data[1]:
        return return_data, 200
    else:
        print("sent text:", data[0], data[1])  # Print the received text
        return jsonify({"error":  "there is no text to be analyzed"}), 500

@app.route("/get-digraphs", methods=["GET"])
def get_digraphs():
    data = analyzer.get_digraphs_frequency()
    return_data = Serializable.serialize_graphs_frequency(data, "digraphs")

    if data :
        return return_data, 200
    else:
        return jsonify({"error":  "there arent any digraphs to be found "}), 500

@app.route("/get-trigraphs", methods=["GET"])
def get_trigraphs():
    data = analyzer.get_trigraphs_frequency()
    return_data = Serializable.serialize_graphs_frequency(data, "trigraphs")

    if return_data :
        return return_data, 200
    else:
        return jsonify({"error":  "there is no trigraphs to be found"}), 500

@app.route("/get-doubles", methods=["GET"])
def get_doubles():
    data = analyzer.get_doubles_frequency()
    return_data = Serializable.serialize_graphs_frequency(data, "doubles")

    if return_data :
        return return_data, 200
    else:
        return jsonify({"error":  "there is no doubles to be analyzed"}), 500



if __name__ == '__main__':
   app.run()
