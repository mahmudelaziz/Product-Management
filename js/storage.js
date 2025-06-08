//---------------------------------------------------------------------//
//                        Global Scope Varibles                        //
//---------------------------------------------------------------------//

let searchMood = 'name',
  sortMood = 'name',
  submitMood = 'create',
  updateThisProduct;

//----------------------------------------------------------------------//
//                   Create And Save New Products                       //
//----------------------------------------------------------------------//

let name = document.getElementById('name');
let capital = document.getElementById('capital');
let price = document.getElementById('price');
let cont = document.getElementById('cont');
let createPro = document.getElementById('createProduct');

function change(value) {
  const none = document.querySelector('.selectOptions');
  const fab = document.getElementById('fab');
  const cloth = document.getElementById('cloth');
  const shoes = document.getElementById('shoes');
  const other = document.getElementById('other');

  function show(target) {
    fab.classList.add('hide');
    cloth.classList.add('hide');
    shoes.classList.add('hide');
    other.classList.add('hide');
    none.classList.remove('hide');
    target.classList.remove('hide');
  }

  value == 'none' && none.classList.add('hide');
  value == 'fabric' && show(fab);
  value == 'clothing' && show(cloth);
  value == 'shoes' && show(shoes);
  value == 'other' && show(other);
}

function sizeType() {
  let target = document.querySelector('input[name="sizeType"]:checked'),
    abc = document.querySelector('.abc'),
    n123 = document.querySelector('.n123');

  if (target.value.includes('abc')) {
    n123.classList.add('hide');
    abc.classList.remove('hide');
  } else if (target.value.includes('123')) {
    abc.classList.add('hide');
    n123.classList.remove('hide');
  }
}

//------- Product Info --------//

function productInfo() {
  let category, size;

  let cat = document.getElementById('category'),
    cat_type = cat.value;

  if (cat_type == 'none') {
    category = '';
    size = '';
  } else if (cat_type == 'fabric') {
    category = 'fabric';

    let length = document.getElementById('length');

    size = `${length.value}m`;
  } else if (cat_type == 'clothing') {
    category = 'clothing';

    let size_type = document.querySelector('input[name="sizeType"]:checked');

    if (size_type.value == 'abc') {
      let abc_size = document.querySelector('input[name="abc_size"]:checked');
      size = abc_size.value;
    } else {
      let n123_size = document.querySelector('input[name="n123_size"]:checked');
      size = n123_size.value;
    }
  } else if (cat_type == 'shoes') {
    category = 'shoes';

    let shoes_size = document.querySelector('input[name="shoes_size"]:checked');
    size = shoes_size.value;
  } else {
    let other_input = document.getElementById('other_input');
    let size_input = document.getElementById('size_input');

    category = other_input.value;
    size = size_input.value;
  }

  let entryDate = document.getElementById('entryDate');

  let product = {
    "name": name.value,
    "capital": capital.value,
    "price": price.value,
    "cont": cont.value,
    "category": category,
    "size": size,
    "entryDate":entryDate.value,

  };
  return product;
}

//------- Create New Product --------//

function create() {
  DataPro.push(productInfo());
  localStorage.DataPro = JSON.stringify(DataPro);
  clear();
  document.getElementById('create_product_blur').classList.add('hide');
  showStorage();
}

function newProduct() {
  submitMood = 'create';
  createPro.textContent = 'Create Product';

  let entryDate = document.getElementById('entryDate');
  console.log(entryDate)
  let date = new Date().toISOString().split('T')[0];

  entryDate.value = date;

  document.getElementById('create_product_blur').classList.remove('hide');
}

function cancelProduct() {
  document.getElementById('create_product_blur').classList.add('hide');
  clear();
}

//------ Clear Inputs ------//

function clear() {
  name.value = '';
  capital.value = '';
  price.value = '';
  cont.value = '';
  document.querySelector('option[value="none"]').selected = true;
  document.querySelector('#length').vlaue = '';
  document.querySelector('input[value="abc"]').checked = true;
  document.querySelector('input[value="s"]').checked = true;
  document.querySelector('input[value="40"]').checked = true;
  document.querySelector('#other_input').vlaue = '';
  document.querySelector('#size_input').vlaue = '';
  document.querySelector('.selectOptions').classList.add('hide');
}

function createProduct() {
  submitMood == 'create' ? create() : updatedProduct(updateThisProduct);
}

//----------------------------------------------------------------------//
//                          Show Products                               //
//----------------------------------------------------------------------//

//------ Show Products In Storage ------//

function showStorage(arry) {
  let tbody = document.querySelector('#products');
  tbody.innerHTML = '';

  arry == null ? (arry = DataPro) : null;

  for (let i = 0; i < arry.length; i++) {
    showData(i, arry[i], tbody);
  }
  showDeleteAllBtn();
}
showStorage(sortBy(DataPro));


//----------------------------------------------------------------------//
//                           Storage Search                             //
//----------------------------------------------------------------------//






//----------------------------------------------------------------------//
//                         Delete Products                              //
//----------------------------------------------------------------------//

//------ Show Delete All Button -------//

