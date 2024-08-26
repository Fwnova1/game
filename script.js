document.addEventListener("keydown", moveCharacter);

const character = document.getElementById("character");

// Set initial position as percentages
let topPercentage = 50;
let leftPercentage = 50;

// Ensure the character starts in the correct position
updateCharacterPosition();

function moveCharacter(event) {
    const step = 2; // Adjust the step size as needed

    switch (event.key) {
        case "ArrowUp":
            topPercentage = Math.max(0, topPercentage - step); // Prevent moving out of bounds
            break;
        case "ArrowDown":
            topPercentage = Math.min(100, topPercentage + step);
            break;
        case "ArrowLeft":
            leftPercentage = Math.max(0, leftPercentage - step);
            break;
        case "ArrowRight":
            leftPercentage = Math.min(100, leftPercentage + step);
            break;
    }

    // Update the character's position
    updateCharacterPosition();

    checkCollision();
    checkInteraction(); // Check for NPC interaction after moving the character
}

function updateCharacterPosition() {
    character.style.top = `${topPercentage}%`;
    character.style.left = `${leftPercentage}%`;
}

// Function for checking collisions with candies (if still present)
function checkCollision() {
    const candies = document.querySelectorAll(".candy");

    candies.forEach(candy => {
        const candyRect = candy.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        if (
            characterRect.left < candyRect.left + candyRect.width &&
            characterRect.left + characterRect.width > candyRect.left &&
            characterRect.top < candyRect.top + candyRect.height &&
            characterRect.height + characterRect.top > candyRect.top
        ) {
            candy.style.display = "none";
            showModal("You found a candy!");
        }
    });
}

// Function for checking interactions with NPCs
function checkInteraction() {
    const npcs = document.querySelectorAll(".npc");

    npcs.forEach((npc, index) => {
        const npcRect = npc.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        if (
            characterRect.left < npcRect.left + npcRect.width &&
            characterRect.left + characterRect.width > npcRect.left &&
            characterRect.top < npcRect.top + npcRect.height &&
            characterRect.height + characterRect.top > npcRect.top
        ) {
            showMessage(index); // Show the message if there is a collision with an NPC
        }
    });
}

// Function to display different messages based on the NPC index
function showMessage(npcIndex) {
    const modalMessage = document.getElementById("modalMessage");

    switch (npcIndex) {
        case 0:
            modalMessage.textContent = "Hello! I'm NPC 1.";
            break;
        case 1:
            modalMessage.textContent = "Hi there! I'm NPC 2.";
            break;
        case 2:
            modalMessage.textContent = "Greetings! I'm NPC 3.";
            break;
    }

    showModal(modalMessage.textContent);
}

function showModal(message) {
    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("messageModal");
    modal.style.display = "none";
}

// On-screen button controls for mobile devices
document.addEventListener("DOMContentLoaded", () => {
    // Button event listeners
    document.getElementById("upButton").addEventListener("click", () => moveCharacterMobile("up"));
    document.getElementById("downButton").addEventListener("click", () => moveCharacterMobile("down"));
    document.getElementById("leftButton").addEventListener("click", () => moveCharacterMobile("left"));
    document.getElementById("rightButton").addEventListener("click", () => moveCharacterMobile("right"));
});

function moveCharacterMobile(direction) {
    const step = 2; // Adjust the step size as needed

    switch (direction) {
        case "up":
            topPercentage = Math.max(0, topPercentage - step); // Prevent moving out of bounds
            break;
        case "down":
            topPercentage = Math.min(100, topPercentage + step);
            break;
        case "left":
            leftPercentage = Math.max(0, leftPercentage - step);
            break;
        case "right":
            leftPercentage = Math.min(100, leftPercentage + step);
            break;
    }

    // Update the character's position
    updateCharacterPosition();

    checkCollision();
    checkInteraction(); // Check for NPC interaction after moving the character
}
