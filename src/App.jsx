import {Cards} from "./components/Cards/Cards";
import styles from './App.module.scss'
import './index.css'


export const App = () => {

	return (
			<div className={styles.App}>
				<Cards />
			</div>
	);
}

