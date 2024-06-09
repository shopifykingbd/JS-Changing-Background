document.addEventListener('DOMContentLoaded', function () {
    const btnChangeColor = document.getElementById('skbColorBtn');

    function randomNumber(n) {
        return Math.floor(Math.random() * n);
    }

    function hexString(n) {
        return n.toString(16).padStart(2, '0');
        /*
            toString(16) method converts each number to its hexadecimal representation but does not pad single-digit results with a leading zero. Therefore, if any of the RGB components are less than 16, their hexadecimal representation will be a single digit, causing the final hexadecimal string to be shorter than six characters. To fix this by ensuring that each component is always two digits long I'm using the padStart method. 
            Example: 
            let hex1 = 'f'; // single-digit hex value
            let paddedHex1 = hex1.padStart(2, '0'); // paddedHex1 will be '0f'
        */
    }

    btnChangeColor.addEventListener('click', function () {
        // Updated to 256 to include 255 as a possible value
        const r = randomNumber(256);
        const g = randomNumber(256);
        const b = randomNumber(256);

        // Hexadecimal code from r, g, b

        let HexValue = ('#' + hexString(r) + hexString(g) + hexString(b)).trim().toUpperCase();

        // Targeting input box  
        const inputBox = document.getElementById('colorInput');

        // Showing Hex code into input box
        inputBox.value = HexValue;

        // Updating body background color
        document.body.style.backgroundColor = HexValue;

        // Remove Copied Div for each time 'btnChangeColor' button click
        const removedElement = document.getElementById('copiedDiv');
        if (removedElement) {
            removedElement.remove();
        }
    });



    // Changing svg for copyBtn
    document.getElementById('copyBtn').addEventListener('click', function () {
        const button = this;
        const inputBoxValue = document.getElementById('colorInput').value;

        // Copying input value after clicking id="copyBtn"
        navigator.clipboard.writeText(inputBoxValue)

        generateToastMessage(`${inputBoxValue} copied`);

        // Original SVG
        const originalSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>`;

        // New SVG
        const newSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>`;


        // Adding new svg 
        button.innerHTML = newSVG;

        // change svg after the animation ends
        setTimeout(() => {
            button.innerHTML = originalSVG;
        }, 700); // Match the duration of the animation
    });



    // Show copied message at Front-end
    function generateToastMessage(message) {
        const div = document.createElement('div');
        div.innerText = message;
        div.id = 'copiedDiv';
        div.classList.add('fixed', 'top-1/2', 'transform', '-translate-y-1/2', '-translate-y-28', 'drop-shadow-lg', 'text-white', 'px-4', 'py-2', 'rounded', 'shadow');

        document.body.appendChild(div);

        const elementToRemove = document.getElementById('copiedDiv');
        elementToRemove.style.opacity = '1';

        // Gradually Decrease opacity
        function fadeOut(element) {
            let opacity = 1;
            const interval = setInterval(() => {
                opacity -= 0.1; // Decrease opacity by 0.1 in each step
                element.style.opacity = opacity.toString();
                if (opacity <= 0) {
                    clearInterval(interval);
                    //Remove the element from the DOM
                    element.remove();
                }
            }, 50); // Adjust the duration for smoother of faster animation
        }

        // Call the fadeOut function after a delay
        setTimeout(() => {
            fadeOut(elementToRemove);
        }, 700);
    }


    const colorInput = document.getElementById('colorInput');
    colorInput.value = inputValidation(colorInput.value)


    // Custom hexacode background feature
    colorInput.addEventListener('keyup', function (event) {
        const input = event.target.value;
        const validInput = inputValidation(input);
        document.body.style.backgroundColor = validInput;
    });


    // Prevent removing # from the input box
    colorInput.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && colorInput.selectionStart === 1) {
            event.preventDefault();
        }
    });



    // Event listener for double-click selection
    colorInput.addEventListener('select', function (event) {
        // Check if the entire input text is selected
        if (colorInput.selectionStart === 0 && colorInput.selectionEnd === colorInput.value.length) {
            // Adjust the selection to exclude the first character
            colorInput.setSelectionRange(1, colorInput.value.length);
        }
    });
    // When clicked outside the input box
    document.addEventListener('click', function (event) {
        if (!colorInput.contains(event.target)) {
            colorInput.value = inputValidation(colorInput.value)
        }
    });


    // Validating input value
    function inputValidation(input) {
        // Remove all non-hexadecimal characters and the '#' symbol
        input = input.replace(/[^0-9A-Fa-f]/gi, '').trim();

        // Limit the input length to 6 or 3 characters
        if (input.length > 6) {
            input = input.slice(0, 6);
        } else if (input.length >= 3 && input.length < 6) {
            input = input.slice(0, 3);
        }

        return `#${input}`;
    }


});