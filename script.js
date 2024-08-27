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
            modalMessage.textContent = "Tèn tén ten tèn ten chúc ku sinh nhật vui vẻ nha 😁😁😁 Tuổi mới chúc ku đi tập chăm no excuse để nhanh dc physique mong muốn. Nghe a chỉ có ấm no suốt đời th, tin juan. Đi tập chăm còn gặp ng tốt như a ko thì đời chỉ toàn thg đạt rr th con ạ. Chúc tuổi mới tìm được thứ mình thích và kiên định với mục tiêu của bản thân. Chúc không bao giờ thấy cô đơn trc khó khăn gian khổ đắng cay cuộc đời. V nha chúc ku sức khỏe dồi dào an khang thịnh vượng đời đời ấm no. Tái bút, vĩnh bt see u again 👌✌👍";
            break;
        case 1:
            modalMessage.textContent = "Thì cũng là định viết dài rồi nhưng mà cậu lại khoe bọn em cậu viết dài rồi nên tớ ko thích viết nữa 😠 Nch thì cứ sống vui là được, hạnh phúc là được, đừng động phải thằng nào như Đạt là được :)) Nhưng mà cũng đừng quên có 3 thằng đã cố gắng làm sinh nhật cho cậu nhé. Bàn nhau lâu lắm đó. Năm sau mà còn chơi với nhau thì snhat t nhớ mua quà nhé, ko thích bánh đâu.";
            break;
        case 2:
            modalMessage.textContent = "Ựa lâu không nói chuyện mà giờ vẫn không biết nói gì^^ Thôi thì chúc tuổi mới mọi thứ tuyết vời vui vẻ hạnh phúc nha. Nghĩ mãi k ra gì nữa mong là thích con gấu bông😊";
            break;
        case 3:
            modalMessage.textContent = "Hello NNK nè!";
            break;
        case 4:
            modalMessage.textContent = "Hello NLinh nè!";
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

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

window.onload = function() {
    if (isMobileDevice()) {
        alert("This website can only be accessed on a laptop or desktop.");
        window.location.href = "https://www.youtube.com/watch?v=yoh-oXuR1-g";
    }
};