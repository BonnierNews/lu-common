import { expect } from "chai";

import { parseUserId, parseUserIdParts } from "../../../lib/utils/userId.js";

describe("parseUserId", () => {
  it("should parse userId", () => {
    expect(parseUserId("expressen://db8a734a-b1aa-4648-8cdd-67825906673e")).to.eql({ namespace: "expressen", userId: "db8a734a-b1aa-4648-8cdd-67825906673e" });
    expect(parseUserId("di://splus/0gJZ1gPX7lj8uPAA8PlFjX")).to.eql({ namespace: "di", userId: "0gJZ1gPX7lj8uPAA8PlFjX" });
  });
});

describe("parseUserIdParts", () => {
  it("should parse userId", () => {
    expect(parseUserIdParts("expressen://")).to.eql({});
    expect(parseUserIdParts("expressen://db8a734a-b1aa-4648-8cdd-67825906673e")).to.eql({ namespace: "expressen", origin: undefined, userId: "db8a734a-b1aa-4648-8cdd-67825906673e" });
    expect(parseUserIdParts("di://splus/0gJZ1gPX7lj8uPAA8PlFjX")).to.eql({ namespace: "di", origin: "splus", userId: "0gJZ1gPX7lj8uPAA8PlFjX" });
  });
});
