const dotenv = require("dotenv");
const axios = require("axios").default;

dotenv.load();

// pulls the user's forum information based on universal ID
const getUser = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://forum.integirls.org/u/by-external/oauth2_basic/${uid}.json`,
        {
          headers: {
            "Api-Key": process.env.DISCOURSE_KEY,
            "Api-Username": "system",
          },
        }
      )
      .then((response) => {
        const data = response.data.user

        delete data["user_auth_tokens"];
        delete data["groups"];
        delete data["group_users"];
        delete data["user_option"];

        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = { getUser };
