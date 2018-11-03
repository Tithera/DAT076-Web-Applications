#!/bin/bash
# This is (should be) an executable script (bash script)
# to test some database functionality

# (Re)create database 
#curl -v http://localhost:8080/ws4/rest/db

# Options (used by CORS preflight)
curl -v -X OPTIONS http://localhost:8080/



# Get all notes 
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/author 

# Get single note
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/author/FF



# Get primitive type (number of notes)
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/author/count



# Create new (NOTE: exception if run more times ... use delete) Using form parameters
curl -v -X POST  http://localhost:8080/ws4/rest/author --data "id=QQ&firstName=Qbert&lastName=Qson&email=qson@mail"

# Create new (NOTE: exception if run more times ... use delete) 
curl -v -X POST -H "Content-Type: application/json" http://localhost:8080/ws4/rest/author --data '{"id":"XX", "firstName": "Xbert", "lastName": "Xson", "email":"xson@mail, "address" : ""}'



# Update a note (Funkar inte)
curl -v -X PUT -H "Content-Type: application/json" http://localhost:8080/ws4/rest/author/QQ --data '{"id":"QQ", "firstName": "NEWbert", "lastName": "NEWson", "email":"NEW@mail", "address" : ""}'

# Delete (last part of URL is id)
curl -v -X DELETE http://localhost:8080/ws4/rest/author/XX 




# Get all notes for books
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/book 

# Get single note 
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/book/isbn1



# Get primitive type (number of notes)
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/book/count



# Create new (NOTE: exception if run more times ... use delete) Using form parameters
curl -v -X POST  http://localhost:8080/ws4/rest/book --data "isbn=test2&title=testbok&genre=NOVEL&price=12.9"

# Create new (NOTE: exception if run more times ... use delete) Using JSON 
curl -v -X POST -H "Content-Type: application/json" http://localhost:8080/ws4/rest/book --data '{"isbn":"jtest1", "title": "jtestbok", "genre": "NOVEL", "price":"13.5 "}'



# Update a note 
curl -v -X PUT -H "Content-Type: application/json" http://localhost:8080/ws4/rest/book/isbn2 --data '{"isbn":"isbn2", "title": "hej", "genre": "NOVEL", "price":"14.5"}'

# Delete (last part of URL is isbn)  
curl -v -X DELETE http://localhost:8080/ws4/rest/book/test2 

