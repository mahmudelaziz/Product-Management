let searchMood = 'name',
  sortMood = 'name';
//-----------------------------------------------------------------------//
//                        Show Sold Products                             //
//-----------------------------------------------------------------------//

//------ Show Sold Products In Storage ------//

function showStorage(arry) {
  let tbody = document.querySelector('#products');
  tbody.innerHTML = '';

  arry == null ? arry = SoldPro : null;

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

function allEarn(){
  let earnings = 0;
  for (let product of SoldPro) {
    earnings += +product.earnings
  }
  return earnings
}
document.getElementById('allEarn').textContent = allEarn();