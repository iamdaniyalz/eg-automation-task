class Practice {
	elements = {
		topbar: () => cy.get("[data-test-id='eg-practice-page-topbar']"), //Injected data-test-id in the task.html to create a better selector
		egLogo: () => cy.get("a[href='https://easygenerator.com/'] svg"),
		homeButton: () => cy.get("a[href='https://easygenerator.com/'] button"),
		dropdown: () => cy.get("[id='dropdown-class-example']"),
		imageUpload: () => cy.get("input[type=file]"),
		uploadedImage: () => cy.get(".image-upload-wrapper img[src]"),
		openNewTab: () => cy.get("[id='opentab']"),
		nameField: () => cy.get("[id='name']"),
		alertButton: () => cy.get("[id='alertbtn']"),
		confirmButton: () => cy.get("[id='confirmbtn']"),
		hideTextBoxButton: () => cy.get("[id='hide-textbox']"),
		showTextBoxButton: () => cy.get("[id='show-textbox']"),
		textBox: () => cy.get("[id='displayed-text']"),
		mouseHoverButton: () => cy.get(".hover-container"),
		onHoverDropdown: () => cy.get(".hover-container .hovered"),
		onHoverDropdownOptions: () => cy.get(".hover-container .hovered a"),
		socialMediaLinks: () => cy.get("#gf-BIG li a")
	};

	clickOnEgLogo() {
		return this.elements.egLogo().click();
	}

	clickOnHomeButton() {
		return this.elements.homeButton().click();
	}

	selectOptionFromDropdown(option: string) {
		return this.elements.dropdown().select(option);
	}

	enterName(name: string) {
		return this.elements.nameField().type(name);
	}

	clickAlert() {
		return this.elements.alertButton().click();
	}

	clickConfirm() {
		return this.elements.confirmButton().click();
	}

	inputText(text: string) {
		return this.elements.textBox().type(text);
	}

	clickHideTextBoxButton() {
		return this.elements.hideTextBoxButton().click();
	}

	clickShowTextBoxButton() {
		return this.elements.showTextBoxButton().click();
	}

	hoverMouseOverButton() {
		return this.elements.mouseHoverButton().trigger("mouseover");
	}
}

export { Practice };
