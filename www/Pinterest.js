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

    // Users

    /**
     * Get the user's profile information
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getMe: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        exec(onSuccess, onError, 'Pinterest', 'getMe', [fields]);
    },

    /**
     * Get the user's pins
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getMyPins: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyPins', [fields, limit]);
    },

    /**
     * Get the user's boards
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getMyBoards: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyBoards', [fields, limit]);
    },

    /**
     * Get the user's likes
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getMyLikes: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyLikes', [fields, limit]);
    },

    /**
     * Get the user's followers
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getMyFollowers: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowers', [fields, limit]);
    },

    /**
     * Get followed boards
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getMyFollowedBoards: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowedBoards', [fields, limit]);
    },

    /**
     * Get followed interests
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getMyFollowedInterests: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.INTEREST;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowedInterests', [fields, limit]);
    },

    /**
     * Get a user's profile information by username
     * @param username
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getUser: function(username, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        exec(onSuccess, onError, 'Pinterest', 'getUser', [fields, username]);
    },

    // Boards

    /**
     * Get board by id
     * @param boardId
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getBoard: function(boardId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        exec(onSuccess, onError, 'Pinterest', 'getBoard', [fields, boardId]);
    },

    /**
     * Get Pins for a specific board
     * @param boardId
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getBoardPins: function(boardId, onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getBoardPins', [fields, limit, boardId]);
    },

    /**
     * Deletes the specified board
     * @param boardId
     * @param onSuccess
     * @param onError
     */
    deleteBoard: function(boardId, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'deleteBoard', [boardId]);
    },

    /**
     * Creates a board for the authenticated user
     * @param name
     * @param desc
     * @param onSuccess
     * @param onError
     */
    createBoard: function(name, desc, onSuccess, onError) {
        desc = desc || '';
        exec(onSuccess, onError, 'Pinterest', 'createBoard', [name, desc]);
    },

    // Pins

    /**
     * Get Pin by id
     * @param pinId
     * @param onSuccess
     * @param onError
     * @param fields
     */
    getPin: function(pinId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        exec(onSuccess, onError, 'Pinterest', 'getPin', [fields, pinId]);
    },

    /**
     * Deletes the specified Pin
     * @param pinId
     * @param onSuccess
     * @param onError
     */
    deletePin: function(pinId, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'deletePin', [pinId]);
    },

    /**
     * Creates a board for the authenticated user
     * @param note
     * @param boardId
     * @param imageUrl
     * @param link
     * @param onSuccess
     * @param onError
     */
    createPin: function(note, boardId, imageUrl, link, onSuccess, onError) {
        link = link || '';
        exec(onSuccess, onError, 'Pinterest', 'createPin', [note, boardId, imageUrl, link]);
    }

};

module.exports = Pinterest;
