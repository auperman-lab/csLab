from lab3.src.const import ALPHABET


def generate_key(msg, key):
    key = list(key)
    if len(msg) == len(key):
        return key
    else:
        for i in range(len(msg) - len(key)):
            key.append(key[i % len(key)])
    return "".join(key)


def encrypt_vigenere(msg, key):
    encrypted_text = []

    key = generate_key(msg, key)

    for i in range(len(msg)):
        char = msg[i]

        if char not in ALPHABET:
            encrypted_text.append(char)
            continue

        char_index = ALPHABET.index(char)
        key_index = ALPHABET.index(key[i])

        encrypted_char = ALPHABET[(char_index + key_index) % len(ALPHABET)]
        encrypted_text.append(encrypted_char)

    return "".join(encrypted_text)



def decrypt_vigenere(msg, key):
    decrypted_text = []

    key = generate_key(msg, key)

    for i in range(len(msg)):
        char = msg[i]

        if char not in ALPHABET:
            decrypted_text.append(char)
            continue

        char_index = ALPHABET.index(char)
        key_index = ALPHABET.index(key[i])

        decrypted_char = ALPHABET[(char_index - key_index) % len(ALPHABET)]
        decrypted_text.append(decrypted_char)

    return "".join(decrypted_text)