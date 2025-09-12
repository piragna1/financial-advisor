import { findUserById, findUserByEmail } from "../actors/retrievers/userRetriever.js";

export async function getProfile(req, res,next) {
  try{  
    const userId = req.userId;
    const user = await findUserById(userId); //semi-pure
    res.status(200).json({ user });
  }catch(err){
    next(err);
  }

};

const testInputs = [
  { userId: 'valid-id' },
  { userId: 'unicode-id' },
  { userId: 'nonexistent-id' },
  { userId: '' },
  { userId: null },
  { userId: undefined },
  { userId: 123 },
];

for (const req of testInputs.map(id => ({ userId: id.userId }))) {
  const res = {
    code: undefined,
    response: undefined,
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.response = payload;
    },
  };

  const next = (err) => {
    res.code = 500;
    res.response = { error: err.message || 'Unknown error' };
  };

  await getProfile(req, res, next);

  console.log('Input:', req);
  console.log('Status:', res.code);
  console.log('Response:', res.response);
  console.log('---');
}
