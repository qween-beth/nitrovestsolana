import { Connection, PublicKey } from '@solana/web3.js';
import { getSolanaConnection, getSolanaBalance } from '../lib/solanaUtils';

const rpcEndpoint = 'https://api.devnet.solana.com'; // Replace this with your valid RPC endpoint

const connection = new Connection(rpcEndpoint);

const getSolanaConnection = () => {
  return connection;
};

const getSolanaBalance = async (address) => {
  try {
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance;
  } catch (error) {
    console.error('Error fetching Solana balance:', error);
    return null;
  }
};

export { getSolanaConnection, getSolanaBalance };
