/**
 * Functions to operate labels Array
 * label object ={
 *   key //for table selction; the value equal to sku
 *   sku
 *   quantity
 * }
 */
/**
 * Add multiple labels to the queue
 * @param {*} label
 * @param {*} qty
 */
export function addLabels(labels, newLabels) {
  let result = labels;
  for (let i = 0; i < newLabels.length; i++) {
    result = addALabel(result, newLabels[i].sku, newLabels[i].quantity);
  }
  return result;
}
/**
 * Add a label to the queue. If the label exists, add the quantity to the current quantity; Otherwise, add a
 * new label with quantity
 * @param {*} label
 * @param {*} qty
 */
export function addALabel(labels, label, qty) {
  let newLabels = [...labels];
  let isFound = false;

  for (let i = 0; i < newLabels.length; i++) {
    if (newLabels[i].sku === label) {
      newLabels[i].quantity += qty;
      isFound = true;
      break;
    }
  }

  if (!isFound) {
    const newLabel = {
      key: label,
      sku: label,
      quantity: qty,
    };

    newLabels.push(newLabel);
  }

  return newLabels;
}

/**
 * Remove a label from the queue
 * @param {*} label
 * @param {*} qty
 */
export function removeALabel(labels, label) {
  let newLabels = [...labels];
  for (let i = 0; i < newLabels.length; i++) {
    if (newLabels[i].sku === label) {
      newLabels.splice(i, 1);
      break;
    }
  }

  return newLabels;
}

/**
 * Update the qty of a label
 * @param {*} label
 * @param {*} qty
 */
export function updateALabel(labels, label, qty) {
  let newLabels = [...labels];
  for (let i = 0; i < newLabels.length; i++) {
    if (newLabels[i].sku === label) {
      newLabels[i].quantity = qty;
      break;
    }
  }

  return newLabels;
}
//return an array with quantity of labels
export function getLabelsByQty(labels, label) {
  var qty = 0;
  let new_labels = [];

  for (let i = 0; i < labels.length; i++) {
    if (labels[i].sku === label) {
      qty = labels[i].quantity;
      break;
    }
  }

  for (let i = 0; i < qty; i++) {
    new_labels.push(label);
  }

  return new_labels;
}
