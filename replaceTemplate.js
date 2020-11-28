module.exports = (temp, product) => {
    let output = temp.replace(/{%ANIMALNAME%}/g, product.productAnimal);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%NO%}/g, product.no);
    output = output.replace(/{%FROM%}/g, product.from);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
  }