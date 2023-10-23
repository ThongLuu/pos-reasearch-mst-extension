const init_btn = () => {
  // set value name and address
  const setValue = (name, address) => {
    var myObjName = document.querySelector(
      ".modal-body .modal-vat-container-input:nth-child(2) input"
    );

    var myObjAddress = document.querySelector(
      ".modal-body .modal-vat-container-input:nth-child(3) input"
    );
    var keys1 = Object.keys(myObjName);
    var propsKey1 = keys1.find((key) => {
      return key.startsWith("__reactInternalInstance$");
    });
    myObjName[propsKey1].memoizedProps.value = name;
    myObjName[propsKey1].memoizedProps.onChange({ target: { value: name } });
    myObjName.dispatchEvent(new Event("blur"));

    var keys2 = Object.keys(myObjAddress);
    var propsKey2 = keys2.find((key) => {
      return key.startsWith("__reactInternalInstance$");
    });
    myObjAddress[propsKey2].memoizedProps.value = address;
    myObjAddress[propsKey2].memoizedProps.onChange({
      target: { value: address },
    });
    myObjAddress.dispatchEvent(new Event("blur"));
  };

  // set value MST
  const setValueMST = async () => {
    let current_mst = document.querySelector(
      ".modal-body .modal-vat-container-input:nth-child(4) input"
    ).value;
    let modal = document.querySelectorAll(
      ".modal-body .modal-vat-container-input:nth-child(4)"
    );

    let mst_info = await call_api(current_mst);
    let check_is_error = document.getElementById("div-mst-noti-error");
    check_is_error.innerText = mst_info.desc;

    if (mst_info.code == "00") {
      check_is_error.innerText = "";
    }
    if (!mst_info.data) return;
    let { name, id, address } = mst_info.data;
    setValue(name, address);
  };

  //loading when get mst detail
  const loading_get_mst = async (mst_div) => {
    let div_background_loading = document.createElement("div");
    div_background_loading.className = "background-loader";
    let div_loading = document.createElement("div");
    div_loading.className = "loader";
    div_background_loading.append(div_loading);

    let mst_div_input = document.querySelector(
      ".modal-body .modal-vat-container-input:nth-child(4) input"
    );

    mst_div.append(div_background_loading);
    mst_div_input.disabled = true;
    await setValueMST();
    mst_div_input.disabled = false;
    mst_div.removeChild(div_background_loading);
    1;
  };

  //get MST detail
  const get_mst = () => {
    const searchButton = document.getElementById("search-mst");
    let mst_div = document.querySelector(
      ".modal-body .modal-vat-container-input:nth-child(4)"
    );

    if (searchButton) {
      searchButton.addEventListener("click", function () {
        loading_get_mst(mst_div);
        getCustomerInfo();
      });
    }

    mst_div.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key == 13) {
        loading_get_mst(mst_div);
        getCustomerInfo();
      }
    });
  };

  //call API find MST
  const call_api = async (mst = "") => {
    const url = "https://api.vietqr.io/v2/business/" + mst.trim();

    let req = await fetch(url, {
      method: "GET",
    });
    console.log("API OK");
    return req.json();
  };

  //get order detail
  const get_order_detail = async () => {
    const data = Object.keys(localStorage);
    const profileKey = data.find((key) => {
      return key.startsWith("oidc.user:https://accounts.haravan.com");
    });
    const token = JSON.parse(localStorage[profileKey]).access_token;

    const url =
      "https://commerce.haravan.com/api/orders/" +
      window.location.pathname.split("/")[2];
    let req = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return req.json();
  };

  //auto fill customer info
  const getCustomerInfo = async () => {
    const order = await get_order_detail();
    if (order.data && order.data.customerInfo) {
      const customer = order.data.customerInfo;
      var myObjCustomerEmail = document.querySelector(
        ".modal-body .modal-vat-container-input:nth-child(5) input"
      );
      var myObjCustomerName = document.querySelector(
        ".modal-body .modal-vat-container-input:nth-child(6) input"
      );
      var myObjCustomerPhone = document.querySelector(
        ".modal-body .modal-vat-container-input:nth-child(7) input"
      );

      var keys3 = Object.keys(myObjCustomerEmail);
      var propsKey3 = keys3.find((key) => {
        return key.startsWith("__reactInternalInstance$");
      });
      var keys4 = Object.keys(myObjCustomerName);
      var propsKey4 = keys4.find((key) => {
        return key.startsWith("__reactInternalInstance$");
      });

      var keys5 = Object.keys(myObjCustomerPhone);
      var propsKey5 = keys5.find((key) => {
        return key.startsWith("__reactInternalInstance$");
      });

      if (
        !myObjCustomerEmail[propsKey3].memoizedProps.value &&
        !myObjCustomerName[propsKey4].memoizedProps.value &&
        !myObjCustomerPhone[propsKey5].memoizedProps.value
      ) {
        myObjCustomerEmail[propsKey3].memoizedProps.value = customer.email;
        myObjCustomerEmail[propsKey3].memoizedProps.onChange({
          target: { value: customer.email },
        });
        myObjCustomerEmail.dispatchEvent(new Event("blur"));

        myObjCustomerName[propsKey4].memoizedProps.value = customer.fullname;
        myObjCustomerName[propsKey4].memoizedProps.onChange({
          target: { value: customer.fullname },
        });
        myObjCustomerName.dispatchEvent(new Event("blur"));

        myObjCustomerPhone[propsKey5].memoizedProps.value = customer.phone;
        myObjCustomerPhone[propsKey5].memoizedProps.onChange({
          target: { value: customer.phone },
        });
        myObjCustomerPhone.dispatchEvent(new Event("blur"));
      }
    }
  };

  //button search
  let btn_get_mst = document.createElement("button");
  btn_get_mst.className = "l-button l-button-default l-button-md light nowrap";
  btn_get_mst.style = "margin-top: 5px";
  btn_get_mst.id = "search-mst";
  btn_get_mst.innerText = "Tìm";
  btn_get_mst.onclick = get_mst;

  //div group input mst and button search
  let div_group_mst = document.createElement("div");
  div_group_mst.id = "div-group-search-mst";
  div_group_mst.style = "display: flex";

  //div notification when search mst fail
  let div_current_mst_error = document.createElement("div");
  div_current_mst_error.className = "vat-noti-text";
  div_current_mst_error.id = "div-mst-noti-error";

  // check modal show up
  const check_popup_modal_show = () => {
    console.log("Finding VAT input div");
    let mst_div = document.querySelector(
      ".modal-body .modal-vat-container-input:nth-child(4)"
    );
    const checkExistButton = document.getElementById("search-mst");
    let mst_input = document.querySelector(
      ".modal-body .modal-vat-container-input:nth-child(4) input"
    );
    if (mst_div && btn_get_mst && !checkExistButton) {
      div_group_mst.append(mst_input);
      div_group_mst.append(btn_get_mst);
      mst_div.append(div_group_mst);
      mst_div.append(div_current_mst_error);
      get_mst();
    } else {
      setTimeout(check_popup_modal_show, 500);
    }
  };

  //add notification when find product without sku
  const add_notification_no_sku = (index) => {
    let noti_product_sku_div = document.createElement("p");
    noti_product_sku_div.className = "product-sku-noti-text";
    noti_product_sku_div.innerText = "Sản phẩm không có SKU";

    let productListTable = document.getElementsByClassName("table-cart-list");
    noti_product_sku_div.id = "item-line " + index;
    let product_div =
      productListTable[0].childNodes[index].getElementsByClassName(
        "flex-stretch"
      );
    let check_noti_product_sku_div = document.getElementById(
      "item-line " + index
    );

    if (!check_noti_product_sku_div) {
      product_div[0].appendChild(noti_product_sku_div);
    }
  };

  //show quntity on hand in product line
  const show_quantity_on_hand = (product) => {

    // HTLM column quantity
    let quantity_on_hand_div = document.createElement("div");
    quantity_on_hand_div.className = "l-table--col-quantity";
    quantity_on_hand_div.id = "l-table--col-quantity-" + product.index;

    let quantity_on_hand_show_div = document.createElement("div");
    quantity_on_hand_show_div.className = "tbl-list-item";

    let quantity_on_hand_show_span = document.createElement("span");
    quantity_on_hand_show_span.innerHTML = product.item.qty_OnHand - product.item.qty_Commited;

    quantity_on_hand_div.append(quantity_on_hand_show_div);
    quantity_on_hand_show_div.append(quantity_on_hand_show_span);

    //check column quantity exist
    let check_quantity_on_hand_div = document.getElementById(
      "l-table--col-quantity-" + product.index
    );

    //generate column quantity
    document
      .querySelectorAll(".table-cart-list div .l-table--col-adjust")
      .forEach((elm, idx) => {
        console.log(check_quantity_on_hand_div);
        if (!check_quantity_on_hand_div && product.index == idx) {
          elm.after(quantity_on_hand_div);
        }
      });
  };

  //check product sku exist or not
  const check_product_sku = () => {
    console.log("Check product SKU");

    var myObjProductTableList = document.querySelector(".table-cart-list");
    if (myObjProductTableList) {
      var keys2 = Object.keys(myObjProductTableList);
      var propsKey2 = keys2.find((key) => {
        return key.startsWith("__reactInternalInstance$");
      });
      myObjProductTableList[propsKey2].memoizedProps.children.map((product) => {
        show_quantity_on_hand(product.props);
        if (!product.props.item.sku || product.props.item.sku.length == 0) {
          add_notification_no_sku(product.props.index);
        }
      });
    }

    setTimeout(check_product_sku, 500);
  };
  setTimeout(check_popup_modal_show, 500);
  setTimeout(check_product_sku, 500);
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const targetUrl_1 = "https://pos-ent-uat.haravan.app/orders/";
  const targetUrl_2 = "https://pos-ent-uat.haravan.app/";

  if (
    (tab.url &&
      tab.url.startsWith(targetUrl_1) &&
      changeInfo.status === "complete") ||
    (tab.url &&
      tab.url.startsWith(targetUrl_2) &&
      changeInfo.status === "complete")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: init_btn,
      world: "MAIN",
    });

    // chrome.runtime.sendMessage({ action: 'init' }, function (response) {

    // })
  }
});
