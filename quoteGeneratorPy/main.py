import csv
import json

filename = "./quotes.txt"

with open(filename, "r") as file:
    csvReader = csv.reader(file, delimiter=",")
    quotes = [[line[0], line[1]] for line in csvReader]
