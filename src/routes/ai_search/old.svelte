<div class="input-container" id="question-container">
  <div class="containerarrow">
		<div class="horizontal-line2" />
		<div class="vertical-line2" />
		<div class="arrowhead2" />
	</div>
  <div class="qtn">
	<input id="question" class="input-box" type="text" placeholder="Talk to your documents..." />
	<button class="submit" data-type="qsubmit" />
</div>


	<div class="containerarrow">
		<div class="horizontal-line" />
		<div class="vertical-line" />
		<div class="arrowhead" />
	</div>

	<div id="loading-container">
		<div class="dot-flashing" />
	</div>
</div>
<div style="position:relative">
  <div id="ref" class="ref" readonly="readonly">
    <div>
        <b>Reference</b>
        <br>
        <p>Here you will find reference from your documents</p>

      </div>
  </div>
  <div id="response" class="response" readonly="readonly">
    <div>
        <b>Response</b>
        <br>
        <p>Here you will find response for your question.</p>

      </div>
  </div>
</div>
<div class="suggestion">
	<button>Plot a pie-chart</button>
	<button>Calculate the median and mean</button>
	<button>Forecast for the next two years</button>
</div>

<style>
	@keyframes lineAnimation {
		0% {
			width: 0;
		}

		100% {
			width: 50px;
		}
	}

  @keyframes lineAnimation2 {
    0% {
        width: 0;
        right: 0;
    }
    100% {
        width: 100px;
        right: 0;
    }

	}

	@keyframes verticalLineAnimation {
		0% {
			height: 0;
			top: 0;
		}
		50% {
			height: 0px;
			top: 0;
		}
		100% {
			height: 50px;
			top: 0;
		}
	}

  @keyframes verticalLineAnimation2 {
		0% {
			height: 0;
			top: 0;
		}
		50% {
			height: 0px;
			top: 0;
		}
		100% {
			height: 100px;
			top: 0;
		}
	}

	@keyframes arrowheadAnimation {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0;
		}
		60% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}

	.containerarrow {
		position: relative;
		margin-top: 2em;
		width: 50px;
		height: 50px;
	}

	.horizontal-line {
		position: absolute;
		width: 50px;
    left: 10px;
		height: 2px;
		background-color: white;
		animation: lineAnimation 0.5s linear;
	}

	.vertical-line {
		position: absolute;
		width: 2px;
		height: 50px;
		top: 0;
		left: 60px;
		background-color: white;
		animation: verticalLineAnimation 1s linear;
	}

  .horizontal-line2 {
		position: absolute;
		width: 100px;
		height: 2px;
    right: 0px;
		background-color: white;
		animation: lineAnimation2 0.5s linear;
	}

	.vertical-line2 {
		position: absolute;
		width: 2px;
		height: 100px;
		top: 0;
		right: 100px;
		background-color: white;
		animation: verticalLineAnimation2 1s linear;
	}

  .arrowhead2 {
		position: absolute;
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 30px solid white;
		top: 100px;
		right: 86px;
		animation: arrowheadAnimation 2s linear;
	}

	.arrowhead {
		position: absolute;
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		border-top: 30px solid white;
		top: 50px;
		left: 46px;
		animation: arrowheadAnimation 2s linear;
	}
</style>
