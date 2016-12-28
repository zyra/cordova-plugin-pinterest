var exec = require('cordova/exec');

module.exports = {

    SCOPES: {
        READ_PUBLIC: 'read_public',
        WRITE_PUBLIC: 'write_public',
        READ_SECRET: 'read_secret',
        WRITE_SECRET: 'write_secret',
        READ_RELATIONSHIPS: 'read_relationships',
        WRITE_RELATIONSHIPS: 'write_relationships'
    },

    login: function(scopes, onSuccess, onError) {
        exec(onSuccess, onError, 'Pinterest', 'login', scopes);
    }

};
