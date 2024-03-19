const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

router.get("/:id", async (req, res, next) => {
  //get all account user/admin
  try {
    const account = await prisma.account.findMany({
      where: {
        userid: Number(req.params.id),
      },
    });
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  //create new account user/admin
  try {
    const { type, balance } = req.body;
    const account = await prisma.account.create({
      data: {
        userid: Number(req.user.id),
        type,
        balance,
      },
    });
    res.status(201).send(account);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
