interface Account {
  publicKey: string
}

interface UserCommand {
  id: string
  token: number
  to: string
  amount: number
  blockHeight: number
  blockStateHash: string
  dateTime: string
  failureReason: string
  fee: number
  feeToken: number
  from: string
  hash: string
  isDelegation: boolean
  kind: string
  memo: string
  nonce: number
  canonical: boolean
}

interface FeeTransfer {
  fee: string
  recipient: string
  type: string
}

interface SnarkJob {
  prover: string
  fee: number
}

interface MinaBlock {
  blockHeight: number
  dateTime: string
  receivedTime: string
  snarkFees: string
  stateHash: string
  stateHashField: string
  txFees: string
  creator: string
  canonical: boolean
  transactions: {
    coinbase: string
    coinbaseReceiverAccount: Account
    feeTransfer: FeeTransfer[]
    userCommands: UserCommand[]
  }
  winnerAccount: Account
  snarkJobs: SnarkJob[]
}

interface Transaction extends UserCommand {
  block: {
    canonical: boolean
    stateHash: string
  }
}

interface MinaAccount {
  publicKey: string
  countPendingTransactions: number
  balance: {
    blockHeight: number
    lockedBalance: string
    total: string
    unknown: string
  }
  epochTotalStakingBalance: string
  nonce: number
  publicKey: string
  receiptChainHash: string
  totalBlocks: number
  totalSnarks: number
  totalTx: number
  username: string
  votingFor: string
}

interface MinaAccountStatus {
  blockchainLength: number
  syncStatus: string
}

interface MinaAccountDetail {
  account: MinaAccount
  status: MinaAccountStatus
}

interface Transaction extends UserCommand {}

interface MinaSummary {
  blockchainLength: number
  chainId: string
  circulatingSupply: string
  dateTime: string
  epoch: number
  globalSlot: number
  lockedSupply: string
  minWindowDensity: number
  nextEpochLedgerHash: string
  previousStateHash: string
  slot: number
  snarkedLedgerHash: string
  stagedLedgerHash: string
  stakingEpochLedgerHash: string
  stateHash: string
  totalCurrency: string
}

interface MinaStake {
  balance: number
  delegate: string
  public_key: string
}
