API Documentation

<div><h1 style="color:darkgoldenrod">POST <span style="color:white">/card</span></h1></div>
<p>Route to create a new question card</p>
<p>Example of the request body:</p>
<pre>
{
    "card": {
        "_id": "testId 1",
        "title": "Some cool title",
        "description": "Super cool description",
        "questions": {
            "all": ["question 1", "question 2", "question 3", "question 4"],
            "correct": "question 2"
        },
        "created_by": "test@gmail.com",
        "theme": "Very cool theme"
    }
}
</pre>
<p>Responses:</p>
<pre>
Status code 200:
{
    status: "Success!",
    message: "Card with id of 'testId 1' was created!
}

Status code 409:
{
status: "Error",
message: "Card with this id already exists!"
}

Status code 422:
{
    status: "Error",
    message: ["ID is required.", "Title is required.", "Description is required.", 
    "Questions array can only be 4 items long.", "Specifying correct answer is required.",
    "ID of creator is required.", "Theme of the card is required."] <-- you can get one or many
}
</pre>

<div><h1 style="color:darkgoldenrod">POST <span style="color:white">/table</span></h1></div>
<p>Route to create a new table</p>
<p>Example of the request body:</p>
<pre>
{
    "table": {
        "_id": "Test table 1",
        "created_by": "example@gmail.com",
        "members": ["example2@gmail.com", "example3@gmail.com", "example4@gmail.com"],
        "name": "Pixel championship"
    }
}
</pre>
<p>Responses:</p>
<pre>
Status code 200:
{
    status: 'Success!',
    message: {
        tableID: "Test table 1"
    }
}

Status code 409:
{
status: "Error",
message: "Table with this id already exists!"
}

Status code 422:
{
status: "Error",
message: ["Table id is required.", "You need to specify who created this table.", 
        "Table name is required."] <-- you can get one or many
}
</pre>

<div><h1 style="color:darkgoldenrod">PUT <span style="color:white">/tablemember</span></h1></div>
<p>Used to add a user to the table</p>
<p>Example of the request body:</p>
<pre>
{
   "table": "Test table 1",
   "user": "Updated user" 
}
</pre>
<p>Responses:</p>
<pre>
Status code 200:
{
    status: "Success!",
    message: "User was successfully added!"
}

Status code 409:
{
    status: "Error",
    message: "This table already has such user."
}
</pre>
<div><h1 style="color:darkgoldenrod">GET <span style="color:white">/cards?theme=your theme</span></h1></div>
<p>Used to get all cards with a specific theme</p>
<p>Responses:</p>
<pre>
Status code 200:
{
    "status": "Success!",
    "message": [
        {
            "questions": {
                "all": [
                    "question 1",
                    "question 2",
                    "question 3",
                    "question 4"
                ],
                "correct": "question 2"
            },
            "_id": "testId 1",
            "title": "Some cool title",
            "description": "Super cool description",
            "created_by": "Oleg@gmail.com",
            "theme": "very cool theme",
            "__v": 0
        },
        {
            "questions": {
                "all": [
                    "question 1",
                    "question 2",
                    "question 3",
                    "question 4"
                ],
                "correct": "question 3"
            },
            "_id": "testId 2",
            "title": "Some cool title",
            "description": "Super cool description",
            "created_by": "Oleg@gmail.com",
            "theme": "very cool theme",
            "__v": 0
        }
    ]
}
</pre>
<div><h1 style="color:darkgoldenrod">GET <span style="color:white">/tables</span></h1></div>
<p>Route is used to get all tables available</p>
<p>Responses:</p>
<pre>
{
    "status": "Success!",
    "message": [
        {
            "_id": "Test table 1",
            "created_by": "example@gmail.com",
            "members": [
                "example2@gmail.com",
                "example3@gmail.com",
                "example4@gmail.com",
                "example5@gmail.com",
            ],
            "name": "Pixel championship",
            "__v": 3
        }
    ]
}
</pre>

<div><h1 style="color:darkgoldenrod">GET <span style="color:white">/cardanswer</span></h1></div>
<p>Route is used to get a correct answer for the card</p>
<p>Responses:</p>
<pre>
Status code 200:
{
    {
    "status": "Success!",
    "message": {
        "_id": "Some id",
        "title": "Some cool title",
        "correctAnswer": "question 2"
    }
}
Status code 404:
{
    "status": "Error",
    "message": "Card with this is not found."
}
</pre>
<div><h1 style="color:darkgoldenrod">PUT <span style="color:white">/table</span></h1></div>
<p>Route is used to get a correct answer for the card</p>
<p>Responses:</p>
<pre>
Status code 200:
{
    "status": "Success!",
    "message": "Table was successfully updated!!"
}
Status code 409:
{
    "status": "Error",
    "message": "There is no table with this id."
}
</pre>

<div><h1 style="color:darkgoldenrod">DELETE <span style="color:white">/table</span></h1></div>
<p>Route is used to delete a table</p>
<p>In request, you need to specify table id in query parameter id</p>
<p>Responses:</p>
<pre>
Status code 200:
{
    "status": "Success!",
        "message": {
    "status": "Success!",
    "message": {
        "_id": "Test table 1",
        "created_by": "User123",
        "members": [
            "Oleg@oleg.com",
            "Sanya@sanya.com",
            "Boris@gmail.com"
        ],
        "name": "new name",
        "__v": 3
        }
    }
}
Status code 409:
{
    "status": "Error",
    "message": "There is no table with this id."
}
</pre>
<div><h1 style="color:darkgoldenrod">DELETE <span style="color:white">/card</span></h1></div>
<p>Route is used to delete a table</p>
<p>In request, you need to specify card id in query parameter id</p>
<p>Responses:</p>
<pre>
Status code 200:
{
    "status": "Success!",
    "message": {
        "questions": {
            "all": [
                "question 1",
                "question 2",
                "question 3",
                "question 4"
            ],
            "correct": "question 2"
        },
        "_id": "testId 5",
        "title": "Some cool title",
        "description": "Super cool description",
        "created_by": "Oleg@gmail.com",
        "theme": "very cool theme",
        "__v": 0
    }
}
Status code 409:
{
    "status": "Error",
    "message": "There is no card with this id."
}
</pre>