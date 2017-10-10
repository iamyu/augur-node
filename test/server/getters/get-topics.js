"use strict";

const unlink = require("fs").unlink;
const join = require("path").join;
const assert = require("chai").assert;
const setupTestDb = require("../../test.database");
const { getTopics } = require("../../../build/server/getters/get-topics");

describe("server/getters/get-topics", () => {
  const test = (t) => {
    it(t.description, (done) => {
      setupTestDb((err, db) => {
        if (err) assert.fail(err);
        getTopics(db, t.params.universe, (err, topicsInfo) => {
          t.assertions(err, topicsInfo);
          done();
        });
      });
    });
  };
  test({
    description: "get topics in universe b sorted by popularity",
    params: {
      universe: "0x000000000000000000000000000000000000000b"
    },
    assertions: (err, topicsInfo) => {
      assert.isNull(err);
      assert.deepEqual(topicsInfo, [
        { topic: "finance", popularity: 12345 },
        { topic: "politics", popularity: 5000 },
        { topic: "ethereum", popularity: 1000 },
        { topic: "augur", popularity: 500 },
        { topic: "test topic", popularity: 0 }
      ]);
    }
  });
  test({
    description: "nonexistent universe",
    params: {
      universe: "0x1010101010101010101010101010101010101010"
    },
    assertions: (err, topicsInfo) => {
      assert.isNull(err);
      assert.isUndefined(topicsInfo);
    }
  });
});