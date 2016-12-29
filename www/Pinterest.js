var exec = require('cordova/exec');

var Pinterest = {

    SCOPES: {
        READ_PUBLIC: 'read_public',
        WRITE_PUBLIC: 'write_public',
        READ_SECRET: 'read_secret',
        WRITE_SECRET: 'write_secret',
        READ_RELATIONSHIPS: 'read_relationships',
        WRITE_RELATIONSHIPS: 'write_relationships'
    },

    DEFAULT_FIELDS: {
        USER: 'id,username,first_name,last_name,bio,created_at,counts,image',
        BOARD: 'id,name,url,description,creator,created_at,counts,image',
        PIN: 'id,link,url,creator,board,created_at,note,color,counts,media,attribution,image,metadata',
        INTEREST: 'id,name'
    },

    login: function(scopes, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'login', scopes);
    },

    /** User **/

    getMe: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        exec(onSuccess, onError, 'Pinterest', 'getMe', [fields]);
    },

    getMyPins: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        exec(onSuccess, onError, 'Pinterest', 'getMyPins', [fields]);
    },

    getMyBoards: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        exec(onSuccess, onError, 'Pinterest', 'getMyBoards', [fields]);
    },

    getMyLikes: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        exec(onSuccess, onError, 'Pinterest', 'getMyLikes', [fields]);
    },

    getMyFollowers: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowers', [fields]);
    },

    getMyFollowedBoards: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowedBoards', [fields]);
    },

    getMyFollowedInterests: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.INTEREST;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowedInterests', [fields]);
    },

    getUser: function(userId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        exec(onSuccess, onError, 'Pinterest', 'getUser', [fields, userId]);
    },

    /** Board **/

    getBoard: function(boardId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        exec(onSuccess, onError, 'Pinterest', 'getBoard', [fields, boardId]);
    },

    getBoardPins: function(boardId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        exec(onSuccess, onError, 'Pinterest', 'getBoardPins', [fields, boardId]);
    },

    deleteBoard: function(boardId, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'deleteBoard', [boardId]);
    },

    createBoard: function(name, desc, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'createBoard', [name, desc]);
    },

    /** Pin **/

    getPin: function(pinId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        exec(onSuccess, onError, 'Pinterest', 'getPin', [fields, pinId]);
    },

    deletePin: function(pinId, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'deletePin', [pinId]);
    },

    createPin: function(note, boardId, imageUrl, link, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'createPin', [note, boardId, imageUrl, link]);
    }

};

module.exports = Pinterest;
