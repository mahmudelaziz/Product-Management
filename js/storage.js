//---------------------------------------------------------------------//
//                        Global Scope Varibles                        //
//---------------------------------------------------------------------//

let searchMood = 'name',
  submitMood = 'create',
  updateThisProduct;

//---------------- Confirm Massig ----------------//

function confirm(confirmMassig, btnText) {
  const p = document.createElement('p');
  p.textContent = confirmMassig;

  const cancelConfirm = document.createElement('button');
  const deleteConfirm = document.createElement('button');
  cancelConfirm.id = 'cancelC';
  deleteConfirm.id = 'confirmC';
  cancelConfirm.textContent = 'Cancel';
  deleteConfirm.textContent = btnText;

  const confirmBtns = document.createElement('div');
  confirmBtns.classList.add('confirmBtns');
  confirmBtns.appendChild(cancelConfirm);
  confirmBtns.appendChild(deleteConfirm);

  const confirmWindow = document.createElement('div');
  confirmWindow.id = 'confirmWindow';
  confirmWindow.appendChild(p);
  confirmWindow.appendChild(confirmBtns);

  const confirm_blur = document.createElement('div');
  confirm_blur.id = 'confirm_blur';
  confirm_blur.appendChild(confirmWindow);

  return confirm_blur;
}

//----------------------------------------------------------------------//
//                   Create And Save New Products                       //
//----------------------------------------------------------------------//

let name = document.getElementById('name');
let price = document.getElementById('price');
let cont = document.getElementById('cont');
let submit = document.getElementById('submit');

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

  let product = {
    name: name.value,
    price: price.value,
    cont: cont.value,
    category: category,
    size: size,
  };  

  return product
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
  submit.textContent = 'Create Product';

  document.getElementById('create_product_blur').classList.remove('hide');
}

function cancelProduct() {
  document.getElementById('create_product_blur').classList.add('hide');
  showStorage();
  clear()
}

//------ Clear Inputs ------//

function clear() {
  name.value = '';
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

function submitEvent() {
  submitMood == 'create' ? create() : updatedProduct(updateThisProduct);
}

//----------------------------------------------------------------------//
//                          Show Products                               //
//----------------------------------------------------------------------//

function showData(i, product) {
  let tbody = document.querySelector('#products');

  tbody.innerHTML += `<tr>
  <td>${i + 1}</td>
  <td>${product.name}</td>
  <td>${product.price}</td>
  <td>${product.cont}</td>
  <td>${product.category}</td>
  <td>${product.size}</td>        
  <td><button id="update" onclick='updatedProductInfo(${i})'>update</button></td>
  <td><button class="delete" onclick='deleteProduct(${i})'>delete</button></td>
  </tr>`;
}

//------ Show Products In Storage ------//

function showStorage() {
  let tbody = document.querySelector('#products');

  tbody.innerHTML = '';
  for (let i = 0; i < DataPro.length; i++) {
    showData(i, DataPro[i]);
  }
  showDeleteAllBtn();
}

showStorage();

//------ Serch ------//

function search() {
  let productName = document.getElementById('searchInp').value;

  let tbody = document.querySelector('#products');
  tbody.innerHTML = '';

  for (let i = 0; i < DataPro.length; i++) {
    if (
      DataPro[i].name.includes(productName) ||
      DataPro[i].category.includes(productName)
    ) {
      showData(i, DataPro[i]);
    }
  }
  productName = '' && showStorage();
}

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

async function deleteAll() {
  let confirmWindow = confirm(
    'Are You Sure You Need To Delete This Product?',
    'Delete'
  );

  const container = document.querySelector('.container');
  container.appendChild(confirmWindow);

  await new Promise((resolve, reject) => {
    document.getElementById('confirmC').onclick = () => {
      resolve();
    };
    document.getElementById('cancelC').onclick = () => {
      reject();
    };
  })
    .then(() => {
      DataPro.splice(0);
      localStorage.DataPro = JSON.stringify(DataPro);
      showStorage();
      container.removeChild(confirmWindow);
    })
    .catch(() => {
      container.removeChild(confirmWindow);
    });
}

//----------- Delete Product -------------//

async function deleteProduct(i) {
  let confirmWindow = confirm(
    'Are You Sure You Need To Delete This Product?',
    'Delete'
  );

  const container = document.querySelector('.container');
  container.appendChild(confirmWindow);

  await new Promise((resolve, reject) => {
    document.getElementById('confirmC').onclick = () => {
      resolve();
    };
    document.getElementById('cancelC').onclick = () => {
      reject();
    };
  })
    .then(() => {
      DataPro.splice(i, 1);
      localStorage.DataPro = JSON.stringify(DataPro);
      showStorage();
      container.removeChild(confirmWindow);
    })
    .catch(() => {
      container.removeChild(confirmWindow);
    });
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
  submit.textContent = 'Update';

  if (DataPro[i].category == 'fabric') {

    document.querySelector('option[value="fabric"]').selected = true;
    change('fabric');
      
    let length = document.getElementById('length');
    length.value = +DataPro[i].size.slice(0,-1);

  } else if (DataPro[i].category == 'clothing') {

    document.querySelector('option[value="clothing"]').selected = true;
    change('clothing');

    if (isNaN(+DataPro[i].size)) {
      document.querySelector('input[value="abc"').checked = true;
      sizeType()
      document.querySelector(`input[value="${DataPro[i].size}"`).checked = true;
    } else {
      document.querySelector('input[value="123"').checked = true;
      sizeType()
      document.querySelector(`input[value="${DataPro[i].size}"`).checked = true;
    }
    
  } else if (DataPro[i].category == 'shoes') {
    document.querySelector('option[value="shoes"]').selected = true;
    change('shoes')

    document.querySelector(`input[value="${DataPro[i].size}"`).checked = true;

  } else {
    document.querySelector('option[value="other"]').selected = true;
    change('other')

    document.getElementById('other_input').value = DataPro[i].category;
    document.getElementById('size_input').value = DataPro[i].size;
  }
}

function updatedProduct(product) {
  DataPro.splice(product,1,productInfo());
  localStorage.DataPro = JSON.stringify(DataPro);
  clear();
  document.getElementById('create_product_blur').classList.add('hide');
  showStorage();
}