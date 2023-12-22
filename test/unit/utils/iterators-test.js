import stream from "stream";

import {
  cons,
  decorate,
  enumerate,
  inject,
  parse,
  split,
  stringify,
  generate,
  unbuffer,
} from "../../../lib/utils/iterators.js";

const {
  Readable,
  promises: { pipeline },
} = stream;

describe("create an array with a specified value plus each item from the stream", () => {
  it("should produce a stream of arrays with the specified object first", async () => {
    const finalOutput = [];
    await pipeline(
      Readable.from([
        { id: "1" },
        { id: "2", attributes: { key1: "value1" } },
        { id: "3", attributes: { key1: "value1", key2: "value2" } },
      ]),
      cons({ key2: "new value" }),
      async (iterable) => {
        for await (const o of iterable) {
          finalOutput.push(o);
        }
      }
    );
    finalOutput.should.eql([
      [ { key2: "new value" }, { id: "1" } ],
      [ { key2: "new value" }, { id: "2", attributes: { key1: "value1" } } ],
      [ { key2: "new value" }, { id: "3", attributes: { key1: "value1", key2: "value2" } } ],
    ]);
  });
});

describe("add parameters to a json stream", () => {
  it("should add the specified object's parameters to the attributes in a stream of objects", async () => {
    const finalOutput = [];
    await pipeline(
      Readable.from([
        { id: "1" },
        { id: "2", attributes: { key1: "value1" } },
        { id: "3", attributes: { key1: "value1", key2: "value2" } },
      ]),
      decorate({ key2: "new value" }),
      async (iterable) => {
        for await (const o of iterable) {
          finalOutput.push(o);
        }
      }
    );
    finalOutput.should.eql([
      { id: "1", attributes: { key2: "new value" } },
      { id: "2", attributes: { key1: "value1", key2: "new value" } },
      { id: "3", attributes: { key1: "value1", key2: "new value" } },
    ]);
  });
});

describe("count the records in the stream", () => {
  it("count each record after yielding it", async () => {
    const finalOutput = [];
    await pipeline(Readable.from([ "line1", "line2" ]), enumerate, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput[0].should.eql([ 0, "line1" ]);
    finalOutput[1].should.eql([ 1, "line2" ]);
  });
});

describe("inject something into a stream", () => {
  it("should inject a string at the start of a stream", async () => {
    const finalOutput = [];
    await pipeline(Readable.from("line1\nline2\n"), inject("something\n"), async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ "something\n", "line1\nline2\n" ]);
  });
});

describe("parse text stream to json", () => {
  it("should convert json strings to objects", async () => {
    const finalOutput = [];
    await pipeline(Readable.from([ '{"key1":"value1"}\n' ]), parse, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ { key1: "value1" } ]);
  });
});

describe("split text into an array", () => {
  it("should split a string containing line breaks into an array", async () => {
    const finalOutput = [];
    await pipeline(Readable.from("line1\nline2\n"), split, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ "line1", "line2" ]);
  });
  it("should split a string containing windows line breaks into an array", async () => {
    const finalOutput = [];
    await pipeline(Readable.from("line1\r\nline2\r\n"), split, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ "line1", "line2" ]);
  });
  it("should return all lines, even if missing a trailing line break", async () => {
    const finalOutput = [];
    await pipeline(Readable.from("line1\nline2"), split, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ "line1", "line2" ]);
  });
});

describe("stringify json stream", () => {
  it("should convert json objects to strings", async () => {
    const finalOutput = [];
    await pipeline(Readable.from([ { key1: "value1" } ]), stringify, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ '{"key1":"value1"}\n' ]);
  });
  it("should convert json objects in buffer form to strings", async () => {
    // this is super weird and probably never happens in reality, but the code supports it
    const finalOutput = [];
    await pipeline(Readable.from(Buffer.from(JSON.stringify({ key1: "value1" }))), stringify, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ '"{\\"key1\\":\\"value1\\"}"\n' ]);
  });
});

describe("generate stream", () => {
  it("should generate a read stream from an array", async () => {
    const finalOutput = [];
    await pipeline(generate([ "some content" ]), async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ "some content" ]);
  });
});

describe("convert buffer stream to string stream", () => {
  it("should unbuffer the input", async () => {
    const finalOutput = [];
    await pipeline(Readable.from(Buffer.from("some content")), unbuffer, async (iterable) => {
      for await (const o of iterable) {
        finalOutput.push(o);
      }
    });
    finalOutput.should.eql([ "some content" ]);
  });
});
