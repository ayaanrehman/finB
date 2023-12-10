<script>
import { buttonName } from '$lib/stores/global.js';

</script>

<link
	href="https://www.dafontfree.net/embed/bGVlbGF3YWRlZS11aS1zZW1pbGlnaHQtbm9ybWFsJmRhdGEvNDkvbC8zODUxMi9MZWVsVUlzbC50dGY"
	rel="stylesheet"
	type="text/css"
/>

<header>
	<div class="overlay-header">
  <div class="header-container">
    <div class="vline"></div>
	<a href="/">
		<img
			src="/images/finblade.png"
			alt="Company Logo"
			class="logo"
			width="auto"
			height="60em"
		/>
	</a>
  <span>{$buttonName}</span>

 
</div>
  </div>
 
 
	<hr class="header-line" />
</header>

<style>

  span {
    color: white;
    left: 1em;
    bottom: 1em;
    margin: 0.5em;
    position: absolute;
    font-weight: bold;
  }

  .header-container {
    display: flex;
    flex-direction: row;
    grid-template-rows: auto auto;
    justify-content: right;
    align-items: center;
    padding: 0.5em;
    max-height: 4.5em;
  }

  .vline {
    width: 1px;
    height: 5em;
    margin-right: 1em;
    /*background-color: #8a8a8a;*/
    background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #c5c5c5,
    rgba(0, 0, 0, 0)
    );
  }


</style>
