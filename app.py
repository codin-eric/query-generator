from flask import Flask, render_template
from pathlib import Path
from collections import Counter
from flask import request
from time import sleep


app = Flask(__name__)

root = Path(__file__).resolve().parent

timer = 7
img_path = root / "static" / "img"

img_lst = [("/").join(str(x).split("/")[5:]) for x in img_path.glob("**/*")]

lst = []
winner = []
img = []


def submit():
    global lst
    global img
    global winner

    pic = Counter(lst).most_common(1)[0][0]
    lst = []
    winner.append(img[pic])
    print(winner)
    return f"0"


@app.route('/counter', methods=['POST'])
def counter():
    global lst
    data = request.json
    print(data)
    lst.append(data['url'])
    return f"{data['url']}"


@app.route('/view')
def view():
    global img
    global img_lst
    global lst
    global winner

    if len(img) > 0:
        submit()

    lst = [0, 1]
    if len(img_lst) < 2:
        if len(winner) < 2:
            args = {"winner": winner[0]}
            return render_template('winner.html', **args)
        else:
            img_lst = winner
            winner = []

    img = [img_lst.pop(), img_lst.pop()]
    args = {
        "img1": img[0],
        "img2": img[1]
    }
    return render_template('index.html', **args)


@app.route('/')
def hello_world():
    return render_template('button.html')
