/*
A typical URI for MongoDB Atlas(is as shown below). Set up a free/trial cluster 
and update the username, password, cluster,database_name(the application automatically 
creates the given database_name) details.
mongodb+srv://<username>:<password>@<free cluster>/<database_name>?retryWrites=true&w=majority
*/

module.exports = {
  URI: "mongodb+srv://airbus:airbus@trialcluster.80lmg.mongodb.net/airbus_starter?retryWrites=true&w=majority",
};
