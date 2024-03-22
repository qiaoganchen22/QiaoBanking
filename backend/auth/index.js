const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, ssn, address, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!firstname || !lastname) {
      return res.status(401).send("Please enter your name.");
    }

    if (ssn < 9) {
      return res.status(401).send("ssn must be 9 number.");
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isValidEmail(email)) {
      return res.status(401).send("Invalid email address.");
    }

    if (password.length < 7) {
      return res.status(401).send("password must be at least 7 characters.");
    }

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
    const token = jwt.sign({ id: user.id }, process.env.JWT, {
      expiresIn: "1h",
    });

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email)
      return res.status(401).send("Invalid login credentials");
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(400).send("Invald login credentials");
    if (user.email !== req.body.email)
      return res.status(401).send("Invalid login credentials");
    const match = await bcrypt.compare(req.body.password, user?.password);

    if (!match) {
      return res.status(401).send("Invalid login credentials.");
    }

    const token = jwt.sign({ id: user.userid }, process.env.JWT, {
      expiresIn: "1h",
    });
    const array = [];
   
    const accounts = await prisma.account.findMany({
      where: { 
        userid: user.userid 
      },
    });

    for (let account of accounts) {
      const _transations = [];
      const transactions = await prisma.transaction.findMany({
        where: {
          accountid: account.accountid,
        },
      });
      for (let transaction of transactions) {
        _transations.push({
          ...transaction,
          transactionDetails: await prisma.transactiondetails.findFirst({
            where: {
              transactionid: transaction.transactionid,
            },
          }),
        });
      }
      array.push({ ...account, transactions: _transations });
    }
    res.send({ token, user, account:array });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
