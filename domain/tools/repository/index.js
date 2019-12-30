class Users {
    constructor(db) {
      this.db = db;
    }
  
    save(user, callback) {
      
  
      this.db.saveUser(user, function(err) {
        if (err) {
          callback(err);
        } else {
          this.mailer.sendWelcomeEmail(email);
          callback();
        }
      });
    }
  }
  
  module.exports = Users;