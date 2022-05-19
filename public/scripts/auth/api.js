class Api {
  #api = undefined;

  constructor() {
    this.#api = axios.create({
      baseURL: window.location.origin,
      withCredentials: true,
    });
  }

  #createForm = (email, password) => ({
    formFields: [
      { id: 'email', value: email },
      { id: 'password', value: password },
    ],
  });

  signUp = (email, password) =>
    this.#api.post('/auth/signup', this.#createForm(email, password));

  signIn = (email, password) =>
    this.#api.post('/auth/signin', this.#createForm(email, password));

  signOut = () => this.#api.post('/auth/signout');

  getUserBySuperTokenId = (superTokenId) =>
    this.#api.get('/user/superTokenId/' + superTokenId);
}

const _api = new Api();
