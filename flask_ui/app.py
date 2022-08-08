"""
Basic flask application.
"""

import os

from flask import Flask, request, redirect, render_template, make_response

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
APP = Flask(__name__)

@APP.route("/", methods=["GET", "POST"])
def home_page():
    """Home page of the flask app."""
    return render_template("index.html")

if __name__ == '__main__':
    APP.run()
