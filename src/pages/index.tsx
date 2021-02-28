
import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { isConstructSignatureDeclaration } from 'typescript';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenge } from '../components/CompletedChallenge';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { RodapeText } from '../components/RodapeText';
import { CountdownProvider } from '../context/CountdownContext';


import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../context/ChallengeContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}>
      <div className={styles.container}>
        <ExperienceBar />

        <Head>
          <title>Move.it | Início</title>
        </Head>

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenge />
              <Countdown />
            </div>
            <ChallengeBox />
          </section>
        </CountdownProvider>

        <div>
          <RodapeText />
        </div>
      </div>
    </ChallengesProvider>
  );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //chamar a api.
  const { level, currentExperience, challengeCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    }
  }
}


