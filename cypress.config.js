import { defineConfig } from "cypress";
import fs from "fs";

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			on("task", {
				readFile(filename) {
					if (fs.existsSync(filename)) {
						return fs.readFileSync(filename, "utf8");
					}

					return null;
				}
			});
		},
		baseUrl: "http://localhost:1025/",
		chromeWebSecurity: false
	}
});
