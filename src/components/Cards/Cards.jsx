import {SingleCard} from "../SingleCard/SingleCard";
import {useEffect, useState} from "react";
import {cardImages, countTurns, title} from "./cardImage";
import styles from './Cards.module.scss'

export const Cards = () => {

	const [cards, setCards] = useState([])
	const [turns, setTurns] = useState(0)
	const [choiceOne, setChoiceOne] = useState(null)
	const [choiceTwo, setChoiceTwo] = useState(null)
	const [disabled, setDisabled] = useState(false)

	//shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
				.sort(() => Math.random() - 0.5)
				.map((card) => ({...card, id: Math.random()}))

		setChoiceTwo(null)
		setChoiceOne(null)
		setCards(shuffledCards)
		setTurns(0)
	}

	//compare 2 selected cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)
			if (choiceOne.src === choiceTwo.src) {
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src) {
							return {...card, matched: true}
						} else {
							return card
						}
					})
				})
				resetTurn()
			} else {
				setTimeout(() => resetTurn(), 1000)
			}
		}
	}, [choiceOne, choiceTwo])

	//resetChoices && increase turn counter
	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setDisabled(false)
		setTurns(prevTurns => prevTurns + 1)
	}

	// start a new game automatically
	useEffect(() => {
		shuffleCards()
	}, [])
	// handleChoice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}
	return (
			<>
				<h1>{title}</h1>
				<button className={styles.btn} onClick={shuffleCards}>Перетасовать карточки</button>
				<p>{countTurns}: {turns}</p>
				{
					cards.every((card) => {
						return card.matched === true
					}) ?
							<div> Поздравляем, вы отгадали все карточки! </div>
							:
							<div className={styles.cardGrid}>
								{cards.map(card => (
										<SingleCard
												handleChoice={handleChoice}
												flipped={card === choiceOne || card === choiceTwo || card.matched}
												disabled={disabled}
												card={card}
												key={card.id}/>
								))}
							</div>
				}
			</>
	);
};

