class Serializable:
    def __init__(self):
        pass

    @staticmethod
    def serialize_letter_frequency(data):
        # Prepare a list to store the serialized data
        letter_frequency = data[0]
        letter_count = data[1]
        serialized_data = []

        # Iterate over the letters and build a dictionary for each
        for letter in letter_frequency:
            serialized_data.append({
                "letter": letter,
                "frequency": letter_frequency[letter],
                "count": letter_count.get(letter, 0)
            })

        # Return the serialized data as a dictionary
        return {
            "letters": serialized_data
        }

    @staticmethod
    def serialize_graphs_frequency(data, name):
        graphs_frequency = data
        serialized_data = []

        for graph in graphs_frequency:
            serialized_data.append({
                graph: graphs_frequency[graph],
            })
        return {
            name : serialized_data
        }