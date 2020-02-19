import * as Strings from '~/common/strings';
import * as Data from '~/common/data';
import * as Utilities from '~/common/utilities';
import * as Credentials from '~/common/credentials';

import JWT from 'jsonwebtoken';
import BCrypt from 'bcrypt';

export default async (req, res) => {
  const authorization = Utilities.parseAuthHeader(req.headers.authorization);

  // todo: check if a cookie already exists.
  if (authorization && !Strings.isEmpty(authorization.value)) {
    const verfied = JWT.verify(authorization.value, Credentials.JWT_SECRET);

    return res.status(200).send({
      message: 'You are already authenticated. Welcome back!',
      token: authorization.value,
    });
  }

  if (Strings.isEmpty(req.body.email)) {
    return res
      .status(500)
      .send({ error: 'An e-mail address was not provided.' });
  }

  if (Strings.isEmpty(req.body.password)) {
    return res.status(500).send({ error: 'A password was not provided.' });
  }

  let user = await Data.getUserByEmail({ email: req.body.email });
  if (!user) {
    const salt = BCrypt.genSaltSync(10);
    const hash = BCrypt.hashSync(req.body.password, salt);
    const double = BCrypt.hashSync(hash, salt);
    const triple = BCrypt.hashSync(double, process.env.PASSWORD_SECRET);

    user = await Data.createUser({
      email: req.body.email,
      password: triple,
      salt,
    });
  } else {
    const phaseOne = BCrypt.hashSync(req.body.password, user.salt);
    const phaseTwo = BCrypt.hashSync(phaseOne, user.salt);
    const phaseThree = BCrypt.hashSync(phaseTwo, process.env.PASSWORD_SECRET);

    if (phaseThree !== user.password) {
      return res.status(500).send({ error: 'We could not authenticate you.' });
    }
  }

  const token = JWT.sign(
    { user: user.id, email: user.email },
    Credentials.JWT_SECRET
  );

  return res.status(200).send({ token });
};
