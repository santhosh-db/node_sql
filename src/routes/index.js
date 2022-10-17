const initializeRoutes = app => {
    app.use("/api/user", require("./user"));
  };
  
module.exports = initializeRoutes;
