"use strict";

const addIconArr = [...document.querySelectorAll(".add_icon_parent")];
const container = [...document.querySelectorAll(".toggle_display")];

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



