import { abi, contractAddresses } from "../constants/index.js"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useEffect, useState, useRef } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Bell } from "@web3uikit/icons"

const LotteryEntrance = () => {
  //從useMoralis中提取chainId並改名為chainIdHex,此時這個東西是16進制 0xa123..
  const { chainId: chainIdHex, isWeb3Enabled, Moralis, account, deactivateWeb3 } = useMoralis()
  //宣告一個變數chainId(不會衝突,因為上面那行在提取的過程已改名),把16進制的chainId轉為10進制
  const chainId = parseInt(chainIdHex)
  //宣告一個變數raffleAddress,  若chainId(10進制)存在於contractAddresses.json檔中,則抓取該地址,否則為null
  const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

  //useMoralis的chainId 是連上錢包之後才會抓取的變數
  let nowChainId = parseInt(chainIdHex)

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

  // //顯示間隔時間
  // const { runContractFunction: getInterval } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: raffleAddress,
  //   functionName: "getInterval",
  //   params: {},
  // })

  // const { runContractFunction: getRaffleState } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: raffleAddress,
  //   functionName: "getRaffleState",
  //   params: {},
  // })

  //抓取合約現有金額
  async function getContractBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //使用provider抓取餘額,傳入合約地址
    const balance = await provider.getBalance(raffleAddress)
    //console.log(`None format balance is ${balance}`);
    //console.log(`Contract balance is ${ethers.utils.formatEther(balance)}`);
    return balance
  }

  //顯示入金後獲勝機率
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
    if (nowChainId == 5) {
      //用try catch包住 確保網頁繼續執行
      //寫法是用三元判斷是 確認物件是否存在 若否則傳空值
      try {
        const entranceFeeFromCall = (await getEntranceFee())
          ? (await getEntranceFee()).toString()
          : ""
        const numPlayersFromCall = (await getNumberOfPlayers())
          ? (await getNumberOfPlayers()).toNumber()
          : ""
        const recentWinnerFromCall = (await getRecentWinner()) ? await getRecentWinner() : ""
        const contractBalanceFromCall = (await getContractBalance())
          ? (await getContractBalance()).toString()
          : ""
        const playerTimesFromCall = (await getPlayerTimes())
          ? (await getPlayerTimes()).toNumber()
          : ""
        const winnerBalanceFromCall = (await getWinnerBalance())
          ? (await getWinnerBalance()).toString()
          : ""
        //const entranceFeeFromCall = (await getEntranceFee()).toString()
        // const numPlayersFromCall = (await getNumberOfPlayers()).toNumber()
        // const recentWinnerFromCall = await getRecentWinner()
        // const contractBalanceFromCall = (await getContractBalance()).toString()
        // const playerTimesFromCall = (await getPlayerTimes()).toNumber()
        // const winnerBalanceFromCall = (await getWinnerBalance()).toString()
        //const ethPriceFromCall = (await getPrice()).toNumber();
        //不能這樣寫的原因是 bigNumber太大 沒辦法直接轉成數字
        //const ethPriceFromCall = (await getPrice()).toString()
        const ethPriceFromCall = (await getPrice()) ? (await getPrice()).toString() : ""
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        setContractBalance(contractBalanceFromCall)
        setPlayerTimes(playerTimesFromCall)
        setWinnerBalance(winnerBalanceFromCall)
        setEthPrice(ethPriceFromCall)
        const winChanceFromCall = (await getWinChance()) ? await getWinChance() : ""
        setWinChance(winChanceFromCall)
      } catch (error) {
        console.log(error)
      }
    }
  }

  //以太幣轉美元
  function priceConvert(fees) {
    fees = fees || "0x0"
    const a = ethers.utils.formatUnits(fees, "ether")
    const b = ethers.utils.formatUnits(ethPrice, "ether")
    const percent = a * b * 100
    const round = Math.round(percent) / 100
    return round
  }

  async function swtichNetwork(chain) {
    const chainIdHex = await Moralis.switchNetwork(chain)
    return chainIdHex
  }

  //使用useEffect,在頁面載入完成之後,且有連接MetaMask的狀態下,去呼叫view function,抓取入金金額
  //但頁面載入的第一次,都是用戶沒有連接錢包的狀態下,所以isWeb3Enabled是false,所以不會呼叫getEntranceFee
  //因此dependency array要寫isWeb3Enabled, 在連接錢包的狀態下在觸發一次這個useEffect
  //每當有帳號account Connect或是disConnect都會觸發此useEffect
  useEffect(() => {
    if (isWeb3Enabled) {
      //console.log(nowChainId)
      UpdateUI()
    }
  }, [isWeb3Enabled])

  //此useEffect,僅會在頁面刷新後執行一次
  useEffect(() => {
    //當檢測到Account更動時,這是已經連接上錢包之後
    Moralis.onAccountChanged((account) => {
      //如果帳號是空的 有可能是手動斷線 則deactiveWeb3
      //console.log(account)
      if (account == null) {
        deactivateWeb3()
      } else if (account != null) {
        UpdateUI()
      }
    })
  }, [])

  useEffect(() => {
    //當檢測到Account更動時,這是已經連接上錢包之後
    Moralis.onChainChanged((chain) => {
      //console.log(`old chain: ${nowChainId}`)
      const chainIdHex = swtichNetwork(chain)
      nowChainId = parseInt(chainIdHex)
      //console.log(`new chain: ${nowChainId}`)
      UpdateUI()
    })
  }, [])

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/eO-4t0dSBC3mQckIv5zVo90O_yV6H95k"
  )
  const CONTRACT_ADDR = "0xfA28691A9dFB27173B50Baa343a3CD35138a3932"
  const contract = new ethers.Contract(CONTRACT_ADDR, abi, provider)

  const handleWinnerPickedEvent = async () => {
    console.log("found event WinnerPicked")
    if (isWeb3Enabled) {
      UpdateUI()
    }
  }

  const handleRequestEvent = async () => {
    console.log("found event RequestedRaffleWinner")
  }

  //最一開始觸發的event
  const handleRaffleEnterEvent = async () => {
    console.log("found event Raffle Enter")
  }

  useEffect(() => {
    contract.on("WinnerPicked", handleWinnerPickedEvent)
    contract.on("RequestedRaffleWinner", handleRequestEvent)
    contract.on("RaffleEnter", handleRaffleEnterEvent)
    return () => {
      contract.removeAllListeners("WinnerPicked")
      contract.removeAllListeners("RequestedRaffleWinner")
      contract.removeAllListeners("RaffleEnter")
    }
  }, [])

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

  const handleError = async function (error) {
    // console.log(error);
    // const contractState = await getRaffleState()
    // console.log(`contract State : ${contractState}`);
    handleErrorNotification()
  }

  //此function被handleSuccess呼叫,是一個一般function
  //呼叫useNotification的dispatch,傳入要發出notification的格式
  //參考 https://web3ui.github.io/web3uikit/?path=/docs/5-popup-notification--hook-demo
  const handleNewNotification = function () {
    //傳入dispatch的是一個物件
    dispatch({
      type: "info",
      message: "交易成功!",
      title: "Transaction Notification",
      position: "topR",
      icon: <Bell fontSize="50px" />,
    })
  }

  const handleErrorNotification = function () {
    //傳入dispatch的是一個物件
    dispatch({
      type: "error",
      message: "交易失敗.",
      title: "Transaction Notification",
      position: "topR",
      icon: <Bell fontSize="50px" />,
    })
  }

  const callEnterRaffle = async () => {
    try {
      await enterRaffle({
        onSuccess: handleSuccess,
        onError: handleError,
      })
    } catch (error) {
      handleErrorNotification()
      console.log(error)
    }
  }

  return (
    <div className="p-5">
      <div className="p-5 ring-1 bg-slate-50 ring-black/5 rounded-lg">
        <div className="font-mono">這是一個去中心化的彩票智能合約</div>
        <div className="font-mono">每一注的金額均相同，下注次數越多中獎機率越高</div>
        <div className="font-mono">獲勝者將獨得所有獎金，並由智能合約自動轉移至您的錢包</div>
        {isWeb3Enabled ? (
          nowChainId == 5 ? (
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-atuo"
                onClick={callEnterRaffle}
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
            <div className="text-blue-600 hover:underline font-medium">
              <a href="#goerli">
                未偵測到智能合約，請參考下方說明，將區塊鏈錢包網路轉移至Goerli測試網
              </a>
            </div>
          )
        ) : (
          <div className="text-rose-500 hover:underline font-medium">
            <a href="#wallet">請點擊右上角連接加密貨幣錢包，若尚未擁有錢包，請參考下方說明</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default LotteryEntrance
