const initializeRoutes = app => {
    app.use("/user", require("./user"));
    app.use('/',require("./auth"));
  };
  
module.exports = initializeRoutes;
