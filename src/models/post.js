export class PostClass {
  constructor() {
    this.id = null
    this.title = null
    this.shortText = null
    this.text = null
    this.comments = []
  }

  static generatePost(obj) {
    const _this = new PostClass()

    if(obj) {
      _this.id = obj.id || null
      _this.title = obj.title || null
      _this.shortText = obj.shortext || null
      _this.text = obj.text || null
      _this.comments = obj.comments || []
    } else {
      _this.id = null
      _this.title = null
      _this.shortText = null
      _this.text = null
      _this.comments = []
    }

    return _this
  }
}