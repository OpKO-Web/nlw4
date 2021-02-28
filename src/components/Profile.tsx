import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengeContext);

    return (
        <div className={styles.profileContainer}>
            <img src="Avatar.png" alt="Avatar" />
            <div>
                <strong>RAZECK.i9</strong>
                <p><img src="icons/level.svg" alt="" />
                Level  {level}
                </p>

            </div>
        </div>
    );
}