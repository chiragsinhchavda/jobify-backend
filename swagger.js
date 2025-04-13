const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const serverUrl = process.env.BASE_URL || "http://localhost:5000";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Jobify Backend API",
			version: "1.0.0",
			description: "A simple Job tracking backend API using Node.js, Express & MongoDB",
		},
		servers: [
			{
				url: `${serverUrl}/api`,
				description: process.env.NODE_ENV === "production"
				? "Production Server"
				: "Development Server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [{
			bearerAuth: [],
		}]
	},
	apis: [path.join(__dirname, "./src/routes/*.js")], // All your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
