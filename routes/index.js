import signIn from '~/routes/sign-in';
import signInConfirm from '~/routes/sign-in-confirm';
import signInSuccess from '~/routes/sign-in-success';

import apiSignIn from '~/routes/api/sign-in';

module.exports = {
  signIn,
  signInConfirm,
  signInSuccess,
  api: {
    signIn: apiSignIn,
  },
};
