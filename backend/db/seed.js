const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await prisma.transactiondetails.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.account.deleteMany();
    await prisma.users.deleteMany();

    await prisma.$executeRaw`ALTER SEQUENCE "transaction_transactionid_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "account_accountid_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "transactiondetails_transactiondetailsid_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "users_userid_seq" RESTART WITH 1`;

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error(error);
  }
}

async function createInitialUsers() {
  try {
    console.log("creating users");
    const salt = await bcrypt.genSalt(10);
    await createUser({
      firstname: "qiao",
      lastname: "chen",
      ssn: 123121234, //9 digits
      address: "123 12th ave 1234",
      isadmin: true,
      password: await bcrypt.hash("123", salt),
      email: "qiao@gmail.com",
    });
    await createUser({
      firstname: "peter",
      lastname: "chen",
      ssn: 321323210, //9 digits
      address: "321 21th ave 4321",
      isadmin: true,
      password: await bcrypt.hash("123", salt),
      email: "peter@gmail.com",
    });
    await createUser({
      firstname: "bob",
      lastname: "bob",
      ssn: 123412341, //9 digits
      address: "321 21th ave 4321",
      isadmin: false,
      password: await bcrypt.hash("123", salt),
      email: "bob@gmail.com",
    });
  } catch (error) {
    console.log("Error creating users!");
    throw error;
  }
}
async function createInitialAccounts() {
  try {
    console.log("creating accounts");
    await createAccount({
      userid: 1,
      type: "checking",
      balance:0
    });
    await createAccount({
      userid: 1,
      type: "savings",
      balance:0
    });
    await createAccount({
      userid: 2,
      type: "checking",
      balance:0
    });
    await createAccount({
      userid: 3,
      type: "savings",
      balance:0
    });
  } catch (error) {
    console.log("Error creating accounts!");
    throw error;
  }
}
async function createInitialTransaction() {
  try {
    console.log("creating transaction");
    await createtransaction({
      userid: 1,
      type: "deposit",
      accountid:1
    });
    await createtransaction({
      userid: 1,
      type: "withdrawal",
      accountid:1
    });
    await createtransaction({
      userid: 1,
      type: "transfer",
      accountid:1
    });
  } catch (error) {
    console.log("Error creating transaction");
    throw error;
  }
}
async function createInitialTransactionDetails() {
  try {
    console.log("creating transaction details");
    await createtransactiondetails({
      toaccount: 1,
      fromaccount: 1,
      amount: 100,
      transactionid: 1,
    });
    await createtransactiondetails({
      toaccount: 1,
      fromaccount: 1,
      amount: 10,
      transactionid: 2,
    });
    await createtransactiondetails({
      toaccount: 2,
      fromaccount: 1,
      amount: 10,
      transactionid: 3,
    });
  } catch (error) {
    console.log("Error creating transaction details");
    throw error;
  }
}

async function createUser({
  firstname,
  lastname,
  ssn,
  address,
  isadmin,
  password,
  email,
}) {
  try {
    await prisma.users.create({
      data: {
        firstname,
        lastname,
        ssn,
        address,
        isadmin,
        password,
        email,
      },
    });
  } catch (error) {
    throw error;
  }
}
async function createAccount({ userid, type, balance }) {
  try {
    await prisma.account.create({
      data: {
        userid,
        type,
        balance,
      },
    });
  } catch (error) {
    throw error;
  }
}
async function createtransaction({ userid, type,accountid }) {
  try {
    await prisma.transaction.create({
      data: {
        userid,
        type,
        accountid
      },
    });
  } catch (error) {
    throw error;
  }
}

async function createtransactiondetails({
  toaccount,
  fromaccount,
  amount,
  transactionid,
}) {
  try {
    await prisma.transactiondetails.create({
      data: {
        toaccount,
        fromaccount,
        amount,
        transactionid,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createInitialUsers();
    await createInitialAccounts();
    await createInitialTransaction();
    await createInitialTransactionDetails();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
