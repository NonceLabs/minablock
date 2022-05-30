import HashLink from 'components/common/HashLink'
import InfoItem from 'components/common/InfoItem'
import Layout from 'components/common/Layout'
import Loading from 'components/common/Loading'
import Transactions from 'components/Transactions'
import dayjs from 'dayjs'
import { Box, DataTable, Grid, Heading, ResponsiveContext, Text } from 'grommet'
import { Wallet } from 'iconoir-react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import useSWR from 'swr'
import { graphFetcher, httpFetcher } from 'utils/fetcher'
import { formatMina } from 'utils/format'

export default function Account() {
  const { query } = useRouter()
  const address = query.address as string

  const { data: accountData, error: accountError } = useSWR<MinaAccountDetail>(
    address ? `https://api.minaexplorer.com/accounts/${address}` : null,
    httpFetcher
  )

  const { data: txData, error: txError } = useSWR<{
    transactions: Transaction[]
  }>(
    address
      ? `
    {
      transactions(limit: 30, query: {canonical: true, from: "${address}"}, sortBy: BLOCKHEIGHT_DESC) {
        amount
        blockHeight
        canonical
        from
        hash
        nonce
        memo
        kind
        isDelegation
        id
        to
        token
        fee
        feeToken
        failureReason
        dateTime
      }
    }
  `
      : null,
    graphFetcher
  )

  const isLoadingAccount = !accountError && !accountData
  const isLoadingTxs = !txError && !txData

  const account = accountData?.account

  return (
    <Layout title={address}>
      <Box width="1200px" pad={{ vertical: 'large' }} gap="small">
        <Box
          border={{ side: 'bottom', size: 'medium' }}
          pad={{ bottom: 'small' }}
          gap="small"
          direction="row"
          align="center"
        >
          <Wallet width={80} height={80} />
          <Box>
            <Heading margin="none" level={2}>
              Account
            </Heading>
            <Text color="dark-2" className="hash-break">
              {address}
            </Text>
          </Box>
        </Box>
        {isLoadingAccount && isLoadingTxs ? (
          <Loading />
        ) : (
          <Box>
            <Box pad="medium">
              <Box border pad="medium" gap="medium">
                <Grid columns="1/3" gap="medium">
                  <InfoItem infoKey="Username" infoValue={account?.username} />
                  <InfoItem
                    infoKey="Balance"
                    infoValue={Number(account?.balance?.total).toFixed(2)}
                  />
                  <InfoItem infoKey="Nonce" infoValue={account?.nonce} />
                </Grid>
                <InfoItem
                  infoKey="Receipt Chain Hash"
                  infoValue={account?.receiptChainHash}
                />
                {account?.votingFor && (
                  <InfoItem
                    infoKey="Voting for"
                    infoValue={account.votingFor}
                    link={`/account/${account.votingFor}`}
                  />
                )}
              </Box>
            </Box>

            <Box pad="medium">
              <Heading margin={{ bottom: 'small' }} level={3}>
                Transactions
              </Heading>

              <Transactions data={txData?.transactions ?? []} />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  )
}
