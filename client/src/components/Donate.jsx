import React, { useState } from "react"
import { parseEther } from "ethers/lib/utils"

const Donate = ({ state }) => {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [amount, setAmount] = useState("")

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        console.log("form submit called!")

        const { contract } = state

        console.log("name,", name, "message", message, "amount", amount)
        const tempAmount = { value: parseEther(amount.toString()) }

        const tx = await contract.donate(name, message, tempAmount)
        await tx.wait()

        alert("Transaction is successful")
    }

    return (
        <div className="">
            <div className="text-center font-medium my-6 text-3xl">Thanks! for reaching Us!</div>
            <div className="text-center font-medium my-6 text-2xl">Donate Now $</div>

            <form className="flex gap-4 justify-center items-baseline" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <input
                        type="text"
                        id="name"
                        className="border-2 rounded-lg px-2 py-1 hover:ring-2 outline-none ring-sky-500"
                        placeholder="Your Name"
                        required
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        id="message"
                        className="border-2 rounded-lg px-2 py-1 hover:ring-2 outline-none ring-sky-500"
                        placeholder="Your Message"
                        required
                        value={message}
                        onChange={(ev) => setMessage(ev.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="number"
                        id="amount"
                        className="border-2 rounded-lg px-2 py-1 hover:ring-2 outline-none ring-sky-500"
                        placeholder="Amount in ETH"
                        step="0.01" // Allows the amount to increment/decrement by 0.01
                        min="0" // Prevents negative values
                        required
                        value={amount}
                        onChange={(ev) => setAmount(ev.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-sky-300 hover:bg-sky-400 outline-none px-2 py-1 rounded-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Donate
