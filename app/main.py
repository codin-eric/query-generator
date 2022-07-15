from flask import Flask, render_template
from pathlib import Path
from flask import request

import json
import pandas as pd


app = Flask(__name__)

root = Path(__file__).resolve().parent


df = pd.read_csv('example_data.csv')


@app.route('/get_schema', methods=['GET'])
def get_schema():
    return json.dumps([{'id':x, 'label':x} for x in df.columns])


@app.route('/table', methods=['POST'])
def html_table():
    query = json.loads([x for x in request.values][0])
    columns = query['select'].split(',')[:-1]
    return render_template('table.html',  tables=[df[columns].to_html(classes='data', index=False)], titles=df.columns.values)


@app.route('/download', methods=['POST'])
def donwload_file():
    file_path = root / 'data.csv'
    query = json.loads([x for x in request.values][0])
    columns = query['select'].split(',')[:-1]
    df[columns].to_csv(file_path, index=False)
    return str(file_path)

@app.route('/')
def index():
    return render_template('index.html', columns=df.columns)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
