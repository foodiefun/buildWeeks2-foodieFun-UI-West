class Tab {
  constructor(tabElement, linkElement) {
    // tabElement is the container
    this.tabElement = tabElement;
    // linkElement are the links within the container
    this.linkElement = linkElement;

    // create tabs link object passing through link element and container
    this.tabsLink = new TabLink(this.linkElement, this.tabElement);

    // click listener passing in deselect method
    this.deselect = this.deselect.bind(this);
    this.linkElement.addEventListener('click', this.deselect);
  };

  deselect() {

    if(document.documentElement.clientWidth > 600) {
      // invoke deselect method and select method from tabs link object
      this.tabsLink.deselect();
      this.tabsLink.select();
    } else {
      // use accordion method from tabs link object
      this.tabsLink.accordion();
    }
  }
}


class TabLink {
  constructor(element, tabElement) {
    // link Element passed thru from Tab
    this.element = element;
    // Container passed thru from Tab
    this.tabElement = tabElement;

    // set datset from link element
    this.data = this.element.dataset.tab;

    // getting tabs-items using data set
    this.contentElement = tabElement.querySelector(`.tabs-items[data-tab="${this.data}"]`);
    // getting tabs-item using data set
    this.itemElement = tabElement.querySelector(`.tabs-item[data-tab="${this.data}"]`);

    // create tab item object passing through content element, item element, and container
    this.tabItem = new TabItem(this.contentElement, this.itemElement, this.tabElement);
  };

  deselect() {
    // grab links in container
    const links = this.tabElement.querySelectorAll('.tabs-link');

    // iterate over links and remove class 'tabs-link-selected'
    links.forEach(function(link) {
      link.classList.remove('tabs-link-selected');
    });

    // invoke deslect method from tabItem object
    this.tabItem.deselect();
  }

  select() {
    // grab links in container
    const links = this.tabElement.querySelectorAll('.tabs-link');

    // iterate over links and remove class 'tabs-link-selected'
    links.forEach(function(link) {
      link.classList.remove('tabs-link-selected');
    });

    // add class 'tabs-link-selected' to link element
    this.element.classList.add('tabs-link-selected');

    // invoke select method from tabsItem object
    this.tabItem.select();
  }

  accordion() {
    // links selector
    const links = this.tabElement.querySelectorAll('.tabs-link');
    // all down arrows selector
    const arrows = this.tabElement.querySelectorAll('.fa-angle-down');
    // down arrow for this element selector
    const arrow = this.element.querySelector('.fa-angle-down');

    // iterate over links to remove class 'tabs-link selected'
    links.forEach(function(link) {
      link.classList.remove('tabs-link-selected');
    });

    // iterate over arrows to remove class 'rotate'
    arrows.forEach(function(arrow) {
      arrow.classList.remove('rotate');
    });

    // add class 'rotate' to arrow element
    arrow.classList.add('rotate');

    // add class 'tabs-link-selected' to link element
    this.element.classList.add('tabs-link-selected');

    // invoke accordion method on tabItem object
    this.tabItem.accordion();
  }
}

class TabItem {
  constructor(contentElement, itemElement, tabElement) {
    // tabs-item Element
    this.contentElement = contentElement;
    // tabs-items Element
    this.itemElement = itemElement;
    // container
    this.tabElement = tabElement;
  }

  deselect() {
    // select all tab-items in container
    const content = this.tabElement.querySelectorAll('.tabs-item');

    // iterate over content and remove class 'tabs-item-selected'
    content.forEach(function(item) {
      item.classList.remove('tabs-item-selected');
    });
  }

  select() {
    // add class 'tabs-item-selected'
    this.itemElement.classList.add('tabs-item-selected');
  }

  accordion() {
    // select all tab-items in container
    const content = this.tabElement.querySelectorAll('.tabs-items');

    // iterate over content and remove class 'tabs-item-selected'
    content.forEach(function(content) {
      content.classList.remove('tabs-items-selected');
    });

    // remove class from item element
    this.itemElement.classList.remove('tabs-item-selected');
    // add class to content element
    this.contentElement.classList.add('tabs-items-selected');
    // add class to item element
    this.itemElement.classList.add('tabs-item-selected');
  }
}

// container
const tabs = document.querySelectorAll('.tabs');

tabs.forEach(function(tabElement) {
  // links
  const links = tabElement.querySelectorAll('.tabs-link');

  links.forEach(function(linkElement) {
    new Tab(tabElement, linkElement);
  });
});
