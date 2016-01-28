import Exception from '../core/exceptions';

//
// Collection.js
//

const Collection = {

  /**
   * Add an item to the collection
   *
   * @param {object} c - The collection object
   * @param {object} item - The item to add
   * @return {number} - The id of the new item
   */
  add(c, item) {
    // if the item has an id, check for duplicate
    if (item.hasOwnProperty('id')) {
      if (c.ids.indexOf(item.id) !== -1) {
        throw new Exception('Duplicate id for item #' + item.id);
      }
    // else, give item an id
    } else {
      item.id = this.nextId(c);
    }
    // add item to collection
    c.ids.unshift(item.id);
    c.entities[item.id] = item;
    return item.id;
  },

  /**
   * Given an array of items, format as collection object
   *
   * @param {array} items - The items to use
   * @return {object} - The new collection object
   */
  create(items = []) {
    let c = {ids: [], entities: {}};
    for (let i = 0; i < items.length; i++) {
      this.add(c, items[i]);
    }
    return c;
  },

  /**
   * Find item by id
   *
   * @param {object} c - The collection object
   * @param {number} id - The id of the item
   * @return {mixed} - The item, if it exists
   */
  find(c, id) {
    if (c.ids.indexOf(id) === -1) {
      throw new Exception('There is no item with id #' + id);
    }
    return c.entities[id];
  },

  /**
   * Find item by property, value pair
   *
   * Note: can be used to enforce unique property value
   *
   * @param {object} c - The collection object
   * @param {mixed} property - The property to search
   * @param {mixed} value - The value to match
   * @return {mixed} - The item, if it exists
   */
  findByProp(c, property, value) {
    for (let i = 0; i < c.ids.length; i++) {
      let item = c.entities[c.ids[i]];
      if (item[property] === value) {
        return item;
      }
    }
    throw new Exception('There is no item with the specified prop:val pair');
  },

  /**
   * Return the collection as an array
   *
   * @param {object} c - The collection object
   * @param {number} take - The limit of items to include in the array
   * @return {array} - The collection as an array
   */
  listify(c, take) {
    let arr = [];
    for (let i = 0; i < c.ids.length || i === take - 1; i++) {
      arr.push(c.entities[c.ids[i]]);
    }
    return arr;
  },

  /**
   * Get the id of the next (uncreated) collection item
   *
   * @param {object} c - The collection object
   * @return {number} - The next successive id
   */
  nextId(c) {
    return (c.ids.length === 0) ? 1 : c.ids[0] + 1;
  },

  /**
   * Remove an item from the collection
   *
   * @param {object} c - The collection object
   * @param {number} id - The id of the item
   * @return {mixed} - The deleted item
   */
  remove(c, id) {
    let itemIndex = c.ids.indexOf(id);
    // if the item doesn't exist, throw an error
    if (itemIndex === -1) {
      throw new Exception('There is no item with id #' + id);
    }
    // delete and return the item
    c.ids.splice(itemIndex, 1);
    let deletedItem = Object.assign({}, c.entities[id]);
    delete c.entities[id];
    return deletedItem;
  },

  /**
   * Update an item in the collection
   *
   * @param {object} c - The collection object
   * @param {object} id - The id of the item to update
   * @param {object} newValues - The key:value pairs to update
   * @return {mixed} - True if succeeded, exception otherwise
   */
  update(c, id, newValues) {
    let item;
    // verify that item exists
    try {
      item = this.find(c, id);
      for (let prop in newValues) {
        if (newValues.hasOwnProperty(prop)) {
          item[prop] = newValues[prop];
        }
      }
    } catch (ex) {
      return ex;
    }
    return true;
  }

};

export default Collection;
