<script>
import { chatpage } from '$lib/stores/global.js';
import { searchBox } from '$lib/stores/global.js';




  let buttons = [
    { name: "RAG", icon: "rag-icon", link: "/" },
    { name: "ChatGPT", icon: "chatgpt-icon", link: "/chatgpt-plus" },
    { name: "Zapier", icon: "zapier-icon" },
    { name: "API Access", icon: "api-access-icon" },
    { name: "Support", icon: "support-icon" },
    { name: "About Us", icon: "aboutus-icon" },
  ];
  let activeButton = null;
</script>



<div class="sidebar">
  <!-- {#each buttons as button} -->
    <div>
      <a href="/chatgpt-plus">
        <div class="icon"></div>
        <div class="tag">CHATGPT PLUS</div>
       </a>
    </div>
    
  <!-- {/each} -->
</div>


<style>
    .sidebar {
      width: 3em;
      background-color: rgb(26, 26, 26);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 20px;
      padding-left: 0.5em;
      padding-right: 0.5em;
      /* height: 100vh; */
    }
  
    .button {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      background-color: #992d2d00;
      width: 50px;
      height: 50px;
      padding: 10px;
      margin: 5px;
      transition: background-color 0.3s ease;
        position: relative;
    }

    .line {
    width: 100%;
    height: 1px;
    background-color: grey;
    margin: 10px 0;
    }

    .button:nth-child(3)::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: rgb(56, 56, 56);
    margin: 10px 0;
  }
  
    .icon {
      width: 30px;
      height: 30px;
      background-color: #ccc;
      border-radius: 50%;
      margin-bottom: 5px;
      /* Add a transition for smooth color change */
      transition: background-color 0.3s ease;
  
      
    }
  
    .tag {
      display: none;
      background-color: #000000;
      color: #fff;
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      margin-left: 10em;
      top: 0em;
      z-index: 2;
    }
  
    .tag {
    position: relative;
    /* rest of your styles */
  }
  
  .tag::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px; /* Adjust this value to position the arrow correctly */
    transform: translateY(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent #000000 transparent transparent;
  }
  
  .button:hover {
      background-color: #3d3d3d;
  }
  
  .button:hover .tag {
  display: block;
  }
  
  
  
  </style>