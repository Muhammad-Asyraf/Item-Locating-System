export const addItemReducer = (state, payload) => {
    // Payload is an object containing cart_uuid, product_uuid and quantity
    // Place productId to a variable
    let product = payload.product_uuid;

    // Copy state
    let productArr = [...state.products];
    let quantityArr = [...state.quantity];

    // Get the index of the product
    let index = state.products.indexOf(product);

    // Product does not exist is cart
    if(index == -1){
      productArr.push(product)
      index = state.products.indexOf(product);
    }

    // Check of the array index exists
    if (quantityArr[index] == null) {
      console.log("Product quantity not exist, creating one");
      quantityArr.push(1);
    } else {
      console.log("Product quantity exist, updating it");
      quantityArr[index] += 1;
    }

    // Set states
    state.products = productArr;
    state.quantity = quantityArr;
    state.update = true;
    
    console.log(state);
}

export const updateItemReducer = (state, payload) => {
    // Payload is an object containing cart_uuid, product_uuid and quantity
    // Place payload data to variables
    let product = payload.product_uuid;
    let quantity = payload.quantity;

    console.log("Product uuid: " + product + ` (${quantity})`);

    // Copy state
    let productArr = [...state.products];
    let quantityArr = [...state.quantity];

    // Get the index of the product
    let index = state.products.indexOf(product);

    // If quantity == 0, remove product from array
    if (quantity === 0) {
      console.log("Quantity is zero, removing records");
      productArr.splice(index, 1);
      quantityArr.splice(index, 1);
    } else {
      console.log("Product quantity exist, updating it");
      quantityArr[index] = quantity;
    }

    // Set states
    state.products = productArr;
    state.quantity = quantityArr;
    state.update = true;

    console.log(state);
}