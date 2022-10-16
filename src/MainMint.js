import React, {useState} from 'react'
import {ethers, BigNumber} from 'ethers';
import healthNFT from './healthNFT.json'


const healthNFTAddress = "0x7D157EFe11FadC50ef28A509b6958F7320A6E6f9"

const MainMint = ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConneced = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                healthNFTAddress,
                healthNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                })
                
            }catch(err){
                console.log("error:", err)
            }

        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1 ) return;
        setMintAmount(mintAmount - 1);
    }
    const handleIncrement = () => {
        if (mintAmount >= 1 ) return;
        setMintAmount(mintAmount + 1);
    }

    return(
        <div>
            <h1>Hello World</h1>
            {isConneced ? (
                <div>
                    <div>
                        <button onClick = {handleDecrement}>-</button>
                        <input type = "number" value = {mintAmount} />
                        <button onClick = {handleIncrement}>+</button>
                        </div>
                        <button onClick = {handleMint}>Mint Now</button>
                </div>
            ):(
                <p>You must be conncted to Mint</p>
            )}
        </div>
    )

}

export default MainMint;