
// This middleware checks if the user is authenticated.
const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated using your authentication logic.
    if (req.session && req.session.user) {
      // User is authenticated; proceed to the next middleware or route handler.
      next();
    } else {
      // User is not authenticated; redirect or send an unauthorized response.
      res.status(401).send('Unauthorized');
    }
  };
  
  module.exports = isAuthenticated;