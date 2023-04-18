export class User {
  constructor() {
    this.id = null
    this.userName = null
    this.roles = []
  }

  static generateUser(obj) {
    const _this = new User()

    if(obj) {
      _this.id = obj.id || null
      _this.userName = obj.userName || null
      _this.roles = obj.roles || []
    } else {
      _this.id = null
      _this.userName = null
      _this.roles = []
    }

    return _this
  }
}