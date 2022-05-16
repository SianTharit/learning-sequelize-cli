// const db = require("./models");
// db.sequelize.authenticate().then(() => console.log("DB connected"));

const { sequelize, User } = require("./models");
// sequelize.sync({ force: true });

// const run = async () => {
//     try {
//         const user = await User.create({
//             username: "John",
//             password: "123456",
//             email: "JOHN@gmail.com",
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };
// run();