function showDeleteAllBtn() {
  if (DataPro.length < 1) {
    let btn = document.getElementById('dAllBtn');
    btn.style.display = 'none';
  } else {
    let btn = document.getElementById('dAllBtn');
    btn.classList.add('delete');
    btn.style.display = 'block';
    btn.innerHTML = `Delete All(${DataPro.length})`;
  }
}

//--------- Delete All Products -----------//

function deleteAll() {
  Confirm('Are You Sure You Need To Delete All Products?', 'Delete All').then(
    () => {
      DataPro.splice(0);
      localStorage.DataPro = JSON.stringify(DataPro);
      showStorage();
    }
  );
}

//----------- Delete Product -------------//

function deleteProduct(i) {
  Confirm('Are You Sure You Need To Delete This Product?', 'Delete').then(
    () => {
      DataPro.splice(i, 1);
      localStorage.DataPro = JSON.stringify(DataPro);
      showStorage();
    }
  );
}

//----------------------------------------------------------------------//
//                         Update Products                              //
//----------------------------------------------------------------------//

function updatedProductInfo(i) {
  submitMood = 'update';
  updateThisProduct = i;

  let updateWindow = document.getElementById('create_product_blur');
  updateWindow.classList.remove('hide');

  name.value = DataPro[i].name;
  price.value = DataPro[i].price;
  cont.value = DataPro[i].cont;
  createPro.textContent = 'Update';

  if (DataPro[i].category == 'fabric') {
    document.querySelector('option[value="fabric"]').selected = true;
    change('fabric');

    let length = document.getElementById('length');
    length.value = +DataPro[i].size.slice(0, -1);
  } else if (DataPro[i].category == 'clothing') {
    document.querySelector('option[value="clothing"]').selected = true;
    change('clothing');

    if (isNaN(+DataPro[i].size)) {
      document.querySelector('input[value="abc"').checked = true;
      sizeType();
      document.querySelector(`input[value="${DataPro[i].size}"`).checked = true;
    } else {
      document.querySelector('input[value="123"').checked = true;
      sizeType();
      document.querySelector(`input[value="${DataPro[i].size}"`).checked = true;
    }
  } else if (DataPro[i].category == 'shoes') {
    document.querySelector('option[value="shoes"]').selected = true;
    change('shoes');

    document.querySelector(`input[value="${DataPro[i].size}"`).checked = true;
  } else {
    document.querySelector('option[value="other"]').selected = true;
    change('other');

    document.getElementById('other_input').value = DataPro[i].category;
    document.getElementById('size_input').value = DataPro[i].size;
  }
}

function updatedProduct(product) {
  DataPro.splice(product, 1, productInfo());
  localStorage.DataPro = JSON.stringify(DataPro);
  clear();
  document.getElementById('create_product_blur').classList.add('hide');
  showStorage();
}

//-----------------------------------------------------------------------//
//                                 Sales                                 //
//-----------------------------------------------------------------------//

async function sold(i) {
  document.getElementById('soldWindow').classList.remove('hide');

  let h3 = document.querySelector('#soldwin h3');
  let soldPrice = document.getElementById('soldPrice');
  let soldCont = document.getElementById('soldCont');
  let earnings = document.getElementById('earnings');
  let resCont = document.getElementById('resCont');
  let soldDate = document.getElementById('soldDate');
  let date = new Date().toISOString().split('T')[0];

  h3.textContent = DataPro[i].name;

  soldPrice.value = DataPro[i].price;
  soldCont.value = 1;
  soldDate.value = date;

  earnCalc();
  contCalc();

  soldPrice.addEventListener('keyup', earnCalc);
  soldCont.addEventListener('keyup', contCalc);

  function earnCalc() {
    earnings.textContent = soldPrice.value - DataPro[i].capital;
    +earnings.textContent > 0
      ? (earnings.style.color = '#0f0')
      : (earnings.style.color = '#f00');
  }

  function contCalc() {
    resCont.textContent = DataPro[i].cont - soldCont.value;
  }

  await new Promise((resolve, reject) => {
    document.getElementById('soldConfirmBtn').onclick = () => {
      document.getElementById('soldWindow').classList.add('hide');
      resolve();
    };
    document.getElementById('soldCancelBtn').onclick = () => {
      document.getElementById('soldWindow').classList.add('hide');
      reject();
    };
  })
    .then(productSold)
    .catch(soldCancel);

  function productSold() {
    let product = {
      "name": DataPro[i].name,
      "capital": DataPro[i].capital,
      "price": soldPrice.value,
      "earnings": +earnings.textContent * +soldCont.value,
      "cont": soldCont.value,
      "category": DataPro[i].category,
      "size": DataPro[i].size,
      "entryDate": DataPro[i].entryDate,
      "soldDate": soldDate.value,
    };

    SoldPro.push(product);

    DataPro[i].cont = DataPro[i].cont - soldCont.value;
    DataPro[i].cont <= 0 && DataPro.splice(i, 1);

    localStorage.DataPro = JSON.stringify(DataPro);
    localStorage.SoldPro = JSON.stringify(SoldPro);

    soldCancel();
    showStorage();
  }
}

function soldCancel() {
  document.getElementById('soldPrice').value = '';
  document.getElementById('soldCont').value = '';
  document.getElementById('earnings').textContent = '';
  document.getElementById('resCont').textContent = '';
}
