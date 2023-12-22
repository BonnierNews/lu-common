import { clone, fakeFtp } from "@bonniernews/lu-test";
import stream from "stream";
import config from "exp-config";

import { put } from "../../../lib/utils/ftp.js";

const { Readable } = stream;

const fileContent = "some content\n";
const filePath = "/some/path/file.txt";

describe("put a file to an ftp server", () => {
  before(fakeFtp.reset);
  it("should allow putting a file to an ftp server", async () => {
    fakeFtp.put(filePath);
    const fileStream = Readable.from(fileContent);
    await put(config.ftpConfig, fileStream, filePath, {});
    fakeFtp.written(filePath).should.eql(fileContent);
  });
  it("should allow putting a file to an ftp server, using default port", async () => {
    fakeFtp.put(filePath);
    const fileStream = Readable.from(fileContent);
    const ftpConfig = clone(config.ftpConfig);
    delete ftpConfig.port;
    await put(ftpConfig, fileStream, filePath, {});
    fakeFtp.written(filePath).should.eql(fileContent);
  });
  it("should throw an error when problems arise", async () => {
    fakeFtp.putError();
    const fileStream = Readable.from(fileContent);
    try {
      await put(config.ftpConfig, fileStream, filePath, { logger: { error: () => {} } });
    } catch (error) {
      error.message.should.eql("ftp put failed");
    }
  });
});
