import { createContext, ReactNode, useEffect, useState, Validator } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';



interface Challenge {
    type: string;
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperince: number;
    challengeCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    concluedChallenge: () => void;
    closeLevelUpModal: () => void;

}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;

}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperince, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    /**Criando permissão de notificações ----------------------------------------------------------------------------- */
    useEffect(() => {
        Notification.requestPermission();  /* Aqui vc estará solicitando permissão de NOTIFICAÇÕES */
    }, [])


    /* Criando armazenamento em Cookies  -------------------------------------------------------------------------- */
    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperince));
        Cookies.set('challengeCompleted', String(challengeCompleted));

    }, [level, currentExperince, challengeCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        /**Criando Notificações quando abrir novo desafio--------------------------------------------- */
        if (Notification.permission == 'granted') {
            new Notification('Novo DESAFIO', {
                body:
                    `Valendo ${challenge.amount} xp!`,
                icon: 'favicon.png'
            });
            /**------------------------------------------------------------------------------------------ */
        }

        /** Para inserir audio às notificações*/
        new Audio('/notification.mp3').play();
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function concluedChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperince + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);

    }

    return (
        <ChallengeContext.Provider
            value=
            {{
                level,
                levelUp,
                currentExperince,
                challengeCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                concluedChallenge,
                closeLevelUpModal,
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}

        </ChallengeContext.Provider>
    );
}