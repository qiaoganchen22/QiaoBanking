const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

router.get("/", async (req, res, next) => {
  //get all
  //get transaction from clicking on account
  try {
    const array = [];
    const user = await prisma.users.findFirst({
      where: {
        userid: req.user.id,
      },
    });
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
    res.send(array);
  } catch (error) {
    next(error);
  }
});

// router.get("/details", async (req, res, next) => {
//   //get transaction details from clicking on transaction
//   try {
//     const details = await prisma.transactiondetails.findFirst({
//       where: {
//         transactionid: req.body.transactionid,
//       },
//     });
//     res.send(details);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/deposit", async (req, res, next) => {
  console.log(req.body.amount, req.body.accountid);
  try {
    const account = await prisma.account.findFirst({
      where: {
        accountid: Number(req.body.accountid),
      },
    });
    // console.log(account.balance);
    const updatedaccount = await prisma.account.update({
      where: {
        accountid: Number(req.body.accountid),
      },
      data: {
        balance: account.balance + Number(req.body.amount),
      },
    });
    const newTransaction = await prisma.transaction.create({
      data: {
        userid: req.user.id, //req.user.id
        type: "deposit",
        accountid: account.accountid,
      },
    });
    const transactiondetails = await prisma.transactiondetails.create({
      data: {
        toaccount: Number(req.body.accountid),
        fromaccount: Number(req.body.accountid),
        amount: req.body.amount,
        transactionid: newTransaction.transactionid,
      },
    });
    res.send({ updatedaccount, newTransaction, transactiondetails });
  } catch (error) {
    next(error);
  }
});

router.post("/withdrawal", async (req, res, next) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        accountid: Number(req.body.accountid),
      },
    });

    if (account.balance < req.body.amount) {
      return res.send("Not Enough Funds!");
    }
    const updatedaccount = await prisma.account.update({
      where: {
        accountid: Number(req.body.accountid),
      },
      data: {
        balance: account.balance - Number(req.body.amount),
      },
    });
    const newTransaction = await prisma.transaction.create({
      data: {
        userid: req.user.id, //req.user.id
        type: "withdrawal",
        accountid: account.accountid,
      },
    });
    const transactiondetails = await prisma.transactiondetails.create({
      data: {
        toaccount: Number(req.body.accountid),
        fromaccount: Number(req.body.accountid),
        amount: req.body.amount,
        transactionid: newTransaction.transactionid,
      },
    });
    res.send({ updatedaccount, newTransaction, transactiondetails });
  } catch (error) {
    next(error);
  }
});

router.post("/transfer", async (req, res, next) => {
  try {
    const { toaccountid, fromaccountid, amount } = req.body;

    if (toaccountid === fromaccountid)
      return res.send("Cannot transfer to same account");

    let fromaccount = await prisma.account.findFirst({
      //from account
      where: {
        accountid: Number(fromaccountid),
      },
    });

    if (fromaccount.balance < amount) {
      return res.send("Not Enough Funds!");
    }

    let toaccount = await prisma.account.findFirst({
      //to account
      where: {
        accountid: Number(toaccountid),
      },
    });

    if (!toaccount) return res.send("Account does not exist");

    fromaccount = await prisma.account.update({
      //update from
      where: {
        accountid: Number(fromaccountid),
      },
      data: {
        balance: fromaccount.balance - Number(amount),
      },
    });
    toaccount = await prisma.account.update({
      //update to
      where: {
        accountid: Number(toaccountid),
      },
      data: {
        balance: toaccount.balance + Number(amount),
      },
    });

    const newTransaction = await prisma.transaction.create({
      data: {
        userid: fromaccount.userid, //req.user.id
        type: "transfer",
        accountid: Number(fromaccountid),
      },
    });
    const transactionDetails = await prisma.transactiondetails.create({
      data: {
        toaccount: Number(toaccountid),
        fromaccount: Number(fromaccountid),
        amount: Number(amount),
        transactionid: newTransaction.transactionid,
      },
    });

    const newTransactionTo = await prisma.transaction.create({
      data: {
        userid: toaccount.userid, //new transaction for to account
        type: "transfer",
        accountid: toaccount.accountid,
      },
    });

    const transactionDetailsTo = await prisma.transactiondetails.create({
      data: {
        toaccount: Number(toaccountid),
        fromaccount: Number(fromaccountid),
        amount: Number(amount),
        transactionid: newTransactionTo.transactionid,
      },
    });

    toaccount.userid === fromaccount.userid
      ? res.send({
          fromaccount,
          toaccount, 
          fromaccountTransaction: {
            ...newTransaction,
            transactionDetails: transactionDetails,
          },
          toaccountTransaction: {
            ...newTransactionTo,
            transactionDetails: transactionDetailsTo,
          },
        })
      : res.send({
          fromaccount,
          fromaccountTransaction: {
            ...newTransaction,
            transactionDetails: transactionDetails,
          },
        });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
