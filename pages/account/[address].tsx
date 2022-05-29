import HashLink from 'components/common/HashLink'
import InfoItem from 'components/common/InfoItem'
import Layout from 'components/common/Layout'
import dayjs from 'dayjs'
import { Box, DataTable, Grid, Heading, ResponsiveContext, Text } from 'grommet'
import { Wallet } from 'iconoir-react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import useSWR from 'swr'
import { graphFetcher, httpFetcher } from 'utils/fetcher'

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
            <Text color="dark-2">{address}</Text>
          </Box>
        </Box>
        {isLoadingAccount && isLoadingTxs ? (
          <Box align="center" justify="center" pad="large">
            <div
              dangerouslySetInnerHTML={{
                __html: `<lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_qrvv8h4p.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`,
              }}
            />
          </Box>
        ) : (
          <Box>
            <Box pad="medium">
              <Box border pad="medium" gap="medium">
                <Grid columns="1/3" gap="medium">
                  <InfoItem infoKey="Username" infoValue={account?.username} />
                  <InfoItem
                    infoKey="Balance"
                    infoValue={account?.balance?.total}
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

              <DataTable
                columns={[
                  {
                    property: 'dateTime',
                    header: 'Time',
                    render: (datum) => (
                      <Text color="dark-4" size="small">
                        {dayjs(datum.dateTime).format('M/D/YYYY, hh:mm:ss')}
                      </Text>
                    ),
                  },
                  {
                    property: 'hash',
                    header: 'Hash',
                    render: (datum) => (
                      <HashLink hash={datum.hash} link={`/tx/${datum.hash}`} />
                    ),
                  },
                  {
                    property: 'from',
                    header: 'From',
                    render: (datum) => (
                      <HashLink
                        hash={datum.from}
                        link={`/account/${datum.from}`}
                      />
                    ),
                  },
                  {
                    property: 'to',
                    header: 'To',
                    render: (datum) => (
                      <HashLink hash={datum.to} link={`/account/${datum.to}`} />
                    ),
                  },
                  {
                    property: 'amount',
                    header: 'Amount',
                    render: (datum) => (
                      <Text style={{ fontFamily: 'monospace' }}>
                        {datum.amount}
                      </Text>
                    ),
                  },
                ]}
                data={txData?.transactions ?? []}
                pad="small"
                border={{ side: 'top', size: '1px' }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  )
}
