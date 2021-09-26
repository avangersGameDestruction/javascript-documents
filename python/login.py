from sys import exit
from os import name, system

users = {}
status = ''

def clear():
    if name == 'nt':       #If Windows clear screen
        _ = system('cls')
    else:                  #If Linux etc. clear screen
        _ = system('clear')

def newUser():
    newUsername = input('Create new username: ')

    if newUsername in users:
        print('\nUsername already exists!\n')
        input('Press [Enter] to continue')
    else:
        newPassword = input('Create new password: ')
        users[newUsername] = newPassword #Append to dictionary(users)
        print('\nAccount created successfully!\n')
        input('Press [Enter] to continue')

def oldUser():
    login = input('Enter username: ')
    password = input('Enter password: ')
    if login in users and users[login] == password: #If user and pass match, continue
        print('\nLogin successful!\n')
        input('Press [Enter] to continue')
    else:
        print('\nLogin failed!\n')
        input('Press [Enter] to continue')

while True:
    clear()
    status = input('Are you a registered user? [y/n] Press [q] to quit\n> ')
    status = status.lower()
    if status == 'y':
        oldUser()
    elif status == 'n':
        newUser()
    elif status == 'q':
        exit()
    else:
        continue
