import { Link } from "react-router-dom"

const About = () => {
  return (
    <div>
      <h4>作者: kiralee.eth</h4>
      <h4>這是一個位於以太坊區塊鏈測試網 Goerli 的彩票智能合約。</h4>
      <h4>前端是使用 HTML Javascript 及 NextJS 框架所構建。</h4>
      <h4>並使用 Web3UiKit 及 Moralis串接後端以太坊區塊鏈。</h4>
      <h4>
        此Dapp僅用於測試使用，旨在驗證在無人干預之下，能夠全程使用去中心化機制，自動且公平的選出獲勝者。
      </h4>
      <h4>Version 1.0.0</h4>
      <Link to="/">Go Back</Link>
    </div>
  )
}

export default About
