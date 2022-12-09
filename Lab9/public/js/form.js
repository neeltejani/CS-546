(function () {
    function palindrome(findElementValue) {
        for (let i = 0; i < Math.floor(findElementValue.length / 2); i++) {
            if (
                findElementValue[i] !=
                findElementValue[findElementValue.length - 1 - i]
            ) {
                return false;
            }
        }
        return true;
    }
    const term = document.getElementById("__id");

    if (term) {
        const findElement = document.getElementById("enteredtext");

        term.addEventListener("submit", (event) => {
            console.log("Clicked");
            event.preventDefault();

            try {
                
                const findElementValue = findElement.value;
                const ol = document.getElementById("attempts");
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(findElementValue));
                Aelement = findElementValue.replace(/[^a-zA-Z0-9]/g, "");
                Lelement = Aelement.toLowerCase().split(" ").join("");
                if (Lelement.trim().length == 0) {
                    alert("Enter any Input ");
                    return;
                }
                if (palindrome(Lelement)) {
                    li.classList.add("is-palindrome");
                } else {
                    li.classList.add("not-palindrome");
                }
                ol.appendChild(li);
            } catch (e) {
                console.log(e.message);
            }
        });
    }
})();
