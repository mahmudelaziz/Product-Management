document.addEventListener('DOMContentLoaded', () => {
  let currentPage = location.pathname.split('/').pop();

  document.querySelectorAll('.nav-link').forEach((link) => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage == linkPage) {
      link.classList.add('active')
    }
  })
})

// #region Data Storage

let DataPro;
if (localStorage.DataPro != null) {
  DataPro = JSON.parse(localStorage.DataPro);
} else {
  DataPro = [];
}

let SoldPro;
if (localStorage.SoldPro != null) {
  SoldPro = JSON.parse(localStorage.SoldPro);
} else {
  SoldPro = [];
}
//#endregion

//----------------------------------------------------------------------//
// #region                       Show Data                              //
//----------------------------------------------------------------------//

function showData(id, product, theplaec) {
  let x, y;

  if (location.pathname.includes('sales')) {
    x = `<td class='text-green'>${product.earnings}</td>`;
    y = `  <td>${product.soldDate}</td>        
    <td><button class="delete red" onclick='deleteProduct(${id})'>delete</button></td>
    </tr>`;
  } else {
    x = '';
    y = `  <td><button class="sold green" onclick='sold(${id})'>sold</button></td>
    <td><button class="update blue" onclick='updatedProductInfo(${id})'>update</button></td>
    <td><button class="delete red" onclick='deleteProduct(${id})'>delete</button></td>
    </tr>`
  }

  theplaec.innerHTML += `<tr>
  <td>${id + 1}</td>
  <td>${product.name}</td>
  <td class='text-red'>${product.capital}</td>
  <td class='text-green'>${product.price}</td>
  ${x}
  <td>${product.cont}</td>
  <td>${product.category}</td>
  <td>${product.size}</td>
  <td>${product.entryDate}</td>
  ${y}`;
}
//#endregion
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
// #region                        Search                                //
//----------------------------------------------------------------------//

function search(arry,searchType,searchFor) {
  let outputs = [];
  for (let i = 0; i < arry.length; i++) {
    if (arry[i][searchType].includes(searchFor)) {
      outputs.push(arry[i])
    }
  }
  return outputs
}

function generalSearch() {
  let searchFor = document.getElementById('searchInp').value;

  let arry;

  if (location.pathname.includes('storage')) {
    showStorage(sortBy(DataPro));
  } else if (location.pathname.includes('sales')) {
    showStorage(sortBy(SoldPro));
  }
}

let searchMoodBtns = document.querySelectorAll('#searchByDiv button');
searchMoodBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    searchMoodBtns.forEach((Btns) => {
      Btns.classList.remove('selected');
    });
    btn.classList.add('selected');

    document.getElementById('searchInp').placeholder = `Search By ${btn.value}`;
    searchMood = btn.value;

    generalSearch();
  });
});
// #endregion
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
// #region                       Sort By                                //
//----------------------------------------------------------------------//

function sortBy(arry) {
  if (sortMood == 'name') {
    arry.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
  } else if (sortMood == 'capital') {
    arry.sort((a, b) => +a.capital - +b.capital);
  } else if (sortMood == 'price') {
    arry.sort((a, b) => +a.price - +b.price);
  } else if (sortMood == 'category') {
    arry.sort((a, b) => a.category.localeCompare(b.category, 'ar'));
  } else if (sortMood == 'size') {
    arry.sort((a, b) => +a.size - +b.size);
  }
  return arry;
}

let sortMoodBtns = document.querySelectorAll('#sortByDiv button');
sortMoodBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    sortMoodBtns.forEach((Btns) => {
      Btns.classList.remove('selected');
    });
    btn.classList.add('selected');

    sortMood = btn.value;

    generalSearch();
  });
});
//#endregion
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
// #region                       Earnings                               //
//----------------------------------------------------------------------//

let earningsMoodBtns = document.querySelectorAll('#earningsDiv button');
earningsMoodBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    earningsMoodBtns.forEach((Btns) => {
      Btns.classList.remove('selected');
    });
    btn.classList.add('selected');

    earningsMoodMood = btn.value;

    generalSearch();
  });
});




//#endregion
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
//#region                   Confirm Massig                              //
//----------------------------------------------------------------------//

async function Confirm(confirmMassig, btnText, confirmColor) {

  confirmMassig == null ? confirmMassig = "Are You Sure?":null;
  btnText == null ? btnText = "Confirm":null;
  confirmColor == null ? confirmColor = "red":null;

  const p = document.createElement('p');
  p.textContent = confirmMassig;

  const confirm = document.createElement('button');
  const cancel = document.createElement('button');
  confirm.id = 'confirmCM';
  cancel.id = 'cancelCM';
  confirm.textContent = btnText;
  cancel.textContent = 'Cancel';
  if (confirmColor == 'red') {
    confirm.classList.add('red')
    cancel.classList.add('green')
  }else{
    confirm.classList.add('green')
    cancel.classList.add('red')
  }

  const confirmBtns = document.createElement('div');
  confirmBtns.classList.add('confirmBtns');
  confirmBtns.appendChild(cancel);
  confirmBtns.appendChild(confirm);

  const confirmWin = document.createElement('div');
  confirmWin.classList.add('smal-window')
  confirmWin.appendChild(p);
  confirmWin.appendChild(confirmBtns);

  const confirmWindow = document.createElement('div');
  confirmWindow.classList.add('blur');
  confirmWindow.appendChild(confirmWin);

  const container = document.querySelector('.container');
  container.appendChild(confirmWindow);
  
  await new Promise((resolve) => {
    document.getElementById('confirmCM').onclick = () => {
      container.removeChild(confirmWindow)
      resolve();
    };
    document.getElementById('cancelCM').onclick = () => {
      container.removeChild(confirmWindow)
    }
  })
}
//#endregion
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
// #region                  Other Functions                             //
//----------------------------------------------------------------------//

function showBtns(id) {
  document.getElementById(id).classList.toggle('hide');
}
// #endregion
//----------------------------------------------------------------------//