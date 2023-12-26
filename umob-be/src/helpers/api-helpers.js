module.exports = {
  getRandomIndices(array, count) {
    // Create a copy of the array indexes
    let indices = array.map((_, index) => index);

    // Shuffle the indices using the Fisher-Yates (Durstenfeld) shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]]; // Swap elements
    }

    // Slice the first 'count' indices
    return indices.slice(0, count);
  },

  findObjectWithLargestField(array, fieldName) {
    // Return null if the array is empty
    if (array.length === 0) {
      return null;
    }

    // Start with the first object as the largest
    let largestObject = array[0];

    for (let i = 1; i < array.length; i++) {
      if (array[i][fieldName] > largestObject[fieldName]) {
        // Update if the current object has a larger field
        largestObject = array[i];
      }
    }

    // Return the object with the largest field
    return largestObject;
  },

  findObjectWithSmallestField(array, fieldName) {
    // Return null if the array is empty
    if (array.length === 0) {
      return null;
    }

    let smallestObject = array[0];

    for (let i = 1; i < array.length; i++) {
      if (array[i][fieldName] < smallestObject[fieldName]) {
        smallestObject = array[i];
      }
    }

    return smallestObject;
  },
};
