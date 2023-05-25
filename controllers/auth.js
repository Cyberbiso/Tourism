const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {promisify} = require("util");
const { error } = require("console");

const db= mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
});

exports.login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        return res.status(400).render('login', {
          message: 'Please provide an email, password, and role'
        });
      }
      db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        console.log(results);
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password)) ||
          results[0].role !== role
        ) {
          res.status(401).render("login", {
            message: "Email, password, or role is incorrect",
          });
        } else {
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
          });
  
          console.log("The token is: " + token);
  
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
          }
          res.cookie('jwt', token, cookieOptions);
          console.log(req.cookies);
        // Redirect based on role
        if (role === "Travel agent") {
          res.status(200).redirect("/a");
        } else if (role === "Traveler") {
          res.status(200).redirect("/h");
        } else {
          // If the role is neither "Travel agent" nor "Traveler"
          res.status(401).render("login", {
            message: "Role is incorrect",
          });
        }
      }
    })
  } catch (error) {
      console.log(error);
    }
  }
  
exports.register = async (req, res) => {
    console.log(req.body);

    const { name, email, password, confirm_password, number, role } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if (password !== confirm_password) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {
            name: name,
            email: email,
            password: hashedPassword,
            number: number,
            role: role
        }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                });
            }
        });
    });
};

exports.isLoggedIn = async (req, res, next) => {
  let decoded = null;
  if (req.cookies && req.cookies.jwt) { // check if req.cookies is defined and has the jwt property
    console.log("JWT token present in cookie");
    try {
      decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
      console.log("JWT token verified");
      db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
        if (error) {
          console.log("Error while querying the database for user information:", error);
          return next(error);
        }
        if (!result || result.length === 0) { // check if a user is found for the decoded JWT token
          console.log("No user found for the decoded JWT token:", decoded);
          return next(new Error('User not found')); // return an error if no user is found
        }
        console.log("User information retrieved from the database:", result[0]);
        req.user = result[0];
        return next();
      });
    } catch (error) {
      console.log("Error while verifying the JWT token:", error);
      return next();
    }
  } else {
    console.log("JWT token not present in cookie");
    next();
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.body.userId;

    const { name, email, number, password } = req.body;
    // Check that all required fields are provided
    if (!name || !email || !number || !password) {
      return res.status(400).render('profilet', {
        message: 'Please provide all requirements fields'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user details in the database
    const updateUserQuery = 'UPDATE users SET name=?, email=?, number=?, password=? WHERE id=?';
    db.query(updateUserQuery, [name, email, number, hashedPassword, userId], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).render('profilet', {
          message: 'Something went wrong'
        });
      } else {
        return res.status(200).render('profilet', {
          message: 'Successfully updated'
        });
      } 
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserDetailsA = async (req, res) => {
  try {
    const userId = req.body.userId;

    const { name, email, number, password } = req.body;
    // Check that all required fields are provided
    if (!name || !email || !number || !password) {
      return res.status(400).render('profilea', {
        message: 'Please provide all requirements fields'
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update the user details in the database
    const updateUserQuery = 'UPDATE users SET name=?, email=?, number=?, password=? WHERE id=?';
    db.query(updateUserQuery, [name, email, number, hashedPassword, userId], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).render('profilea', {
          message: 'Something went wrong'
        });
      } else {
        return res.status(200).render('profilea', {
          message: 'Successfully updated'
        });
      } 
    });
  } catch (error) {
    console.log(error);
  }
};

exports.input = async (req, res) => {
  // Get the form data from the request body
  const { tourPlace, tourDuration, tourDate, tourDateEnd, tourCost, amount, lastDate, offerAmount, validTill, transport } = req.body;
  // Prepare the SQL query to insert the form data into the tours table
  const insertQuery = `INSERT INTO tours (name, duration, date, dateEnd, cost, amount, bookingdate, discount, valid, transport) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  // Execute the SQL query with the form data
  db.query(
    insertQuery,
    [tourPlace, tourDuration, tourDate, tourDateEnd, tourCost, amount, lastDate, offerAmount, validTill, transport],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).render('insert', {
          message: 'Something went wrong'
        });
      } else {
        console.log('Form data inserted into MySQL database:', result);
        return res.status(200).render('insert', {
          message: 'Successfully inserted'
        });
      }
    });
};

exports.viewTable = (req, res) => {
  const sql = `SELECT * FROM tours`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('viewtable', {
      user: req.user,
      tours: result
    });
  });
};

exports.viewTablet = (req, res) => {
  const sql = `SELECT * FROM tours`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('viewtablet', {
      user: req.user,
      tours: result
    });
  });
};

exports.deleteTour = (req, res) => {
  
  const sql = `SELECT * FROM tours`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('delete', {
      user: req.user,
      tours: result
    });
  });

  const tourName = req.body.tourName;

  const deleteQuery = "DELETE FROM tours WHERE name = ?";

  db.query(deleteQuery, [tourName], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).render('delete', {
        message: 'Something went wrong'
      });
    } else {
      console.log(`Tour ${tourName} deleted from database`);
      return res.status(200).render('delete', {
        message: 'Successfully deleted'
      });
    }
  });
};

exports.searchTours = (req, res) => {
  let searchTerm = req.query.searchTerm;
  let sql = `SELECT * FROM tours`;

  if (searchTerm) {
    sql += ` WHERE name LIKE '%${searchTerm}%'`;
  }

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('trip', {
      user: req.user,
      tours: result,
      searchTerm: searchTerm
    });
  });
};

exports.books = (req, res) => {
  const { destination, checkin, checkout, comments } = req.body;

  db.query('INSERT INTO booking SET ?', {
      destination: destination,
      checkin: checkin,
      checkout: checkout,
      comments: comments
  }, (error, results) => {
      if (error) {
          console.log(error);
          return res.render('book', {
              message: 'An error occurred while saving your details, please try again later'
          });
      } else {
          console.log(results);
          return res.render('book', {
              message: 'We have collected your details and a customer representative will contact you soon'
          });
      }
  });
};

   
exports.logout = async (req,res) =>{
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}


