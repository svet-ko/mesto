export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }
}
