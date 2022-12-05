import { useMoralis } from "react-moralis"
import { useEffect } from "react"

const ManualHeader = () => {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3,isWeb3EnableLoading } = useMoralis()

  //此useEffect會在isWeb3Enabled值改變時觸發
  useEffect(() => {
    //如果已經連接到錢包了,直接return,不做下面的事情
    //當重新刷新頁面之後isWeb3Enabled會是false,所以會檢查localStorage的item
    if (isWeb3Enabled) return
    //檢查window物件存在
    if (typeof window !== "undefined") {
      //抓取localStorage的Item,key是connected,就表示已經連接過錢包了,則直接呼叫enableWeb3()
      if(window.localStorage.getItem("connected")) {
        enableWeb3()
      }
    }
  }, [isWeb3Enabled])

  //此useEffect,僅會在頁面刷新後執行一次
  useEffect(() => {
    //當檢測到Account更動時
    Moralis.onAccountChanged((account) => {
      //列出切換的帳號
      console.log(`Account changed to ${account}`)
      //如果沒有抓到帳號,我們可以假設是用戶手動中斷連線
      if (account == null) {
        //移除localStorage的key
        window.localStorage.removeItem("connected")
        //呼叫deactivateWeb3,會將isWeb3Enabled設為false
        deactivateWeb3()
        console.log("Null account found")
      }
    })
  }, [])

  return (
    //渲染頁面,當account存在時,顯示account地址,若不存在,顯示button按鈕
    <div>
      {account ? (
        <div>
          Connect to {account.slice(0, 6)}...{account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          //當按下connect之後,呼叫enableWeb3,彈出metaMask授權視窗
          onClick={async () => {
            await enableWeb3()
            //並在localStorage內寫入一個item
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected")
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect
        </button>
      )}
    </div>
  )
}

export default ManualHeader
