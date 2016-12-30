var exec = require('cordova/exec');

var Pinterest = {

    SCOPES: {
        READ_PUBLIC: 'read_public',
        WRITE_PUBLIC: 'write_public',
        READ_RELATIONSHIPS: 'read_relationships',
        WRITE_RELATIONSHIPS: 'write_relationships'
    },

    DEFAULT_FIELDS: {
        USER: 'id,username,first_name,last_name,bio,created_at,counts,image',
        BOARD: 'id,name,url,description,creator,created_at,counts,image',
        PIN: 'id,link,url,creator,board,created_at,note,color,counts,media,attribution,image,metadata',
        INTEREST: 'id,name'
    },

    /**
     * Login with Pinterest
     * @param scopes {Array<string>} Permissions to request.
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     */
    login: function(scopes, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'login', scopes);
    },

    // Users

    /**
     * Get the user's profile information
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     */
    getMe: function(onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        exec(onSuccess, onError, 'Pinterest', 'getMe', [fields]);
    },

    /**
     * Get the user's pins
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     * @param limit {number} Maximum number of items to return. Capped at 100. Defaults to 100.
     */
    getMyPins: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyPins', [fields, limit]);
    },

    /**
     * Get the user's boards
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     * @param limit {number} Maximum number of items to return. Capped at 100. Defaults to 100.
     */
    getMyBoards: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyBoards', [fields, limit]);
    },

    /**
     * Get the user's likes
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     * @param limit {number} Maximum number of items to return. Capped at 100. Defaults to 100.
     */
    getMyLikes: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyLikes', [fields, limit]);
    },

    /**
     * Get the user's followers
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     * @param limit {number} Maximum number of items to return. Capped at 100. Defaults to 100.
     */
    getMyFollowers: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowers', [fields, limit]);
    },

    /**
     * Get followed boards
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     * @param limit {number} Maximum number of items to return. Capped at 100. Defaults to 100.
     */
    getMyFollowedBoards: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowedBoards', [fields, limit]);
    },

    /**
     * Get followed interests
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     * @param limit {number} Maximum number of items to return. Capped at 100. Defaults to 100.
     */
    getMyFollowedInterests: function(onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.INTEREST;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getMyFollowedInterests', [fields, limit]);
    },

    /**
     * Get a user's profile information by username
     * @param username {string} User Id or username
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     */
    getUser: function(username, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.USER;
        exec(onSuccess, onError, 'Pinterest', 'getUser', [fields, username]);
    },

    // Boards

    /**
     * Get board by id
     * @param boardId {string} Board ID
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     */
    getBoard: function(boardId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.BOARD;
        exec(onSuccess, onError, 'Pinterest', 'getBoard', [fields, boardId]);
    },

    /**
     * Get Pins for a specific board
     * @param boardId {string} Board ID
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     * @param limit {number} Maximum number of items to return. Capped at 100. Defaults to 100.
     */
    getBoardPins: function(boardId, onSuccess, onError, fields, limit) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        limit = limit || 100;
        exec(onSuccess, onError, 'Pinterest', 'getBoardPins', [fields, limit, boardId]);
    },

    /**
     * Deletes the specified board
     * @param boardId {string} Board ID
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     */
    deleteBoard: function(boardId, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'deleteBoard', [boardId]);
    },

    /**
     * Creates a board for the authenticated user
     * @param name {string} Name of the board
     * @param desc {string} Description of the board (optional)
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     */
    createBoard: function(name, desc, onSuccess, onError) {
        desc = desc || '';
        exec(onSuccess, onError, 'Pinterest', 'createBoard', [name, desc]);
    },

    // Pins

    /**
     * Get Pin by id
     * @param pinId {string} Pin ID
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     * @param fields {string} Fields to get, separated by commas. Defaults to all available fields.
     */
    getPin: function(pinId, onSuccess, onError, fields) {
        fields = fields || Pinterest.DEFAULT_FIELDS.PIN;
        exec(onSuccess, onError, 'Pinterest', 'getPin', [fields, pinId]);
    },

    /**
     * Deletes the specified Pin
     * @param pinId {string} Pin ID
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     */
    deletePin: function(pinId, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'deletePin', [pinId]);
    },

    /**
     * Creates a board for the authenticated user
     * @param note {string} Description of Pin
     * @param boardId {string} Board ID
     * @param imageUrl {string} Image URL
     * @param link {string} Link to share (optional)
     * @param onSuccess {Function} Callback function to execute on success
     * @param onError {Function} Callback function to execute on error
     */
    createPin: function(note, boardId, imageUrl, link, onSuccess, onError) {
        link = link || '';
        exec(onSuccess, onError, 'Pinterest', 'createPin', [note, boardId, imageUrl, link]);
    }

};

module.exports = Pinterest;
