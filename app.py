from flask import Flask, render_template
from pathlib import Path
from flask import request

import pandas as pd


app = Flask(__name__)

root = Path(__file__).resolve().parent


df = pd.read_csv('data.csv')


@app.route('/table', methods=['POST'])
def html_table():
    columns = [x.split(',')[:-1] for x in request.values][0]
    return render_template('table.html',  tables=[df[columns].to_html(classes='data', index=False)], titles=df.columns.values)


@app.route('/')
def hello_world():
    return render_template('index.html', columns=df.columns)


if __name__ == "__main__":
    app.run(debug=True)
