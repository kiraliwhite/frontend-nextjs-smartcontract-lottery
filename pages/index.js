import Head from "next/head"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader";
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"
import Time from "../components/Time"
import Comment from "../components/Comment"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* 使用route來導向不同的path*/}
      <LotteryEntrance />
      <Time />
      <Comment />
    </div>
  )
}
