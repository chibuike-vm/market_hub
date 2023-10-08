"use strict";

const addIconArr = [...document.querySelectorAll(".add_icon_parent")];
const removeIconArr = [...document.querySelectorAll(".remove_icon_parent")];
const container = [...document.querySelectorAll(".toggle_display")];
const priceAndProdContainer = [...document.querySelectorAll(".price_and_name_container")];
let productPriceArr = [...document.querySelectorAll(".product_price")];
let productNameArr = [...document.querySelectorAll(".product_name")];
let goodsNameArr = [];
let goodsArr = [];

addIconArr.forEach(function(element) {
    element.addEventListener("click", function() {
        for (let i = 0; i < container.length; i++) {
            if (container[i].contains(element)) {
                container[i].classList.remove("toggle_display");
            } else {
              container[i].classList.add("toggle_display");
            }
        }
    });
});

for (let i = 0; i < addIconArr.length; i++) {
    goodsArr[i] = {};
    goodsArr[i].productTotalPrice = 0;
    goodsArr[i].counter = 0;
}

addIconArr.forEach(function(element) {
    element.addEventListener("click", function() {
        const shoppingDisplayMsg = document.querySelector(".shopping_display_msg");
        shoppingDisplayMsg.textContent = "Item added to the cart."

        for (let i = 0; i < container.length; i++) {
            if (container[i].contains(element) && priceAndProdContainer[i].contains(productPriceArr[i])) {
                goodsArr[i].productTotalPrice += (Number(productPriceArr[i].innerText.replace("#", "")));
                ++goodsArr[i].counter;
                goodsArr[i].productUnitPrice = productPriceArr[i].innerText.replace("#", "");
                goodsArr[i].productName  = `#${productNameArr[i].innerText.toLowerCase()}`;
            }
        }
    });
});
 
const shopping_cart = document.getElementById("shopping_cart");
shopping_cart.addEventListener("click", function () {
   for (const eachArrElement of goodsArr) {
        if (eachArrElement.counter !== 0) {
           let objStr = JSON.stringify(eachArrElement);
           localStorage.setItem(eachArrElement.productName, objStr);
        } else {
            localStorage.removeItem(eachArrElement.productName);
        }      
   }
});

addIconArr.forEach(function(element) {
    element.addEventListener("click", function() {
        const counterDisplayMsg = document.querySelectorAll(".counter");

        for (let i = 0; i < container.length; i++) {
            if (container[i].contains(element) && container[i].contains(counterDisplayMsg[i])) {
                counterDisplayMsg[i].textContent = goodsArr[i].counter;
            }
        }
    });
});

removeIconArr.forEach(function(element) {
    element.addEventListener("click", function() {
        const counterDisplayMsg = document.querySelectorAll(".counter");
        const shoppingDisplayMsg = document.querySelector(".shopping_display_msg");
        shoppingDisplayMsg.textContent = "Item removed from the cart."
       
        for (let i = 0; i < container.length; i++) {
            if (container[i].contains(element) && container[i].contains(counterDisplayMsg[i])) {
                if (goodsArr[i].counter > 0) {
                    counterDisplayMsg[i].textContent = --goodsArr[i].counter;
                }
            }
        }
    });
});

let tBodyChildNodes = "";
let tBody = document.getElementById("table_body");
let userGoodsArr = [];

for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith("#")) {
        let userGoods = JSON.parse(localStorage.getItem(localStorage.key(i)));

        userGoodsArr.push(userGoods);
    }
}

if (tBody !== null) {
    for (let i = 0; i < userGoodsArr.length; i++) {
        tBodyChildNodes += `<tr>
                                <td>${userGoodsArr[i].productName.replace("#", "")}</td>
                                <td>${userGoodsArr[i].productUnitPrice}</td>
                                <td>${userGoodsArr[i].counter}</td>
                                <td class="total_price">${userGoodsArr[i].productTotalPrice}</td>
                            </tr>`
    }

    tBody.innerHTML = tBodyChildNodes;
}

const totalPriceContainer = document.querySelectorAll(".total_price");

if (totalPriceContainer !== null) {
    let totalPrice = 0;

    totalPriceContainer.forEach(function(eachGoodTotalPrice) {
        totalPrice += Number(eachGoodTotalPrice.textContent);
    });

    
    const cumTotalPrice = document.getElementById("cum_total_price");
    if (cumTotalPrice !== null) {
       cumTotalPrice.textContent = totalPrice;
    }
}

const userName = document.getElementById("username");

if (userName !== null) {
   userName.innerHTML = `<strong>${setUsername()}</strong>`;
}

const paymentSectionButton = document.querySelector(".proceed_to_payment_button");

if (paymentSectionButton !== null) {
    paymentSectionButton.addEventListener("click", function() {
        alert("Sorry, the payment section has not been implemented yet." +"\n"
               + "As soon as its implemented, you will be the first to know."
               + "\n\nThank you for the testing exercise.");
    });
}