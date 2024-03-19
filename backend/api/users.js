const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

router.get("/", async (req, res, next) => {
  //get all user
  try {
    const users = await prisma.users.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  //get user by id
  try {
    const user = await prisma.users.findFirst({
      where: {
        userid: Number(req.params.id),
      },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/admin/:id", async (req, res, next) => {
  //get user for admin account/transaction
  try {
    const { id } = req.params;
    const array = [];
    const account = await prisma.account.findMany({
      where: {
        userid: Number(id),
      },
    });

    for (let x of account) {
      const transArray = [];
      const transaction = await prisma.transaction.findMany({
        where: {
          accountid: Number(x.accountid),
        },
      });
      for (let y of transaction) {
        const transactiondetails = await prisma.transactiondetails.findFirst({
          where: {
            transactionid: Number(y.transactionid),
          },
        });
        transArray.push({ ...y, transactiondetails });
      }
      array.push({ ...x, transaction: transArray });
    }
    res.send({ array });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // create user by admin
  try {
    const { firstname, lastname, ssn, address, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.users.create({
      data: {
        firstname,
        lastname,
        ssn,
        address,
        password: hashedPassword,
        email,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  //update for user
  try {
    const { firstname, lastname, address, password } = req.body;
    const data = {};
    if (firstname) {
      data.firstname = firstname;
    }
    if (lastname) {
      data.lastname = lastname;
    }
    if (address) {
      data.address = address;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      data.password = hashedPassword;
    }
    const user = await prisma.users.update({
      where: {
        userid: Number(req.user.id),
      },
      data,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
