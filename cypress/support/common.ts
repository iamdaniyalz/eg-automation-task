/// <reference types="Cypress" />

const appiFrame = "#courses-iframe";
const tryNowButton = ".detail__info .link";

class iFrame {
	getIframe() {
		return cy.iframe(appiFrame);
		//from custom commands
	}

	tryNow() {
		return tryNowButton;
	}
}
export { iFrame };
