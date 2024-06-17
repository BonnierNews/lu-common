import ftp from "basic-ftp";

async function put(ftpConfig, fileStream, path, { logger }) {
  const { host, port, user, password, secure } = ftpConfig;
  const client = new ftp.Client();
  try {
    await client.access({
      host,
      port: (port || 21).toString(),
      user,
      password,
      secure,
    });
    await client.uploadFrom(fileStream, path);
  } catch (error) {
    logger.error(`Error when putting to sftp ${error.message}`);
    throw error;
  } finally {
    client.close();
  }
}

export { put };
