const bcrypt = require("bcrypt");
const db = require("./database/db");

async function resetPassword() {

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  db.query(

    "UPDATE users SET password = ? WHERE email = ?",

    [

      hashedpassword,

      "admin@Datawave.com"

    ],

    (err) => {

      if (err) {

        console.log(err);

      }

      else {

        console.log("✅ Password Reset Successfully");

      }

      process.exit();

    }

  );

}

resetPassword();