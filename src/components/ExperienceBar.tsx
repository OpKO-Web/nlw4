import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentExperince, experienceToNextLevel } = useContext(ChallengeContext);

    const percentToNextLevel = Math.round(currentExperince * 100) / experienceToNextLevel;

    return (

        <div className={styles.experience_Bar}>
            <img src='favicon.png' alt='logo' />
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />

                <span className={styles.currentXp} style={{ left: `${percentToNextLevel}%` }} >
                    {currentExperince} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </div>

    );
}
