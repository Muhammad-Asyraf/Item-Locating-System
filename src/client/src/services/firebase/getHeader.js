import { auth } from './index';

const getHeader = async () => {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken(true));
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export default getHeader;
