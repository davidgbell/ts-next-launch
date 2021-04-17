import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

interface Launch {
  mission: string;
  rocket: string;
  timestamp: number;
  details: string;
}

interface Props {
  launch: Launch;
}

export default function Home({ launch }: Props) {
  console.log(launch);
  const date = new Date(launch.timestamp);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h2>Space X mission: {launch.mission}</h2>
        <p>
          {launch.rocket} will launch on {date.toDateString()}
        </p>
        <p>{launch.details}</p>
      </main>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches/next');
  const nextLaunch = await response.json();

  return {
    props: {
      launch: {
        mission: nextLaunch.mission_name,
        rocket: nextLaunch.rocket.rocket_name,
        timestamp: nextLaunch.launch_date_unix * 1000,
        details: nextLaunch.details,
      },
    },
  };
};
