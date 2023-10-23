// // function insertDownloadButton(bookData) {
// //   const existingButton = document.querySelector('.bookDetail__content--btn');

// //   if (existingButton) {
// //     const downloadButton = document.createElement('button');
// //     downloadButton.textContent = 'Download ' + bookData.name;

// //     existingButton.parentNode.insertBefore(downloadButton, existingButton.nextSibling);

// //     downloadButton.addEventListener('click', function () {
// //       const a = document.createElement('a');
// //       a.href = bookData.bookURL;
// //       a.download = bookData.name + '.' + bookData.filetype;
// //       a.style.display = 'none';
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //     });
// //   }
// // }

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'getBookData') {
//     const scriptElements = document.querySelectorAll('script[type="application/json"]');

//     for (const script of scriptElements) {
//       const extractedJSON = JSON.parse(script.textContent);
//       if (extractedJSON && extractedJSON.bookURL) {
//         const bookData = {
//           name: extractedJSON.bookName,
//           filetype: 'pdf', // Thay thế bằng kiểu tệp của sách
//           bookURL: extractedJSON.bookURL
//         };
//         sendResponse({ bookData });
//         return true;
//       }
//     }

//     sendResponse({});
//   }
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'init') {
//     init_btn();

//     sendResponse({});
//   }
// });


// const init_btn = () => {
//     const setValue = (name, address) => {
//       var myObj1 = document.querySelectorAll(
//         document.querySelector(
//           ".modal-body .modal-vat-container-input:nth-child(0) input"
//         )
//       );
  
//       var myObj2 = document.querySelectorAll(
//         "input.hrv-next-input.modal-vat-input"
//       )[1];
//       console.log('myObj1', myObj1);
//       console.log('myObj2', myObj2);
//       var keys1 = Object.getOwnPropertyNames(myObj1);
//       console.log('keys1', keys1);
//       var propsKey1 = keys1.find((key) => {
//         return key.startsWith("__reactInternalInstance$");
//       });
//       console.log('propsKey1', propsKey1);
//       myObj1[propsKey1].memoizedProps.value = name;
//       myObj1[propsKey1].memoizedProps.onChange({ target: { value: name } });
//       myObj1.dispatchEvent(new Event("blur"));
  
//       var keys2 = Object.keys(myObj2);
//       var propsKey2 = keys2.find((key) => {
//         return key.startsWith("__reactInternalInstance$");
//       });
//       myObj2[propsKey2].memoizedProps.value = address;
//       myObj2[propsKey2].memoizedProps.onChange({ target: { value: address } });
//       myObj2.dispatchEvent(new Event("blur"));
//     };
  
//     const setValueMST = async () => {
//       let current_mst = document.querySelectorAll(
//         ".modal-body .modal-vat-container-input input"
//       )[2].value;
//       let mst_info = await call_api(current_mst);
//       if (!mst_info.data) return;
//       let { name, id, address } = mst_info.data;
//       setValue(name, address);

//       // document.querySelector(
//       //   ".modal-body .modal-vat-container-input:nth-child(2) input"
//       // ).value = name;
//       // document.querySelector(
//       //   ".modal-body .modal-vat-container-input:nth-child(3) input"
//       // ).value = address;
//     };
  
//     const get_mst = () => {
//       const searchButton = document.getElementById("search-mst");
  
//       let mst_div = document.querySelectorAll(
//         ".modal-body .modal-vat-container-input"
//       )[2];
  
//       if (searchButton) {
//         searchButton.addEventListener("click", async function () {
//           await setValueMST();
//         });
//       }
  
//       mst_div.addEventListener("keypress", async function (e) {
//         if (e.key === "Enter" || e.key == 13) {
//           await setValueMST();
//         }
//       });
//     };
  
//     const call_api = async (mst = "") => {
//       const url = "https://api.vietqr.io/v2/business/" + mst.trim();
  
//       let req = await fetch(url, {
//         method: "GET",
//       });
//       console.log("API OK");
//       return req.json();
//     };
  
//     let btn_get_mst = document.createElement("button");
//     btn_get_mst.className = "l-button l-button-default l-button-md light nowrap";
//     btn_get_mst.style = "margin-top: 10px";
//     btn_get_mst.id = "search-mst";
//     btn_get_mst.innerText = "Tìm";
//     btn_get_mst.onclick = get_mst;
  
//     // let div_background_loading = document.createElement("div");
//     // div_background_loading.className = "background-loader";
//     // let div_loading = document.createElement("div");
//     // div_loading.className = "loader";
//     // div_background_loading.append(div_loading);
  
//     let check_popup_mst_open = setInterval(() => {
//       console.log("Finding VAT input div");
//       let mst_div = document.querySelectorAll(
//         ".modal-body .modal-vat-container-input"
//       )[2];
//       if (mst_div && btn_get_mst) {
//         mst_div.append(btn_get_mst);
//         get_mst();
//         clearInterval(check_popup_mst_open);
//       }
//     }, 500);
//   };

//   init_btn();