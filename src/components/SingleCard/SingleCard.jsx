import styles from './SingleCard.module.scss'

export const SingleCard = ({card, handleChoice, flipped, disabled}) => {

	const handleClick = () => {
		!disabled && handleChoice(card)
	}

	return (
			<div className={styles.card}>
				<div className={flipped ? styles.flipped : styles.flippedPrev}>
					<img
							className={styles.front}
							src={card.src}
							alt="Card front"/>
					<img
							onClick={handleClick}
							className={styles.back}
							src={'/img/cover.jpg'}
							alt="Card cover"/>
				</div>
			</div>
	);
};


