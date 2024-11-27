def format_to_bits(data: str):
    return ''.join(format(ord(i), '08b') for i in data)

def bits_to_string(bit_string: str) -> str:
    if len(bit_string) % 8 != 0:
        raise ValueError("Bit string length must be a multiple of 8.")

    result = ""
    for i in range(0, len(bit_string), 8):
        byte = bit_string[i:i + 8]
        char = chr(int(byte, 2))
        result += char

    return result