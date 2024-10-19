class FrequencyAnalysis:

    def __init__(self):
        self.standardFrequencies = {}
        self.outputFrequencies = {}
        self.outputCount = {}

        self.standardDigraphsCount = []
        self.outputDigraphsFrequencies = {}
        self.outputDigraphsCount = {}

        self.standardTrigraphsCount = []
        self.outputTrigraphsFrequencies = {}
        self.outputTrigraphsCount = {}

        self.standardDoublesCount = []
        self.outputDoublesFrequencies = {}
        self.outputDoublesCount = {}

        self.body = ""
        self.bodyCount = 0

    def set_data(self, freq=None, digraphs=None, doubles=None, trigraphs=None, body=None):
        if freq is not None:
            self.standardFrequencies = freq
        if digraphs is not None:
            self.standardDigraphsCount = digraphs
        if doubles is not None:
            self.standardDoublesCount = doubles
        if trigraphs is not None:
            self.standardTrigraphsCount = trigraphs
        if body is not None:
            self.body = body
            self.bodyCount = len(self.body)

    def __count_letter(self):
        self.outputCount = {}
        for letter in self.body.lower():
            if letter.isalpha():  # Check if the character is a letter
                if letter in self.outputCount:
                    self.outputCount[letter] += 1
                else:
                    self.outputCount[letter] = 1

    def __count_digraphs(self):
        self.outputDigraphsCount = {}
        for i in range(len(self.body) - 1):
            pair = self.body[i:i + 2].lower()  # Extract two characters
            if pair.isalpha():
                if pair in self.outputDigraphsCount:
                    self.outputDigraphsCount[pair] += 1
                else:
                    self.outputDigraphsCount[pair] = 1

    def __count_doubles(self):
        self.outputDoublesCount = {}
        for i in range(len(self.body) - 1):
            if self.body[i].isalpha() and self.body[i] == self.body[i + 1]:
                double = self.body[i:i + 2].lower()
                if double in self.outputDoublesCount:
                    self.outputDoublesCount[double] += 1
                else:
                    self.outputDoublesCount[double] = 1

    def __count_trigraphs(self):
        self.outputTrigraphsCount = {}
        for i in range(len(self.body) - 1):
            pair = self.body[i:i + 3].lower()  # Extract three characters
            if pair.isalpha():
                if pair in self.outputTrigraphsCount:
                    self.outputTrigraphsCount[pair] += 1
                else:
                    self.outputTrigraphsCount[pair] = 1

    @staticmethod
    def sort_dict(dictionary):
        return sorted(dictionary.items(), key=lambda x: x[1], reverse=True)

    def __set_frequency(self, count, standard,  output):
        sorted_digraphs = self.sort_dict(count)
        selected_digraphs = sorted_digraphs[:len(standard)]

        for value, key in zip(selected_digraphs, standard):
            output[key] = value[0]
        return output



    def get_frequencies(self):
        self.__count_letter()
        self.outputCount = dict(self.sort_dict(self.outputCount))
        self.outputFrequencies = {letter: round(count / self.bodyCount, 2) for letter, count in
                                  self.outputCount.items()}

        return [self.outputFrequencies, self.outputCount]

    def get_digraphs_frequency(self):
        self.__count_digraphs()
        self.__set_frequency(self.outputDigraphsCount, self.standardDigraphsCount.keys(), self.outputDigraphsFrequencies)

        return self.outputDigraphsFrequencies

    def get_doubles_frequency(self):
        self.__count_doubles()
        self.__set_frequency(self.outputDoublesCount, self.standardDoublesCount.keys(), self.outputDoublesFrequencies)

        return self.outputDoublesFrequencies

    def get_trigraphs_frequency(self):
        self.__count_trigraphs()
        self.__set_frequency(self.outputTrigraphsCount, self.standardTrigraphsCount.keys(), self.outputTrigraphsFrequencies)

        return self.outputTrigraphsFrequencies

