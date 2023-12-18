<script>
import { rate } from '$lib/data/helpers';

let ratingChanged = false;

function correctRatingOrder(inputRating) {
    rate(inputRating);
}

function changeRating(rating) {
    if (!ratingChanged) {
        for (let i = 5; i >= rating; i--) {
            const star = document.getElementById(`star${i}`);
            star.textContent = '★';
            star.style.color = 'gold';
        }
        ratingChanged = true;
    }
}

function ratingchanges() {
    const starclass = document.querySelector('.stars');
    const stirs = document.querySelectorAll('.stir');
    const exp = document.getElementById('exprnz');
    starclass.style.cursor = 'default';
    starclass.style.color = 'grey';
    // stirs.classList.remove('stir');
    stirs.forEach(stir => {
        stir.classList.remove('stir');
    });
    exp.innerHTML = 'Thank you for sharing your experience:';
}
</script>



<div class="star-rating">
    <div>
        <p id="exprnz">Rate the response:</p>
    </div>
    <div class="stars">
        <span
            id="star1"
            on:click={() => {
                changeRating(1), ratingchanges(), correctRatingOrder(5);
            }}
            class="star stir">☆</span
        >
        <span
            id="star2"
            on:click={() => {
                changeRating(2), ratingchanges(), correctRatingOrder(4);
            }}
            class="star stir">☆</span
        >
        <span
            id="star3"
            on:click={() => {
                changeRating(3), ratingchanges(), correctRatingOrder(3);
            }}
            class="star stir">☆</span
        >
        <span
            id="star4"
            on:click={() => {
                changeRating(4), ratingchanges(), correctRatingOrder(2);
            }}
            class="star stir">☆</span
        >
        <span
            id="star5"
            on:click={() => {
                changeRating(5), ratingchanges(), correctRatingOrder(1);
            }}
            class="star stir">☆</span
        >
    </div>
</div>

<style>
    .star-rating {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	.stars {
		color: #ccc;
		font-size: 24px;
		cursor: pointer;
		position: relative;
		top: 0.25em;
		display: flex;
		flex-direction: row-reverse;
	}

	.stir:hover,
	.stir:hover ~ .stir {
		color: gold;
	}

</style>
