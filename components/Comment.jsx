const Comment = () => {
  return (
    <div className="p-5">
      <details className="hover:bg-sky-100 ring-1 bg-slate-50 ring-black/5 open:bg-green-100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          關於此網站.
        </summary>
        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          <p>此網頁是去中心化的智能合約所構成，在<a href="#goerli" className="text-blue-600 hover:underline font-medium">以太坊測試網路Goerli</a>上執行。</p>
          <p>與網頁互動所花費的加密貨幣，均為測試代幣，您不會有實際金額損失。</p>
          <p>
            若您已擁有加密貨幣錢包。例如：MetaMask。點選右上角Connect
            Wallet，就可使用您的錢包與網頁互動。
          </p>
          <p>若您擁有的加密貨幣錢包，其中存放著真實金錢，請勿直接用於此測試網，避免產生額外風險。</p>
          <p>若您尚未擁有<a href="#wallet" className="text-blue-600 hover:underline font-medium">加密貨幣錢包</a>，也無<a href="#testcoin" className="text-blue-600 hover:underline font-medium">測試代幣</a>，請參考以下說明。</p>
        </div>
      </details>
      <details className="hover:bg-sky-100 ring-1 bg-slate-50 ring-black/5 open:bg-green-100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          如何獲得加密貨幣錢包?
        </summary>
        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          <p>
            您需要在瀏覽器上安裝、註冊加密貨幣錢包，
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              點此安裝註冊。
            </a>
          </p>
          <a name="wallet">1. 將MetaMask錢包加入網頁瀏覽器擴充功能。</a>
          <img src="1.png" alt="1" />
          <p>2. 點選開始使用。</p>
          <img src="2.png" alt="2" />
          <p>3. 創建錢包。</p>
          <img src="3.png" alt="3" />
          <p>4. 選擇是否同意傳送匿名資料，協助改進MetaMask，可選NO。</p>
          <img src="4.png" alt="4" />
          <p>5. 為您的錢包設定密碼。</p>
          <img src="5.png" alt="5" />
          <p>6. MetaMask錢包官方介紹，可略過。</p>
          <img src="6.png" alt="6" />
          <p>7. 請記下您的錢包註記詞，此為錢包遺失、忘記密碼時，還原錢包的重要依據。</p>
          <p>建議以紙筆抄錄並妥善保存，切勿與他人分享，擁有註記詞即等於擁有錢包內所有資產。</p>
          <img src="7.png" alt="7" />
          <p>8. 使用註記詞驗證錢包。</p>
          <img src="8.png" alt="8" />
          <p>9. 錢包創建完成。</p>
          <p>紅框處：1.您的錢包地址。2.加密貨幣交易。3.錢包內擁有的資產(加密貨幣)。</p>
          <img src="9.png" alt="9" />
        </div>
      </details>
      <details className="hover:bg-sky-100 ring-1 bg-slate-50 ring-black/5 open:bg-green-100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          如何將錢包切換到以太坊測試網Goerli?
        </summary>
        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          <p>由於此網頁背後是在以太坊測試網Goerli上運作，因此需要對加密貨幣錢包進行設定。</p>
          <p>1. 這是錢包的主頁面。</p>
          <img src="b1.png" alt="b1" />
          <p>2. 點選帳戶頭像，設定。</p>
          <img src="b2.png" alt="b2" />
          <p>3. 點選進階。</p>
          <img src="b3.png" alt="b3" />
          <p>4. 將顯示測試網選項開啟後，點X關閉畫面。</p>
          <img src="b4.png" alt="b4" />

          <a name="goerli">5. 回到主畫面，點選網路，將網路切換到Goerli測試網。</a>
          <img src="b5.png" alt="b5" />
          <p>6. 主畫面的上方就會顯示目前錢包屬於以太坊測試網Goerli，畫面中央為測試代幣的餘額。</p>
          <img src="b6.png" alt="b6" />
        </div>
      </details>
      <details className="hover:bg-sky-100 ring-1 bg-slate-50 ring-black/5 open:bg-green-100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          如何獲得測試代幣?
        </summary>
        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          <p>
            可以從
            <a
              href="https://goerlifaucet.com/"
              target="_blank"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              此網站
            </a>
            領取以太坊測試網Goerli的測試代幣。
          </p>
          <a name="testcoin">1. 進入網頁後，點選右上角登入。</a>
          <img src="a1.png" alt="a1" />
          <p>2. 使用Google登入或註冊新帳戶。</p>
          <img src="a2.png" alt="a2" />
          <p>3. 確認錢包處於Goerli測試網路，並點選紅框處，複製錢包地址。</p>
          <img src="a3.png" alt="a3" />
          <p>4. 將錢包地址貼到網頁中，領取測試代幣。</p>
          <img src="a4.png" alt="a4" />
          <p>5. 領取測試代幣成功後，會顯示廣告，點選關閉。</p>
          <img src="a5.png" alt="a5" />
          <p>6. 檢查錢包頁面，可以看到測試代幣增加。</p>
          <img src="a6.png" alt="a6" />
        </div>
      </details>
      <details className="hover:bg-sky-100 ring-1 bg-slate-50 ring-black/5 open:bg-green-100 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg">
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          如何遊玩?
        </summary>
        <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          <p>1. 點擊瀏覽器的擴充功能，打開<a href="#wallet" className="text-blue-600 hover:underline font-medium">加密貨幣錢包</a>。</p>
          <img src="c2.png" alt="c2" />
          <p>2. 確認您的加密貨幣錢包，處於<a href="#goerli" className="text-blue-600 hover:underline font-medium">Goerli測試網</a>，且有一些<a href="#testcoin" className="text-blue-600 hover:underline font-medium">測試代幣</a>。</p>
          <img src="c3.png" alt="c3" />
          <p>3. 在此網站點擊右上角<a className="text-blue-600">Connect Wallet</a>。</p>
          <img src="c1.png" alt="c1" />
          <p>4. 點選MetaMask圖示，將錢包連接至此網站。</p>
          <img src="c4.png" alt="c4" />
          <p>5. 點選要連接的帳戶。</p>
          <img src="c5.png" alt="c5" />
          <p>6. 確認授權。</p>
          <img src="c6.png" alt="c6" />
          <p>7. 確認右上角顯示的是您的帳戶地址後，點選<a className="text-blue-600">Enter Raffle</a>，就可下注。</p>
          <img src="c7.png" alt="c7" />
          <p>8. 確認花費測試代幣下注。</p>
          <img src="c8.png" alt="c8" />
          <p>9. 等待幾分鐘，會顯示交易成功通知。</p>
          <img src="c9.png" alt="c9" />
          <p>10. 下注成功後網頁會顯示出，您的獲勝機率，下注金額等，若未成功顯示可重新整理頁面。</p>
          <img src="c10.png" alt="c10" />
          <p>之後等待開獎時間到，將會在此網頁顯示中獎者，並自動將獎金發送到中獎者錢包中。</p>
        </div>
      </details>
    </div>
  )
}

export default Comment
