import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import { CountdownContext } from '../context/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css'


export function ChallengeBox() {
    const { activeChallenge, resetChallenge, concluedChallenge } = useContext(ChallengeContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        concluedChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challangeActive}>
                    <header>
                        Ganhe {activeChallenge.amount} xp
                    </header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="body" />
                        <strong>Novos desafios</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}>
                            Falhei
                        </button>

                        <button
                            type="button"
                            className={styles.challengeConcluedButton}
                            onClick={handleChallengeSucceeded}>
                            Conclui
                        </button>
                    </footer>

                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Inicie um ciclo para receber desafios a serem completados.</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="levelup" />
                    Avance de level completando desafios.
                </p>
                    </div>
                )}

        </div>
    );
}