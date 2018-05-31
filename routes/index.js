const userRoutes = require('./user_routes');
const newsRoutes = require('./news_routes');
const commentsRoutes = require('./comments_routes');
const initiativeRoutes = require('./initiative_routes');

module.exports = function(app, connection) {
    userRoutes(app, connection);
    newsRoutes(app, connection);
    commentsRoutes(app, connection);
    initiativeRoutes(app, connection);
};