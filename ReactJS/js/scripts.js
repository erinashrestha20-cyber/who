//step1: make element of all the id present in html
const tweetInput = document.getElementById("tweet-input");
const charCounter = document.getElementById("char-counter");
const postBtn = document.getElementById("post-btn");
const draftMsg = document.getElementById("draft-msg");
const clearBtn = document.getElementById("clear-btn");

const MAX_CHARS = 150;

tweetInput.addEventListener("keyup", function () {
    const currentLength = tweetInput.value.length;

    charCounter.textContent = currentLength + "/" + MAX_CHARS;

    //change color based on limit
    if (currentLength > MAX_CHARS) {
        // if length increase from 150
        charCounter.style.color = "#e74c3c";
        postBtn.disabled = true;
    } else if (currentLength === 0) {
        // if no text was written
        charCounter.style.color = "#2ecc71";
        postBtn.disabled = true;
    } else {
        // if text value is less than 150 and is not 0
        charCounter.style.color = "#2ecc71";
        postBtn.disabled = false;
    }
});

tweetInput.addEventListener("change", function () {

    if (tweetInput.value.length > 0) {
        draftMsg.textContent = "Draft Saved!";

        setTimeout(function () {
            draftMsg.textContent = "";
        }, 2000);
    }

});

postBtn.addEventListener("click", function () {
    const tweetText = tweetInput.value;

    alert("You posted:" + tweetText);

    tweetInput.value = "";
    charCounter.textContent = "0 /" + MAX_CHARS;
    charCounter.style.color = "#2ecc71";
    postBtn.disabled = true;
    draftMsg.textContent = "";
});

clearBtn.addEventListener("click", function () {

    // clear the input field
    tweetInput.value = "";

    // reset counter
    charCounter.textContent = "0/" + MAX_CHARS;

    // reset color
    charCounter.style.color = "#2ecc71";

    // disable post button again
    postBtn.disabled = true;

    // clear draft message
    draftMsg.textContent = "";

});

tweetInput.addEventListener("keyup", function () {

    const currentLength = tweetInput.value.length;

    charCounter.textContent = currentLength + "/" + MAX_CHARS;

    // enable/disable clear button
    if (currentLength === 0) {
        clearBtn.disabled = true;
    } else {
        clearBtn.disabled = false;
    }

});