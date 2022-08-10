export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about:  this._about.textContent
    }
  }

  setUserInfo(newUserInfo) {
    this._name.textContent = newUserInfo.name;
    this._about.textContent = newUserInfo.about;
  }

  setUserAvatar(newUserAvatar) {
    this._avatar.src = newUserAvatar.avatar;
    console.log(this._avatar.src);
  }

  setUserId(userId) {
    this.id = userId;
  }

  getUserId() {
    return this.id;
  }
}
