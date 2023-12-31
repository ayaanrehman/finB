<script>
document.getElementById("home").addEventListener("click", function() {
    // Redirect to the new HTML page
    window.location.href = "../index.html";
});

document.addEventListener('DOMContentLoaded', function () {
    const buttonsDiv = document.querySelector('.buttons');
    const sidbrDiv = document.querySelector('.sidbr');
    const cctnt = document.querySelector('.content-container');
    const sbb = document.getElementById('sbb');
    const sdpt = document.getElementById('sdpt');
    
    // Use a flag to track if the animation is in progress
    let animationInProgress = false;

    // Function to close the sidebar
    function closeSidebar() {
        if (!animationInProgress) {
            buttonsDiv.style.display = 'none';
            sidbrDiv.style.width = '2rem';
            cctnt.style.display = 'block';
            sdpt.style.display = 'none';
        }
    }

    function openSidebar() {
        if (!animationInProgress) {
            animationInProgress = true;
            setTimeout(function() {
                buttonsDiv.style.display = 'flex';
                animationInProgress = false; // Animation complete
            }, 500); // 500 milliseconds delay
            setTimeout(function() {
                sdpt.style.display = 'block';
                animationInProgress = false; // Animation complete
            }, 500); // 500 milliseconds delay
            sidbrDiv.style.width = '200px';
            cctnt.style.display = 'none';
        }
    }

    // Add mouseenter event listener to open the sidebar with transition
    sidbrDiv.addEventListener('mouseenter', openSidebar);

    // Add mouseleave event listener to close the sidebar
    sidbrDiv.addEventListener('mouseleave', closeSidebar);

    // Add mouseenter event listener to cctnt to close the sidebar
    cctnt.addEventListener('mouseenter', closeSidebar);

    // Add click event listener to the document body to close the sidebar
    document.body.addEventListener('click', function (event) {
        if (event.target !== sidbrDiv && event.target !== buttonsDiv) {
            closeSidebar();
        }
        else {
            openSidebar();
        }
    });

});



// Define a function to add a question and response to the chat history for a specific category

function addToChatHistory(category, question, response) {
    const chatHistory = document.getElementById(category + '-chat-history');
    const scrollToBottomButton = document.getElementById('scroll-to-bottom');


    // Function to scroll to the bottom of the chat history
    scrollToBottomButton.addEventListener('click', function() {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    });

    // Check if the chat history contains the placeholder message
    const placeholderMessage = chatHistory.querySelector('.message.placeholder');
    
    if (placeholderMessage) {
        // Remove the placeholder message if it exists
        chatHistory.removeChild(placeholderMessage);
    }

    // Create a new div element for the question
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('message');
    questionDiv.classList.add('question');
    questionDiv.textContent = question;

    // Create a new div element for the response
    const responseDiv = document.createElement('div');
    responseDiv.classList.add('message');
    responseDiv.classList.add('response');
    responseDiv.textContent = response;

    // Append the question and response to the chat history (bottom to top)
    chatHistory.insertBefore(responseDiv, chatHistory.firstChild);
    chatHistory.insertBefore(questionDiv, chatHistory.firstChild);

    // Scroll to the bottom of the chat history (initially)
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Get a reference to the clear button
    const clearChatButton = document.getElementById('clear-chat-button');

    // Add a click event listener to the clear button
    clearChatButton.addEventListener('click', function() {
        // Check if chatHistory exists
        if (chatHistory) {
            // Clear the chat history by setting its innerHTML to an empty string
            for (let i = 0; i < 100; i++) {
                // Your function or code to execute goes here
                chatHistory.removeChild(responseDiv);
                chatHistory.removeChild(questionDiv);
              }
        }
    });
}



// Modify the socket.on('receive_response') to add the response to the chat history
socket.on('receive_response', function(data) {
    const category = data.category;
    const response = data.response;


    // Check the category and update the corresponding HTML element
    if (category === 'hr') {
        addToChatHistory(category, '', response);
      
    } else if (category === 'finance') {
        addToChatHistory(category, '', response);
    } else if (category === 'sfmc') {
        addToChatHistory(category, '', response);
    } else {
        // Handle the case where the category is invalid or not recognized
        // console.log('Invalid category received:', category);
    }

    document.getElementById("loading-container").style.display = "none";

});

// Modify the submitQuestion() function to add the question to the chat history
function submitQuestion(category) {
   
    // const questionInput = document.getElementById(category + '-question');
    // const question = questionInput.value;

    // Check for an empty input field and display an error message
    const questionInput = document.getElementById(category + '-question');
    const question = questionInput.value.trim();
    
    if (question.length < 1) {
        alert('Please type something.');
        // Clear the input field
        questionInput.value = '';
    } else {

    // Add the question to the chat history
    addToChatHistory(category, question);
    
    socket.emit('submit_question', { category, question });
    
    // Clear the input field
    questionInput.value = '';

    document.getElementById("loading-container").style.display = "flex"; // Display it as a flex container
    }
}


// Use event delegation to handle the "Submit" button click

document.body.addEventListener('click', function(event) {

    if (event.target && event.target.classList.contains('hr-submit')) {
        const category = 'hr'; // Define the category for HR here
        submitQuestion(category);

    } else if (event.target && event.target.classList.contains('finance-submit')) {
        const category = 'finance'; // Define the category for Finance here
        submitQuestion(category);

    } else if (event.target && event.target.classList.contains('sfmc-submit')) {
        const category = 'sfmc'; // Define the category for SFMC here
        submitQuestion(category);
    }
});

// Handle Enter key press for each input field

document.body.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const category = event.target.id.split('-')[0]; // Extract category from input ID
        submitQuestion(category);
    }
});





</script>

<div class="chat">
    <h3 style="color: white;">ChatGPT Plus</h3>
    <div id="hr-chat-history" class="chat-history" readonly="readonly">
      <div class="message placeholder">
          <b>Welcome! Start writing a question...</b>
          <br>
          <p>Ask questions like:</p>
          <br>
          <i>"Brainstorm incentives for a customer loyalty program in a small bookstore"</i>
          <br>
          <i>"Suggest some codenames for a project introducing flexible work arrangements"</i>
          <br>
          <i>"Help me pick a birthday gift for my sister who likes gardening"</i>
          <br>
          <br>
          <br>
        </div>
        <button id="scroll-to-bottom">&#9660;</button>
    </div>
    
    
    <div class="input-container" id="hr-container">
        <input id="hr-question" class="input-box" type="text" placeholder="Enter your question to ChatGPT Plus">
        <button class="submit" data-type="hr">
    </button>
    <div id="loading-container">
      <div class="dot-flashing"></div>
    </div>
    <button id="clear-chat-button" class="clear-button">X</button>
    </div>
    </div>