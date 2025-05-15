// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Selecting DOM elements
  const form = document.getElementById("form");
  const convertButton = document.getElementById("convert-btn");
  const deleteButton = document.getElementById("delete-btn");
  const numberInput = document.getElementById("number");
  const output = document.getElementById("output");

  // Buttons for increasing/decreasing
  const increaseButton = document.querySelector(".counter__button--increase");
  const decreaseButton = document.querySelector(".counter__button--decrease");
  const increaseTenButton = document.querySelector(".counter__button--increase-ten");
  const decreaseTenButton = document.querySelector(".counter__button--decrease-ten");

  // 🛠 FIX: Ensure elements exist before adding event listeners
  if (!form || !convertButton || !deleteButton || !numberInput || !output) {
    console.error("One or more elements not found. Check your HTML IDs.");
    return;
  }

  // Function to update the input field
  const updateInputValue = (change) => {
    let currentValue = numberInput.value.trim(); // Get value, removing whitespace

    // Prevent changes when input is empty
    if (currentValue === "" && change < 0) return;

    let newValue = parseInt(currentValue, 10) || 0;
    newValue += change;

    if (newValue < 1) {
      newValue = 1; // Prevent values below 1
    } else if (newValue > 3999) {
      newValue = 3999; // Prevent values above 3999
    }

    numberInput.value = newValue;
  };

  // Attach event listeners to buttons
  increaseButton?.addEventListener("click", () => updateInputValue(1));
  decreaseButton?.addEventListener("click", () => updateInputValue(-1));
  increaseTenButton?.addEventListener("click", () => updateInputValue(10));
  decreaseTenButton?.addEventListener("click", () => updateInputValue(-10));

  // Delete button: Clears input and output
  deleteButton.addEventListener("click", () => {
    numberInput.value = ""; // Clear input field
    output.innerText = ""; // Clear output text
    output.classList.remove("alert", "hidden"); // Reset output styles
  });

  // ✅ FreeCodeCamp REQUIRED: Roman numeral conversion function
  function convertToRoman(num) {
    const ref = [
      ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
      ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
      ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]
    ];
    let res = "";

    ref.forEach(([roman, value]) => {
      while (num >= value) {
        res += roman;
        num -= value;
      }
    });

    return res;
  }

  // Input validation function
  const isValid = (numStr, num) => {
    let errText = "";

    if (!numStr || numStr.trim() === "" || isNaN(num)) {
      errText = "Please enter a valid number";
    } else if (num < 1) {
      errText = "Please enter a number greater than or equal to 1.";
    } else if (num > 3999) {
      errText = "Please enter a number less than or equal to 3999.";
    } else {
      return true; // ✅ No errors
    }

    // Display the error message
    output.innerText = errText;
    output.classList.add("alert");

    return false;
  };

  // Function to clear output message
  const clearOutput = () => {
    output.innerText = "";
    output.classList.remove("alert");
  };

  // Update UI function
  const updateUI = () => {
    const numStr = numberInput.value.trim(); // Remove any extra whitespace
    const int = parseInt(numStr, 10);

    output.classList.remove("hidden");
    clearOutput();

    // ✅ FreeCodeCamp REQUIREMENT: Show error when no input is entered
    if (!numStr) {
      output.innerText = "Please enter a valid number";
      output.classList.add("alert");
      return;
    }

    // Run validation and proceed only if valid
    if (isValid(numStr, int)) {
      output.innerText = convertToRoman(int);
    }
  };

  // Prevent default form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateUI();
  });

  // Convert button event
  convertButton.addEventListener("click", updateUI);
});
