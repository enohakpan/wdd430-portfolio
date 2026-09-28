type OwnerUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export async function getUserByEmail(email: string): Promise<OwnerUser | null> {
  const ownerEmail = process.env.AUTH_OWNER_EMAIL;
  const ownerName = process.env.AUTH_OWNER_NAME ?? 'Portfolio Owner';
  const ownerPasswordHash = process.env.AUTH_OWNER_PASSWORD_HASH;

  if (!ownerEmail || !ownerPasswordHash) {
    return null;
  }

  if (ownerEmail.toLowerCase() !== email.toLowerCase()) {
    return null;
  }

  return {
    id: 'owner',
    name: ownerName,
    email: ownerEmail,
    passwordHash: ownerPasswordHash,
  };
}
