-- CreateEnum
CREATE TYPE "account_type" AS ENUM ('checking', 'savings');

-- CreateEnum
CREATE TYPE "action" AS ENUM ('deposit', 'withdrawal', 'transfer');

-- CreateTable
CREATE TABLE "account" (
    "accountid" SERIAL NOT NULL,
    "userid" INTEGER,
    "type" "account_type",
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("accountid")
);

-- CreateTable
CREATE TABLE "transaction" (
    "transactionid" SERIAL NOT NULL,
    "userid" INTEGER,
    "type" "action",
    "accountid" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("transactionid")
);

-- CreateTable
CREATE TABLE "transactiondetails" (
    "transactiondetailsid" SERIAL NOT NULL,
    "toaccount" INTEGER,
    "fromaccount" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionid" INTEGER,

    CONSTRAINT "transactiondetails_pkey" PRIMARY KEY ("transactiondetailsid")
);

-- CreateTable
CREATE TABLE "users" (
    "userid" SERIAL NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "ssn" INTEGER NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "isadmin" BOOLEAN DEFAULT false,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ssn_key" ON "users"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_accountid_fkey" FOREIGN KEY ("accountid") REFERENCES "account"("accountid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactiondetails" ADD CONSTRAINT "transactiondetails_fromaccount_fkey" FOREIGN KEY ("fromaccount") REFERENCES "account"("accountid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactiondetails" ADD CONSTRAINT "transactiondetails_toaccount_fkey" FOREIGN KEY ("toaccount") REFERENCES "account"("accountid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactiondetails" ADD CONSTRAINT "transactiondetails_transactionid_fkey" FOREIGN KEY ("transactionid") REFERENCES "transaction"("transactionid") ON DELETE NO ACTION ON UPDATE NO ACTION;
