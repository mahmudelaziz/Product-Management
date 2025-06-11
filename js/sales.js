let searchMood = 'name',
  sortMood = 'name',
  earningsMood = 'all';
//-----------------------------------------------------------------------//
//                        Show Sold Products                             //
//-----------------------------------------------------------------------//

//------ Show Sold Products In Storage ------//

function showStorage(arry) {
  let tbody = document.querySelector('#products');
  tbody.innerHTML = '';

  arry == null ? (arry = SoldPro) : null;

  for (let i = 0; i < arry.length; i++) {
    showData(i, arry[i], tbody);
  }
}

showStorage();

//-----------------------------------------------------------------------//
//                       Delete Sold Products                            //
//-----------------------------------------------------------------------//

function deleteProduct(i) {
  Confirm('Are You Sure You Need To Delete This Product?', 'Delete').then(
    () => {
      SoldPro.splice(i, 1);
      localStorage.SoldPro = JSON.stringify(SoldPro);
      showStorage();
    }
  );
}

//------------------------------------------------------------------------//
//                                Earnings                                //
//------------------------------------------------------------------------//

function getAllEarnings() {
  let earnings = 0;
  for (let product of SoldPro) {
    earnings += +product.earnings;
  }
  return earnings;
}
document.getElementById('allEarn').textContent = getAllEarnings();

function getEarnings(startDate, endDate) {
  let earnings = 0;
  for (let product of SoldPro) {
    let x = product.soldDate.split('-');
    let y = +`${x[0]}${x[1]}${x[2]}`;

    let st = startDate.split('-');
    let start = +`${st[0]}${st[1]}${st[2]}`;

    en = endDate.split('-');
    let end = +`${en[0]}${en[1]}${en[2]}`;

    if (y >= start && y <= end) {
      earnings += +product.capital;
      console.log(product.soldDate)
    }
  }
  return earnings;
}


function todayEarnings() {
  let date = new Date().toISOString().split('T')[0];
  return getEarnings(date,date)
}

function yesterdayEarnings() {
}
let date = new Date()
da