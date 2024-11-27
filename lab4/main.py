from lab4.des_encryption import des_encrypt
from lab4.utils import format_to_bits, bits_to_string

m = "#Eg«Íï"
k = "4Wy¼ßñ"

try:
    cryptogram = des_encrypt(format_to_bits(m), format_to_bits(k))
except ValueError as e:
    print(f"Error: {e}")

print(f"result as bits = <{cryptogram}>")
print(f"result as string = <{bits_to_string(cryptogram)}>")