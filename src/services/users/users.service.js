const fs = require("fs");

const usersList = JSON.parse(
  fs.readFileSync(`${__dirname}/../../../data/users.json`)
);

exports.validateId = (req, res, next, val) => {
  const isAValidId = usersList.find((each) => each.id === val);
  console.log(isAValidId);
  console.log(val);

  if (!isAValidId) {
    return res.status(400).json({
      status: "failed",
      message: "invalid id",
    });
  }

  next();
};

exports.viewAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: usersList.length,
    data: {
      users: usersList,
    },
  });
};

exports.addNewUser = (req, res) => {
  const id = Math.trunc(Math.random() * 1000).toString();
  console.log(id);
  console.log(req.body);
  const newUser = { id, ...req.body };
  console.log(newUser);
  usersList.push(newUser);

  fs.writeFile(
    `${__dirname}/../../../data/users.json`,
    JSON.stringify(usersList),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          users: newUser,
        },
      });
    }
  );
};
exports.updateUser = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      users: { id: req.params.id, ...req.body },
    },
  });
};

exports.removeUser = (req, res) => {
  const updatedList = usersList.map((user) => {
    if (user.id !== req.params.id) return user;

    return;
  });
  console.log("===========");
  console.log(req.params.id);
  console.log(updatedList);

  fs.writeFile(
    `${__dirname}/../../../data/users.json`,
    JSON.stringify(updatedList),
    (err) => {
      res.status(201).json({
        status: "success",
        data: null,
      });
    }
  );
};
