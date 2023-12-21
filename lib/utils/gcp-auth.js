import GoogleAuth from "google-auth-library";

const auth = new GoogleAuth.GoogleAuth();

async function getGcpAuthHeaders(audience) {
  const client = await auth.getIdTokenClient(audience);
  return await client.getRequestHeaders();
}

export { getGcpAuthHeaders };
