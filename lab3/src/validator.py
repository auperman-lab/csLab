from lab3.src.const import ALPHABET, KEY_LENGTH


def validate_message(message: str) -> bool:
    for char in message:
        if char not in (ALPHABET or " "):
            return False
    return True

def validate_key(key: str) -> bool:
    if len(key) < KEY_LENGTH:
        return False
    return validate_message(key)




