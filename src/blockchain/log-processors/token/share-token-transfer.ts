import { Augur } from "augur.js";
import { parallel } from "async";
import * as Knex from "knex";
import { Address, ErrorCallback, AsyncCallback } from "../../../types";
import { refreshPositionInMarket } from "../order-filled/refresh-position-in-market";

export function updateShareTokenTransfer(db: Knex, augur: Augur, trx: Knex.Transaction, marketID: Address, from: Address, to: Address, callback: ErrorCallback): void {
  parallel([
    (next: AsyncCallback): void => refreshPositionInMarket(db, augur, trx, marketID, from, next),
    (next: AsyncCallback): void => refreshPositionInMarket(db, augur, trx, marketID, to, next),
  ], callback);
}