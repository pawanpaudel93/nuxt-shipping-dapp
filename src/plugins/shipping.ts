import { AbiItem } from 'web3-utils'
import Shipping from '../../build/contracts/Shipping.json'
import { web3 } from './web3';


interface ShippingInstance {
    abi: AbiItem[],
}

console.log((Shipping as ShippingInstance).abi)

export default new web3.eth.Contract((Shipping as ShippingInstance).abi, process.env.CONTRACT_ADDRESS!);
