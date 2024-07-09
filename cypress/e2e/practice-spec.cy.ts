import { Practice } from "../pages/practice";
import { iFrame } from "../support/common";

const practice = new Practice();
const iframe = new iFrame();

let mouseHoverOptions = ["Top", "Reload"];
let socialMediaLinks = [
	"https://www.facebook.com/easygenerator/",
	"https://twitter.com/easygenerator",
	"https://www.youtube.com/user/easygenerator"
];

beforeEach(() => {
	cy.fixture("testData.json").as("testData");
	cy.visit("/");
});

describe("Visit the localhost", () => {
	it("Verify practice page is loaded", () => {
		practice.elements.topbar().should("be.visible");
	});
});

describe("Topbar/header", () => {
	it("Logo is functional and navigates to EG website", function () {
		practice.clickOnEgLogo();
		cy.url().should("include", this.testData.egWebsite);
	});
	it("Home button is functional and navigates to EG website", function () {
		practice.clickOnHomeButton();
		cy.url().should("include", this.testData.egWebsite);
	});
});

describe("Dropdown", () => {
	it("Select an option and validate it is selected", function () {
		const dropdown = this.testData;
		practice.selectOptionFromDropdown(dropdown.dropdownOption);
		practice.elements.dropdown().should("have.value", dropdown.dropdownValue);
	});
});

describe("Image upload", () => {
	it("Upload a .png image and validate that it is uploaded", function () {
		cy.fixture("image.png", null).as("image"); //encoding is set to null so that file is not decoded as utf-8 string
		practice.elements.imageUpload().selectFile("@image");
		practice.elements.uploadedImage().should("be.visible");
	});
	it("Upload a .jpeg image and validate that it is uploaded", function () {
		cy.fixture("image.jpeg", null).as("image");
		practice.elements.imageUpload().selectFile("@image");
		practice.elements.uploadedImage().should("be.visible");
	});
	// it('Upload a .gif image and validate that it is not uploaded', function () {
	//   practice.elements.imageUpload().selectFile('cypress/fixtures/file.txt')
	//   practice.elements.uploadedImage().should('be.visible')
	// })
});

describe("Open new tab", () => {
	it("click on open new tab and validate the functionality", function () {
		cy.window().then((win) => {
			cy.stub(win, "open").as("newTab");
		});
		practice.elements.openNewTab().click();
		cy.get("@newTab").should("be.calledWith", "https://easygenerator.com", "_blank");
	});
});

describe("Invoke an alert/confirmation modal", () => {
	it("Enter name, click alert and verify the alert", function () {
		const data = this.testData;
		const stub = cy.stub();
		cy.on("window:alert", stub);
		cy.task("readFile", data.alertFile).then((text: string) => {
			practice.enterName(text);
		});
		practice.clickAlert().then(() => {
			expect(stub.getCall(0)).to.be.calledWith(data.alertText);
		});
	});
	it("Enter name, click confirm and then cancel from confirm box", function () {
		const data = this.testData;
		const stub = cy.stub();
		cy.on("window:confirm", stub); //default behaviour is true
		cy.task("readFile", data.alertFile).then((text: string) => {
			practice.enterName(text);
		});
		practice.clickConfirm().then(() => {
			expect(stub.getCall(0)).to.be.calledWith(data.confirmAlert);
		});
	});
	it("Enter name, click confirm and then cancel from confirm box", function () {
		const data = this.testData;
		const stub = cy.stub();
		cy.on("window:confirm", stub, false);
		cy.task("readFile", data.alertFile).then((text: string) => {
			practice.enterName(text);
		});
		practice.clickConfirm().then(() => {
			expect(stub.getCall(0)).to.be.calledWith(data.confirmAlert);
		});
	});
});

describe("Show/hide the input", () => {
	it("Text box is visible by default", function () {
		practice.elements.textBox().should("be.visible");
	});
	it("Click on hide and verify the text box is hidden", function () {
		practice.clickHideTextBoxButton();
		practice.elements.textBox().should("not.be.visible");
	});
	it("Click on show and verify the text box is visible", function () {
		practice.clickShowTextBoxButton();
		practice.elements.textBox().should("be.visible");
	});
	it("Input text in the text box, hide and show to validate the text is present ", function () {
		practice.inputText(this.testData.alertText);
		practice.clickHideTextBoxButton();
		practice.clickShowTextBoxButton();
		practice.elements
			.textBox()
			.invoke("val")
			.then((value: string) => {
				expect(value).to.eq(this.testData.alertText);
			});
	});
});

describe("Hover", () => {
	it("Hover mouse to show dropdown options", function () {
		practice.hoverMouseOverButton();
		practice.elements.onHoverDropdown().should("be.visible");
		practice.elements.onHoverDropdownOptions().each((option, index) => {
			const value = option.text();
			expect(value).to.equal(mouseHoverOptions[index]);
		});
	});
	it("Click Top and verify it scrolls to the top of the page", function () {
		practice.hoverMouseOverButton();
		practice.elements.onHoverDropdown().should("be.visible");
		practice.elements.onHoverDropdownOptions().contains(mouseHoverOptions[0]).click();
		cy.window().its("scrollY").should("equal", 0);
	});
	it("Click Reload and verify it scrolls to the top of the page", function () {
		cy.window().then((win: any) => {
			win.beforeReload = true;
		});
		cy.window().should("have.prop", "beforeReload", true);
		practice.hoverMouseOverButton();
		practice.elements.onHoverDropdown().should("be.visible");
		practice.elements.onHoverDropdownOptions().contains(mouseHoverOptions[1]).click();
		cy.window().should("not.have.prop", "beforeReload");
		cy.window().its("scrollY").should("equal", 0);
	});
});

describe("iFrame", () => {
	beforeEach(() => {
		cy.fixture("mockAPI.json").as("mockResponse");
	});
	it("Click on Try now for free and mock the API response", function () {
		cy.intercept("GET", "**/auth-pages-settings", { fixture: "mockAPI.json", statusCode: 404 }).as(
			"authPagesAPI"
		);
		iframe.getIframe().find(iframe.tryNow()).click({ force: true });
		cy.wait("@authPagesAPI");
	});
});

describe("Social Media", () => {
	it("Social media links are functional", function () {
		practice.elements.socialMediaLinks().each((link, index) => {
			practice.elements.socialMediaLinks().eq(index).then((link) => {
				cy.request(link.prop('href'))
			})

			//Another approach would be clicking on all links and navigating to the webpage, then go back.

			// practice.elements.socialMediaLinks().eq(index).invoke("attr", "target", "_self").click();
			// cy.url().should("equal", socialMediaLinks[index]);
			// cy.go("back");
		})
	});
});
