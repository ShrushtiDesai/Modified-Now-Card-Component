import { createCustomElement } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-card";

const view = (state, { updateState, dispatch}) => {
	const { properties, clickedCards } = state;
	const { backgroundColor, cardData } = properties;

	let parsedCardData = [];
	try {
		parsedCardData =
			typeof cardData === "string" ? JSON.parse(cardData) : cardData;
	} catch (e) {
		console.error("Error parsing cardData:", e);
		parsedCardData = [];
	}

	const handleCardClick = (cardIndex) => {
		console.log('Card clicked:', cardIndex);
	
		const newClickedCards = {...clickedCards};
		newClickedCards[cardIndex] = !newClickedCards[cardIndex];
	
		updateState({
			clickedCards: newClickedCards
		});
	};

	console.log("Background Color:", backgroundColor);
	console.log("Clicked Cards:", clickedCards);

	return (
		<div>
			{parsedCardData &&
				parsedCardData.map((card, index) => {
					const headingObject = {
						label: card.header || "Default Header",
						size: "md",
						lines: 1,
					};

					const isCardClicked = clickedCards && clickedCards[index];
					const currentColor = isCardClicked ? "grey" : backgroundColor;

					return (
						<div key={index} id={`card-${index}`}
							style={{backgroundColor: currentColor}}
							on-click={() => handleCardClick(index)}>
							<now-card>
								<now-card-header heading={headingObject}></now-card-header>
								<now-card-divider />
								<div style={{ backgroundColor: currentColor}}>
									<p>{card.content || "No content"}</p>
									<now-card-footer>
										{card.footer || "No footer"}
									</now-card-footer>
								</div>
							</now-card>
						</div>
					);
				})}
		</div>
	);
};

createCustomElement("x-1837636-now-card-11", {
	renderer: { type: snabbdom },
	view,
	initialState: {
		clickedCards: {},
	},
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
		// eventHandlers: [
		// 	{
		// 		events: ["click"],
		// 		effect({
		// 			updateState,
		// 			state,
		// 			dispatch,
		// 			action: {
		// 				payload: { event },
		// 			},
		// 		}) {
		// 			// Find the clicked card
		// 			const target = event.target;
		// 			const card = target.closest("now-card");

		// 			if (card && card.id && card.id.startsWith('card-')) {
		// 				const cardIndex = parseInt(card.id.replace('card-', ''));
		// 			}

		// 			if (card && card.dataset.cardIndex !== undefined) {
		// 				const cardIndex = parseInt(card.dataset.cardIndex);
		// 				console.log("Card clicked:", cardIndex);

		// 				// Toggle the clicked state for this specific card
		// 				const newClickedCards = { ...state.clickedCards };
		// 				newClickedCards[cardIndex] = !newClickedCards[cardIndex];

		// 				updateState({
		// 					clickedCards: newClickedCards,
		// 				});

		// 				dispatch('CARD_CLICKED', {
		// 					cardIndex: cardIndex,
		// 					isClicked: newClickedCards[cardIndex],
		// 					cardData: state.properties.cardData[cardIndex]
		// 				});
		// 			}

		// 		},
		// 	},
		// ],
		// dispatches: {
		// 	'CARD_CLICKED': {
		// 		description: 'Fired when a card is clicked',
		// 		properties: {
		// 			cardIndex: {
		// 				description: 'Index of the clicked card',
		// 				type: 'number'
		// 			},
		// 			isClicked: {
		// 				description: 'Whether the card is now clicked (grey)',
		// 				type: 'boolean'
		// 			},
		// 			cardData: {
		// 				description: 'Data of the clicked card',
		// 				type: 'object'
		// 			}
		// 		}
		// 	}
		// }
		dispatches: {
			'CARD_CLICKED': {
				description: 'Dispatched when a card is clicked',
				schema: {
					type: 'object',
					properties: {
						cardIndex: { type: 'number' },
						isClicked: { type: 'boolean' },
						cardData: { type: 'object' }
					}
				}
			}
		},
	},
	styles
});
