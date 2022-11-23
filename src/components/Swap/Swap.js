import "../Swap/Swap.css";
import "../SwapModal/SwapModal.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { ConnectKitButton } from "connectkit";
import tokensJsonAvax from "../../config/tokensAvax.json";
import AVAXLogo from "../../images/tokenimg/avax.png";
import STLogo from "../../images/tokenimg/snowtracelogo.svg";
import Cog from "../../images/tokenimg/cog-wheel.png";
import { ethers } from "ethers";

export default function Swap() {
  const AvaxAPI = process.env.REACT_APP_INFURA_ID;
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [value, setValue] = useState("");
  const [valueExchanged, setValueExchanged] = useState("");
  const [valueExchangedDecimals, setValueExchangedDecimals] = useState();
  const [to, setTo] = useState("");
  const [txData, setTxData] = useState("");
  const [balance, setBalance] = useState("");
  const [listShow, setListShow] = useState(false);
  const [listShow2, setListShow2] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [swapApproved, setSwapApproved] = useState(false);
  const [tokenDecimals, setTokenDecimals] = useState("");

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
    },
  });

  const walletAddress = account.address;

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    request: {
      from: String(walletAddress),
      to: String(to),
      data: String(txData),
      value: 0,
    },
  });

  async function getConversion() {
    const tx = await axios.get(
      `https://api.1inch.io/v5.0/43114/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${value}&fromAddress=${walletAddress}&slippage=1&disableEstimate=false`
    );
    setValueExchangedDecimals(Number(`1E${tx.data.toToken.decimals}`));
    setValueExchanged(tx.data.toTokenAmount);
  }

  async function get1inchSwap() {
    const tx = await axios.get(
      `https://api.1inch.io/v5.0/43114/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${value}&fromAddress=${walletAddress}&slippage=1&disableEstimate=false`
    );
    console.log(tx.data);
    setTo(tx.data.tx.to);
    setTxData(tx.data.tx.data);
  }

  window.Approve = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    getConversion();

    const inputTokenContract = `${fromToken}`;
    const oneInchContract = "0x1111111254EEB25477B68fb85Ed929f73A960582";

    const erc20Abi = [
      "function approve(address spender, uint256 amount) public returns (bool)",
    ];
    const inputToken = new ethers.Contract(inputTokenContract, erc20Abi, signer);
    const inputAmount = value;
    const weiAmount = ethers.utils.parseEther(inputAmount);
    const tx1 = await inputToken.approve(oneInchContract, weiAmount);
    await tx1.wait();
    get1inchSwap();
    setSwapApproved(true);
  };

  async function getBalance() {
    const ethers = require("ethers");
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://avalanche-mainnet.infura.io/v3/${AvaxAPI}`
      );
      const balance = await provider.getBalance(account.address, "latest");
      setBalance(balance.toString());
    })();
  }

  function changeToToken(e) {
    setToToken(e.target.value);
    setValueExchanged("");
  }

  function changeValue(e) {
    const amount = ethers.utils.parseUnits(e.target.value, tokenDecimals).toString();
    setValue(amount);
    setValueExchanged("");
  }

  const handleListShow = () => {
    setListShow(!listShow);
  };

  const handleListShow2 = () => {
    setListShow2(!listShow2);
  };

  const changeModal = () => {
    setModalShow(!modalShow);
  };

  const handleToToken = (token) => {
    setToToken(token);
  };

  const handleFromToken = (token) => {
    setFromToken(token);
  };

  const handleSelectedToken = (token) => {
    setTokenDecimals(token);
  };

  return (
    <div className="swap">
      <br />
      <ConnectKitButton />
      <div className="balance">
        <img className="balance-logo" src={AVAXLogo} alt="" width="20" height="20" />
        <p>Balance: {(balance / 1e18).toFixed(3)}</p>
      </div>
      <div className="swap-container">
        <div className="swap-content-top">
          <p className="swap-title">Swap</p>
          <img className="swap-cog" src={Cog} alt="Cog wheel" width={20} height={20} />
        </div>
        <div className="swap-content">
          <div className="input-box">
            <input
              className="input-field"
              onChange={(e) => changeValue(e)}
              type="number"
              min={0}
              max={(balance.balance / 1e18).toFixed(3)}
              placeholder={"0.0"}></input>
            <button className="input-btn" onClick={handleListShow2}>
              <div className="input-inner-box">
                {fromToken === "" && "Tokens"}
                {fromToken !== "" && (
                  <img
                    src={
                      tokensJsonAvax.find((token) => token.address === fromToken).logoURI
                    }
                    alt=""
                    className="input-logo"
                    onChange={(e) => changeToToken(e)}
                    value={fromToken}
                  />
                )}
                {fromToken !== "" &&
                  tokensJsonAvax.find((token) => token.address === fromToken).symbol}
              </div>
            </button>
            <span className="dropdown-content2">
              {listShow2 &&
                tokensJsonAvax.map((token, idx) => {
                  return (
                    <button
                      className="dropdown-list2"
                      key={idx}
                      onClick={function () {
                        handleFromToken(token.address);
                        handleSelectedToken(token.decimals);
                      }}>
                      <img src={token.logoURI} alt="" />
                      <span className="token-symbol">{token.symbol}</span>
                    </button>
                  );
                })}
            </span>
          </div>
          <div className="output-box">
            <input
              className="output-field"
              onChange={(e) => changeValue(e)}
              value={
                !valueExchanged
                  ? ""
                  : (valueExchanged / valueExchangedDecimals).toFixed(3)
              }
              placeholder={"0.0"}
              disabled={true}></input>
            <button className="output-btn" onClick={handleListShow}>
              <div className="output-inner-box">
                {toToken === "" && "Tokens"}
                {toToken !== "" && (
                  <img
                    src={
                      tokensJsonAvax.find((token) => token.address === toToken).logoURI
                    }
                    alt=""
                    className="output-logo"
                  />
                )}
                {toToken !== "" &&
                  tokensJsonAvax.find((token) => token.address === toToken).symbol}
              </div>
            </button>
            <span className="dropdown-content">
              {listShow &&
                tokensJsonAvax.map((token, idx) => {
                  return (
                    <button
                      className="dropdown-list"
                      key={idx}
                      onClick={() => handleToToken(token.address)}>
                      <img src={token.logoURI} alt="" />
                      <span className="token-symbol">{token.symbol}</span>
                    </button>
                  );
                })}
            </span>
          </div>
          <div className="button-containers">
            <button
              className={swapApproved !== true ? "approve-btn" : "approve-btn-approved"}
              onClick={window.Approve}>
              Approve Tx
            </button>
            <button
              className={swapApproved !== true ? "swap-btn" : "swap-btn-approved"}
              onClick={sendTransaction}>
              Swap
            </button>
          </div>
        </div>
      </div>
      {
        (modalShow,
        isLoading && (
          <div className="modal">
            <div className="modal-box">
              <p className="walletcheck-msg">Checking Wallet...</p>
              <button className="modal-button" onClick={changeModal}>
                X
              </button>
            </div>
          </div>
        ))
      }
      {isSuccess && (
        <div className="transaction-container">
          <h4 className="transaction-title">Click to see your txn status</h4>
          <a
            className="transaction-msg"
            href={`https://snowtrace.io/tx/${data?.hash}`}
            target="_blank"
            rel="noreferrer">
            <img src={STLogo} alt="" width={200} height={30} />
          </a>
        </div>
      )}
    </div>
  );
}
