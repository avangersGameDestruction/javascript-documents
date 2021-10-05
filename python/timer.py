import time
import pyttsx3

def countdown(t):
    while t:
        mins, seconds = divmod(t, 60)
        timer = "{:02d}:{:02d}".format(mins,seconds)
        print(timer, end="\r")
        time.sleep(1)
        t -= 1
        
    pyttsx3.speak("Beep Beep Beep Beep Beep Beep")
    pyttsx3.speak("Timer has completed")
    print("Timer has done")
timer = int(input("Enter the time in seconds:- "))

print(countdown(timer))