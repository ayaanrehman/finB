<h4 style="margin-left: 3em;">Coming Soon</h4>

<!-- <h4 style="margin-left: 3em;">Coming Soon</h4>

<script>
	import { onMount } from 'svelte';

	let rotation = 0;
	onMount(() => {
		const container = document.getElementById('searchBoxContainer');
		const lever = document.getElementById('lever');

		lever.addEventListener('click', () => {
			rotation += 120;
			container.style.transform = `rotateX(${rotation}deg)`;
			lever.style.transform = `rotate(${rotation}deg)`;
		});
	});
</script>

<div class="srchlvr">
	<div id="searchBoxContainer">
		<input type="search" id="searchBox1" class="searchBox" style="background-color: red;" />
		<input type="search" id="searchBox2" class="searchBox" style="background-color: blue;" />
		<input type="search" id="searchBox3" class="searchBox" style="background-color: green;" />
	</div>
	<div class="lever">
		<button id="lever">
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
			<span />
		</button>
	</div>
</div>

<style>
	.srchlvr {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		gap: 10px;
		/* height: 100vh; */
	}

	.lever {
		transform: scale(0.6);
		/* margin: auto; */
	}

	#searchBoxContainer {
		perspective: 1000px;
		transform-style: preserve-3d;
		transition: transform 1s;
		height: 30px;
		width: 200px;
		/* margin: auto; */
	}

	.searchBox {
		position: absolute;
		width: 100%;
		height: 100%;
		line-height: 30px;
		border: none;
		color: white;
		text-align: center;
	}

	#searchBox1 {
		transform: rotateX(0deg) translateZ(45px);
	}

	#searchBox2 {
		transform: rotateX(120deg) translateZ(45px);
	}

	#searchBox3 {
		transform: rotateX(240deg) translateZ(45px);
	}

	#lever {
		display: block;
		margin: 20px auto;
		transition: transform 1s;
		height: 80px;
		width: 80px;
		border-radius: 50%;
		border: 16px solid #ad753d; /* Dark brown color for the wheel */
		box-sizing: border-box;
		position: relative;
		cursor: grabbing;
		background: radial-gradient(circle, #ad753d 35%, transparent 40%, #ad753d 40%);
	}

	#lever span:nth-child(n)::before {
		content: '';
		position: absolute;
		height: 30px;
		width: 2px;
		background: #ad753d;
		top: 50%;
		left: 50%;
		transform-origin: 50% 0;
	}

	#lever span:nth-child(1)::before {
		transform: rotate(0deg) translate(0, -50px);
	}
	#lever span:nth-child(2)::before {
		transform: rotate(45deg) translate(0, -50px);
	}
	#lever span:nth-child(3)::before {
		transform: rotate(90deg) translate(0, -50px);
	}
	#lever span:nth-child(4)::before {
		transform: rotate(135deg) translate(0, -50px);
	}
	#lever span:nth-child(5)::before {
		transform: rotate(180deg) translate(0, -50px);
	}
	#lever span:nth-child(6)::before {
		transform: rotate(225deg) translate(0, -50px);
	}
	#lever span:nth-child(7)::before {
		transform: rotate(270deg) translate(0, -50px);
	}
	#lever span:nth-child(8)::before {
		transform: rotate(315deg) translate(0, -50px);
	}
</style> -->
