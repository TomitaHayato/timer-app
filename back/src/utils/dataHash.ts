import bcrypt from 'bcrypt'

export const dataHash = async(data: string) => {
  try {
    const hashedData = await bcrypt.hash(data, 10);
    return hashedData;
  } catch(err) {
    console.error('Error hashing:', data, err);
    throw err;
  }
}
