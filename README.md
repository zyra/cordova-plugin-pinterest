[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/cordova-plugin-pinterest)

[![NPM](https://nodei.co/npm/cordova-plugin-pinterest.png?stars&downloads)](https://nodei.co/npm/cordova-plugin-pinterest/)

# cordova-plugin-pinterest
Cordova plugin for Pinterest

## Platforms
This plugin supports Android and iOS

## Installation
```shell
cordova plugin add cordova-plugin-pinterest

// or 

cordova plugin add https://github.com/zyramedia/cordova-plugin-pinterest

```

## Usage

You can access the plugins functions via the global variable `cordova.plugins.Pinterest`.

## Example

```javascript

function onSuccess(response) {
    console.log('Success, the response is: ', reponse);
}

function onError(errorMessage) {
    console.error('Error, the error message is: ', errorMessage);
}

var scopes = [
    cordova.plugins.Pinterest.SCOPES.READ_PUBLIC,
    cordova.plugins.Pinterest.SCOPES.WRITE_PUBLIC,
    cordova.plugins.Pinterest.SCOPES.READ_RELATIONSHIPS,
    cordova.plugins.Pinterest.SCOPES.WRITE_RELATIONSHIPS
];

// lets login first
cordova.plugins.Pinterest.login(scopes, onSuccess, onError);

// after logging in, we can perform any other function
// for the sake of a clean example, this code is here, but you should wait for the login function to succeed first
cordova.plugins.Pinterest.getMyPins(onSuccess, onError);

```

## Methods

#### login
```javascript
login(scopes, onSuccess, onError)
```
  - **scopes**: List of permissions to request. You can use `cordova.plugins.Pinterest.SCOPES` constants for convenience. Available permissions are: `read_public`, `write_public`, `read_relationships`, `write_relationships`.

Logs the user in. The response object will contain the user's profile data, as well as the access token (if you need to use it elsewhere, example: send it to your server and perform actions on behalf of the user).


#### getMe
```javascript
getMe(onSuccess, onError, fields)
```
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.

Gets the authenticated user's profile.

#### getMyPins
```javascript
getMyPins(onSuccess, onError, fields, limit)
```
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.
- **limit**: (optional) Limit the number of items returned. Capped to 100. Defaults to 100.

Gets the authenticated user's Pins.

#### getMyBoards
```javascript
getMyBoards(onSuccess, onError, fields, limit)
```
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.
- **limit**: (optional) Limit the number of items returned. Capped to 100. Defaults to 100.

Get the authenticated user's boards.

#### getMyLikes
```javascript
getMyLikes(onSuccess, onError, fields, limit)
```
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.
- **limit**: (optional) Limit the number of items returned. Capped to 100. Defaults to 100.

Get the authenticated user's likes.

#### getMyFollowers
```javascript
getMyFollowers(onSucccess, onError, fields, limit)
```
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.
- **limit**: (optional) Limit the number of items returned. Capped to 100. Defaults to 100.

Get the authenticated user's followers.

#### getMyFollowedBoards
```javascript
getMyFollowedBoards(onSuccess, onError, fields, limit)
```
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.
- **limit**: (optional) Limit the number of items returned. Capped to 100. Defaults to 100.

Get the authenticated user's followed boards.

#### getMyFollowedInterests
```javascript
getMyFollowedInterests(onSuccess, onError, fields, limit)
```
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.
- **limit**: (optional) Limit the number of items returned. Capped to 100. Defaults to 100.

Get the authenticated user's followed interests.

#### getUser
```javascript
getUser(username, onSuccess, onError, fields)
```
- **username**: Username of the user
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.

Get a user's profile.

#### getBoard
```javascript
getBoard(boardId, onSuccess, onError, fields)
```
- **boardId**: The ID of the board
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.

Get a board's data.

#### getBoardPins
```javascript
getBoardPins(boardId, onSuccess, onError, fields, limit)
```
- **boardId**: The ID of the board
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.
- **limit**: (optional) Limit the number of items returned. Capped to 100. Defaults to 100.

Get Pins of a specific board.

#### deleteBoard
```javascript
deleteBoard(boardId, onSuccess, onError)
```
- **boardId**: The ID of the board

Delete a board.

#### createBoard
```javascript
createBoard(name, desc, onSuccess, onError)
```
- **name**: Name of the board
- **desc**: (optional) Description of the board

Create a new board for the authenticated user.

#### getPin
```javascript
getPin(pinId, onSuccess, onError, fields)
```
- **pinId**: The ID of the Pin
- **fields**: (optional) Fields to retrieve, separated by commas. Defaults to all available fields.

Get a Pin by ID.

#### deletePin
```javascript
deletePin(pinId, onSuccess, onError)
```
- **pinId**: The ID of the Pin

Delete a Pin.

#### createPin
```javascript
createPin(note, boardId, imageUrl, link, onSuccess, onError)
```
- **note**: Note/Description of the Pin
- **boardId**: Board ID to put the Pin under
- **imageUrl**: URL of the image to share
- **link**: (optional) Link to share

Create a Pin for the authenticated user.



---



## Quirks

- This plugin does not provide any pagination features. You are limited only to the latest 100 entries and you cannot fetch the next pages. This can be fixed but it will make this API more complicated. It can be added if demanded by many users.