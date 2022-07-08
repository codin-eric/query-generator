FROM python:3.9

RUN apt-get update

RUN pip install poetry

WORKDIR /query-builder
COPY poetry.lock pyproject.toml /query-builder/

ENV PYTHONPATH "${PYTHONPATH}:/query-builder/"

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes
RUN pip install -r requirements.txt

COPY . /query-builder/

EXPOSE 5000
CMD ["python","app/main.py"]