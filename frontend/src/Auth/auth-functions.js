class Authfunction {
  logout() {
    localStorage.removeItem("user");
  }

  get_current_user() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new Authfunction();
