Vue.createApp({
	template: `
    <form class="form">
        <div class="form__body">
            <div class="input-group grid" id="slider-group">
                <h3 id="amount">{{formattedAmount}} Pageviews</h3>

                <input id="slider" type="range" min="10" max="1000" step="10" list="slider-list" v-model="amount" ref="slider" />

                <datalist id="slider-list">
                    <option v-for="(threshold, index) in thresholds" :key="index" :value="threshold.value"></option>
                </datalist>

                <h3 id="rate"><span>\${{rate}}.00</span>&nbsp;/ month</h3>
            </div>

            <div class="input-group" id="billing-group">
                <label class="billing-option">Monthly Billing</label>

                <input type="checkbox" name="billing" id="billing" v-model="annually" />
                <label class="toggle" for="billing"></label>

                <label class="billing-option" data-discount-amount="25">Yearly Billing</label>
            </div>
        </div>

        <div class="form__footer">
            <ul>
                <li>Unlimited websites</li>
                <li>100% data ownership</li>
                <li>Email reports</li>
            </ul>

            <button class="btn-submit" type="submit">Start my trial</button>
        </div>
    </form>
    `,

	data() {
		return {
			amount: 500,

			thresholds: [
				{ value: 10, rate: 8 },
				{ value: 50, rate: 12 },
				{ value: 100, rate: 16 },
				{ value: 500, rate: 24 },
				{ value: 1000, rate: 36 },
			],

			annually: false,
			discount: 0.25,
		};
	},

	computed: {
		rate() {
			let finalRate = 0;

			// Set rate
			this.thresholds.forEach((threshold) => this.amount >= threshold.value && (finalRate = threshold.rate));

			// Apply discount
			if (this.annually) finalRate *= 1 - this.discount;

			return finalRate;
		},

		formattedAmount() {
			return this.amount < 1000 ? `${this.amount}K` : `${this.amount[0]}M`;
		},

		progress() {
			return `${Math.round((this.amount / this.thresholds[this.thresholds.length - 1].value) * 100)}%`;
		},
	},
	watch: {
		progress() {
			requestAnimationFrame(() => this.$refs.slider.style.setProperty('--progress', this.progress));
		},
	},
}).mount('#form-container');
