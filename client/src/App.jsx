import { useEffect, useState } from "react"
import abi from "./contract/Donate.json"
import { ethers } from "ethers"
import Donate from "./components/Donate"
import DonorsList from "./components/DonorsList"
// import Donate from "./components/Donate"
// import DonorList from "./components/DonorList"
// import Navbar from "./components/Navbar"

const App = () => {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    })

    const [account, setAccount] = useState("")

    const connectWallet = async () => {
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
        const contractABI = abi.abi
        if (window.ethereum !== "undefined") {
            try {
                const { ethereum } = window
                const account = await ethereum.request({
                    method: "eth_requestAccounts",
                })
                window.ethereum.on("accountsChanged", () => {
                    window.location.reload()
                })
                setAccount(account)

                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()

                const contract = new ethers.Contract(contractAddress, contractABI, signer)
                console.log(contract)
                setState({ provider, signer, contract })
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Kindly first install metamask!")
        }
    }

    return (
        <div>
            {/* NavBar */}
            <div className="flex justify-around items-center py-4 shadow-lg">
                <div className="text-3xl font-medium">Donate Dapp</div>
                <div>
                    {account ? (
                        <div>{`Connected to -> ${account}`}</div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={() => connectWallet()}
                            >
                                Connect Now!
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div>
                {account ? (
                    <div>
                        <Donate state={state} />
                        <DonorsList state={state} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[80vh] text-2xl font-semibold">
                        Kindly First Connect!
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
