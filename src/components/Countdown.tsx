
import { useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/Countdown.module.css'


export function Countdown() {
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        resetCountdown,
        startCountdown } = useContext(CountdownContext);


    const [minutesLeft, minutesRigth] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRigth] = String(seconds).padStart(2, '0').split('');


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRigth}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRigth}</span>
                </div>

            </div>

            { hasFinished ? (
                <button
                    disabled
                    className={styles.CountDownButton}>
                    Ciclo Concluído
                    <img src="conclued.svg" alt="ok" />
                </button>

            ) : (
                    <>
                        { isActive ? (
                            <button type='button'
                                className={`${styles.CountDownButton} ${styles.CountDownButtonActive}`}
                                onClick={resetCountdown}>
                                Abandonar ciclo
                            </button>

                        ) : (
                                <button type='button'
                                    className={styles.CountDownButton}
                                    onClick={startCountdown}>
                                    Iniciar Ciclo
                                    <img src="play-solid.svg" alt="start" />
                                </button>
                            )}
                    </>
                )}

        </div>
    );

}