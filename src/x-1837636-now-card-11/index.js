import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-card";

const view = (state, { updateState }) => {
	const { properties } = state;
	const { backgroundColor, cardData} = properties;

	let parsedCardData = [];
	try {
		parsedCardData =
			typeof cardData === "string" ? JSON.parse(cardData) : cardData;
	} catch (e) {
		console.error("Error parsing cardData:", e);
		parsedCardData = [];
	}

	console.log("Background Color:", backgroundColor);

	return (
		<div>
			{parsedCardData && parsedCardData.map((card, index) => {
					const headingObject = {
						label: card.header || "Default Header",
						size: "md",
						lines: 1,
					};

					return (
						<div key={index}>
						<now-card>
							<now-card-header heading={headingObject}></now-card-header>
							<now-card-divider />
							<div style={{backgroundColor: backgroundColor}}>
								<p>{card.content || "No content"}</p>
							    <now-card-footer>{card.footer || "No footer"}</now-card-footer>
							</div>
						</now-card>
						</div>
					);
			}	
			)
		}
			
		</div>
	);
};

createCustomElement("x-1837636-now-card-11", {
	renderer: { type: snabbdom },
	view,
	properties: {
		/**
		 * Background color for the cards
		 * @type {('red'|'green'|'yellow'|'blue'|'white'|'black')}
		 * @uib.label Background Color
		 * @uib.description Apply a background color to the cards
		 * @uib.typeMetadata.choices [{"label": "Red", "value": "red"}, {"label": "Green", "value": "green"}, {"label": "Yellow", "value": "yellow"}, {"label": "Blue", "value": "blue"}, {"label": "White", "value": "white"}, {"label": "Black", "value": "black"}]
		 */
		backgroundColor: {
			default: "black",
			schema: {
				type: "string",
				enum: ["red", "green", "yellow", "blue", "white", "black"],
			},
		},
		cardData: {
			default: [
				{
					header: "Card Header 1",
					content: "Card Content 1",
					footer: "Card Footer 1",
				},
				{
					header: "Card Header 2",
					content: "Card Content 2",
					footer: "Card Footer 2",
				},
			],
			schema: {
				type: "array",
				items: {
					type: "object",
					properties: {
						header: {
							type: "string",
						},
						content: {
							type: "string",
						},
						footer: {
							type: "string",
						},
					},
				},
			},
		},
	},
	styles,
});
