# Practice: Writing Fetch Reqeusts

In this practice, you will be writing fetch requests that will interact with the
server from the HTML Templating practice. 

## Set up

Clone the project from the [starter]. Run `npm  install`. Run the tests with
`npm test`.

## Background and Context

You will be making fetch requests already integrated with your HTML page. After
you start the server with `npm start` you can begin writing functions. Clicking
the labeled buttons on the homepage at `localhost:5001` should redirect you to
the matching endpoint.

Make all changes in `/assets/js/your-code.js`. No need to restart the server on
this project, however, you will need to refresh the browser to get the updated
copy of your JavaScript file from the server. After you save in VS Code, always
refresh the browser to see any changes. 

As review, the two parameters you need to use fetch correctly are outlined
below: 

```js
const url = "/endpoint";
const headers = {"Content-Type": "Request body's Content-Type"};
// Use the URLSearchParams API to format your body as shown below
const body = new URLSearchParams({
    key: "value"
});

const options = {
    method: "GET|POST|PUT|DELETE", 
    headers: headers,
    body: body
};

fetch(url, options);
```

The body of a request can be formatted correctly by passing in an object to the
[URLSesarchParams] API's constructor function. 

Write your code in `assets/js/your-code.js`. Do not change the code in any other
files. 


## Phase 1: getAllDogs()

Return a fetch call to `GET /dogs`. 

Run the test specs with `npm test`.

## Phase 2: getDogNumberTwo()

Return a fetch call to the server's endpoint for the dog with an id of 2.

## Phase 3: postNewDog() 

Return a fetch call to post a new dog with a `name` and `age`. Use the
[URLSearchParams] API to make the body of your request as seen below. What will
the `Content-Type` header be?

```js
const body = new URLSearchParams({
    name: "Rosie",
    age: 1
});
```

You will know you sent the correct fetch request when the browser is redirected
to the new dog's page. 

## Phase 4: postNewDogV2(name, age) 

You can hard code a new dog now, but you want your code to be more dynamic. This
time you'll be posting a dog to the server based on the user's input. Don't
worry-- your colleagues wrote the code to get the `name` and `age` from the HTML
and pass them in as arguments to this function. You should be able to
restructure your last request from Phase 3 to be more dynamic now. 

Implemented correctly, when you fill out the input boxes, whatever dog name and
age you input will be added to the server. 

## Phase 5: deleteDog(id)

Implement a fetch request to delete a dog on the server based on an id. For this
*traditional* server, what will the RESTful endpoint be for deleting a dog?

To ensure that only *you* can delete dogs, the backend engineers have already
implemented an `AUTH` header on the backend route. Set the request header for
`AUTH` to have the value `ckyut5wau0000jyv5bsrud90y`. This long string is a
token used to valdiate any requests made to this endpoint.

With the correct fetch request, you should be redirected to `GET /dogs` without
the deleted dog.

[URLSearchParams]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams