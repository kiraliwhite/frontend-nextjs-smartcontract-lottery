import { abi, contractAddresses } from "../constants/index.js"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Bell } from "@web3uikit/icons"

const LotteryEntrance = () => {
  //從useMoralis中提取chainId並改名為chainIdHex,此時這個東西是16進制 0xa123..
  const { chainId: chainIdHex, isWeb3Enabled, Moralis,account,deactivateWeb3 } = useMoralis()
  //宣告一個變數chainId(不會衝突,因為上面那行在提取的過程已改名),把16進制的chainId轉為10進制
  const chainId = parseInt(chainIdHex)
  //宣告一個變數raffleAddress,  若chainId(10進制)存在於contractAddresses.json檔中,則抓取該地址,否則為null
  const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

  //為了讓entranceFee的值改變時,能夠自動重新渲染頁面,使用useState,初始值為0
  const [entranceFee, setEntranceFee] = useState("0")
  const [numPlayers, setNumPlayers] = useState(0)
  const [recentWinner, setRecentWinner] = useState("0")
  const [contractBalance, setContractBalance] = useState("0")
  const [playerTimes, setPlayerTimes] = useState(0)
  const [winChance, setWinChance] = useState("0")
  const [winnerBalance, setWinnerBalance] = useState("0")
  const [ethPrice, setEthPrice] = useState("0")

  //呼叫Moralis的useWeb3Contract,呼叫Raffle合約中的getEntranceFee view function,抓取最低入金金額
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi, //abi是部署合約自動產生到前端的abi.json
    contractAddress: raffleAddress, //合約地址是部署合約自動產生到前端的contractAddresses.json並透過chainId抓取地址
    functionName: "getEntranceFee",
    params: {}, //view function所以沒有輸入變數
  })

  //合約入金function
  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  })

  //顯示目前參與者人數
  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  })

  //顯示最近獲勝者地址
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  })

  //顯示當前帳號下注了幾次,目前是undefine 明天再處理
  const { runContractFunction: getPlayerTimes } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getPlayerTimes",
    params: {},
  })

  //顯示勝利者拿到多少錢
  const { runContractFunction: getWinnerBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getWinnerBalance",
    params: {},
  })

  //顯示以太幣價
  const { runContractFunction: getPrice } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getPrice",
    params: {},
  })

  //抓取合約現有金額
  async function getContractBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //使用provider抓取餘額,傳入合約地址
    const balance = await provider.getBalance(raffleAddress)
    //console.log(`None format balance is ${balance}`);
    //console.log(`Contract balance is ${ethers.utils.formatEther(balance)}`);
    return balance
  }

  async function getWinChance() {
    const a = (await getPlayerTimes()).toNumber()
    const b = (await getNumberOfPlayers()).toNumber()
    if (a != 0 && b != 0) {
      const percent = (a / b) * 10000
      const round = Math.round(percent) / 100
      const chance = round + "%"
      return chance
    }
  }

  //當此function被呼叫時,呼叫合約取得值,更新到State中
  async function UpdateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString()
    const numPlayersFromCall = (await getNumberOfPlayers()).toNumber()
    const recentWinnerFromCall = await getRecentWinner()
    const contractBalanceFromCall = (await getContractBalance()).toString()
    const playerTimesFromCall = (await getPlayerTimes()).toNumber()
    const winnerBalanceFromCall = (await getWinnerBalance()).toString()
    //const ethPriceFromCall = (await getPrice()).toNumber();
    //不能這樣寫的原因是 bigNumber太大 沒辦法直接轉成數字
    const ethPriceFromCall = (await getPrice()).toString()
    setEntranceFee(entranceFeeFromCall)
    setNumPlayers(numPlayersFromCall)
    setRecentWinner(recentWinnerFromCall)
    setContractBalance(contractBalanceFromCall)
    setPlayerTimes(playerTimesFromCall)
    setWinnerBalance(winnerBalanceFromCall)
    setEthPrice(ethPriceFromCall)
    const winChanceFromCall = await getWinChance()
    setWinChance(winChanceFromCall)
  }

  //以太幣轉美元
  function priceConvert(fees) {
    return ethers.utils.formatUnits(fees, "ether") * ethers.utils.formatUnits(ethPrice, "ether")
  }

  //使用useEffect,在頁面載入完成之後,且有連接MetaMask的狀態下,去呼叫view function,抓取入金金額
  //但頁面載入的第一次,都是用戶沒有連接錢包的狀態下,所以isWeb3Enabled是false,所以不會呼叫getEntranceFee
  //因此dependency array要寫isWeb3Enabled, 在連接錢包的狀態下在觸發一次這個useEffect
  //每當有帳號account Connect或是disConnect都會觸發此useEffect
  useEffect(() => {
    if (isWeb3Enabled) {
      //確保合約地址存在時,才呼叫getEntranceFee,去修改state
      if (raffleAddress) {
        UpdateUI()
      }
    }
  }, [isWeb3Enabled])

  //此useEffect,僅會在頁面刷新後執行一次
  useEffect(() => {
    //當檢測到Account更動時
    Moralis.onAccountChanged((account) => {
      //如果帳號是空的 有可能是手動斷線 則deactiveWeb3
      if (account == null) {
        deactivateWeb3();
      }
    })
  }, [])

  useEffect(() => {
    //當檢測到Account更動時,有可能只是單純切換,已經經過web3Enable授權的帳號
    Moralis.onAccountChanged((account) => {
      if (account != null) {
        if (isWeb3Enabled) {
        UpdateUI();
        }
      }
    })
  }, [account])


  const dispatch = useNotification()
  //當onClick呼叫enterRaffle成功時,會呼叫此function,這是一個async function,輸入參數是transaction
  const handleSuccess = async function (tx) {
    //等待一個區塊確認
    await tx.wait(1)
    //觸發另一個function
    handleNewNotification(tx)
    //入金成功後也更新UI
    UpdateUI()
  }
  //此function被handleSuccess呼叫,是一個一般function
  //呼叫useNotification的dispatch,傳入要發出notification的格式
  //參考 https://web3ui.github.io/web3uikit/?path=/docs/5-popup-notification--hook-demo
  const handleNewNotification = function () {
    //傳入dispatch的是一個物件
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: <Bell fontSize="50px" />,
    })
  }

  return (
    <div className="p-5">
      <div>這是一個去中心化的彩票智能合約</div>
      <div>每一注的金額均相同，下注次數越多中獎機率越高</div>
      <div>獲勝者將獨得所有獎金，並由智能合約自動轉移至您的錢包</div>
      {isWeb3Enabled ? (
        raffleAddress ? (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-atuo"
              onClick={async () =>
                await enterRaffle({
                  onSuccess: handleSuccess,
                  onError: (error) => console.log(error),
                })
              }
              disabled={isLoading || isFetching}
            >
              {isLoading || isFetching ? (
                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
              ) : (
                <div>Enter Raffle</div>
              )}
            </button>
            <div>
              每一注金額: {ethers.utils.formatUnits(entranceFee, "ether")} ETH (
              {priceConvert(entranceFee)} USD)
            </div>
            <div>
              獎金池總金額: {ethers.utils.formatUnits(contractBalance, "ether")} ETH (
              {priceConvert(contractBalance)} USD)
            </div>
            <div>下注人數: {numPlayers}</div>
            <div>當前帳號下注次數: {playerTimes}</div>
            <div>中獎機率: {winChance}</div>
            <div>
              最近的中獎者錢包地址: {recentWinner} <br />
              獨得金額: {ethers.utils.formatUnits(winnerBalance, "ether")} ETH (
              {priceConvert(winnerBalance)} USD)
            </div>
          </div>
        ) : (
          <div>未偵測到智能合約，請將區塊鏈錢包網路轉移至Goerli測試網</div>
        )
      ) : (
        <div>請連接錢包</div>
      )}
    </div>
  )
}

export default LotteryEntrance
