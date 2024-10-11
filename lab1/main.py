n = 26


def take_input():
    k = input("Enter a shift value (default is 3): ")
    if not k:
        k = 3
    else:
        k = int(k)

    while True:

        message = input("send a message: ")

        if not all(char in ascii or char == " " for char in message):
            print("Write a valid word (letters and spaces only)")
        else:
            return message, k

def cezar_encrypt(message_encode, ascii):
    code = ""
    for letter in message_encode:
        if letter == " ":
            code += ""
        else:
            index = ascii.index(letter)
            new_index = (index + k) % n
            code += ascii[new_index]

    return code


def cezar_decrypt(message_decode, ascii):
    decode=""

    for letter in message_decode:
        if letter == "":
            decode += ""
        else:
            index = ascii.index(letter)
            new_index = (index - k) % n
            decode += ascii[new_index]

    return decode


def change_ascii(k2, ascii):
    new_ascii = ""
    new_k2 = ""

    for letter in k2:
        if letter not in new_k2:
            new_k2 += letter
            new_ascii += letter

    for letter in ascii:
        if letter not in new_k2:
            new_ascii += letter

    print(new_ascii)

    return new_ascii



while True:
    select = int(input("\nselect an operation\n 1.Decrypt\n 2.Encrypt\n 3.Ceasar 2 keys \n 4. exit \n\n > "))
    ascii = "abcdefghijklmnopqrstuvwxyz"
    if select == 1:
        message, k = take_input()
        print("decoded message is: " + cezar_decrypt(message_decode=message, ascii=ascii))
    elif select == 2:
        message, k = take_input()
        print("encoded message is: " + cezar_encrypt(message_encode=message, ascii=ascii))
    elif select == 3:
        k2 = input("Enter a second key (default is cryptography): ")
        if not k2:
            k2 = "cryptography"

        new_ascii = change_ascii(k2=k2, ascii=ascii)
        message, k = take_input()
        print("decoded message is: " + cezar_encrypt(message_encode=message, ascii=new_ascii))


    elif select == 4:
        print("have a great day")
        break
