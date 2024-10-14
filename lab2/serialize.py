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
    def serialize_digraphs_frequency(data):
        digraphs_frequency = data
        serialized_data = []

        for digraph in digraphs_frequency:
            serialized_data.append({
                "standard": digraph,
                "output": digraphs_frequency[digraph],
            })
        return {
            "digraphs": serialized_data
        }