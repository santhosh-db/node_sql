const initializeRoutes = app => {
    app.use("/api/v1/user", require("./user"));
    app.use('/api/v1',require("./auth"));
  };
  
module.exports = initializeRoutes;
