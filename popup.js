// document.addEventListener("DOMContentLoaded", function () {
//   const searchButton = document.getElementById("search-mst");
//   console.log(searchButton)

//   if(searchButton){
//     searchButton.addEventListener("click", async function () {
//       let current_mst = document.querySelectorAll(
//         ".modal-body .modal-vat-container-input input"
//       )[2].value;
//       let mst_info = await call_api(current_mst);
//       if (!mst_info.data) return;
//       let { name, id, address } = mst_info.data;
//       document.querySelector(
//         ".modal-body .modal-vat-container-input:nth-child(2) input"
//       ).value = name;
//       document.querySelector(
//         ".modal-body .modal-vat-container-input:nth-child(3) input"
//       ).value = address;
//       console.log(mst_info);
//     });
//   }
// });

// const call_api = async (mst) => {
//   const url = "https://api.vietqr.io/v2/business/" + mst;

//   let req = await fetch(url, {
//     method: "GET",
//   });
//   console.log("API OK");
//   return req.json();
// };
