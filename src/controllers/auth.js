"use strict";

/* ------------------------------------------------------- */
// Auth Controller:

const jwt = require("jsonwebtoken");
const setToken = require("../helpers/setToken");

const User = require("../models/user");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */

    const { username, password } = req.body;

    if (username && password) {
      const user = await User.findOne({ username, password });

      if (user) {
        if (user.isActive) {
          res.send({
            error: false,
            token: setToken(user),
          });
        } else {
          res.status(401).json({
            message: "Account is not active!",
          });
        }
      } else {
        res.status(401).json({
          message: "Username or password is incorrect!",
        });
      }
    } else {
      res.status(401).json({
        message: "Username and password are required!",
      });
    }
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Token Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    token: {
                        refresh: '...refreshToken...'
                    }
                }
            }
        */

    const refreshToken = req.body?.token?.refresh;

    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        async function (err, userData) {
          if (err) {
            res.errorStatusCode = 401;
            throw new Error("Refresh Token is invalid!");
          } else {
            const { _id, password } = userData;

            if (_id && password) {
              const user = await User.findOne({ _id });
              if (user && user.password == password) {
                if (user.isActive) {
                  res.send({
                    error: false,
                    token: setToken(user, true),
                  });
                } else {
                  res.errorStatusCode = 401;
                  throw new Error("Account is not active!");
                }
              } else {
                res.errorStatusCode = 401;
                throw new Error("Wrong id or password!");
              }
            } else {
              res.errorStatusCode = 401;
              throw new Error("Please enter id and password!");
            }
          }
        }
      );
    } else {
      res.errorStatusCode = 401;
      throw new Error("Refresh Token is required!");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */
  },
};
