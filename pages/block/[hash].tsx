import HashLink from 'components/common/HashLink'
import InfoItem from 'components/common/InfoItem'
import Layout from 'components/common/Layout'
import Loading from 'components/common/Loading'
import Transactions from 'components/Transactions'
import dayjs from 'dayjs'
import { Box, DataTable, Grid, Heading, Tab, Tabs, Text } from 'grommet'
import { Svg3DSelectSolid } from 'iconoir-react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { graphFetcher } from 'utils/fetcher'

export default function Block() {
  const { query } = useRouter()
  const hash = query.hash as string

  const { data, error } = useSWR<{ block: MinaBlock }>(
    hash
      ? `
        {
          block(query: {stateHash: "${hash}"}) {
            blockHeight
            dateTime
            receivedTime
            snarkFees
            stateHash
            stateHashField
            txFees
            creator
            canonical
            transactions {
              coinbase
              coinbaseReceiverAccount {
                publicKey
              }
              userCommands {
                id
                token
                to
                amount
                blockHeight
                blockStateHash
                dateTime
                failureReason
                fee
                feeToken
                from
                hash
                isDelegation
                kind
                memo
                nonce
              }
            }
            winnerAccount {
              publicKey
            }
            snarkJobs {
              prover
              fee
            }
          }
        }
      `
      : null,
    graphFetcher
  )

  const isLoading = !error && !data
  const block = data?.block

  return (
    <Layout title={hash ?? ''}>
      <Box width="1200px" pad={{ vertical: 'large' }} gap="small">
        <Box
          border={{ side: 'bottom', size: 'medium' }}
          pad={{ bottom: 'small' }}
          gap="small"
          direction="row"
          align="center"
        >
          <Svg3DSelectSolid width={80} height={80} />
          <Box>
            <Heading margin="none" level={2}>
              Block #{block?.blockHeight}
            </Heading>
            <Text>{hash}</Text>
          </Box>
        </Box>

        {isLoading ? (
          <Loading />
        ) : (
          <Box>
            <Box pad="medium" gap="medium" border margin="medium">
              <InfoItem
                infoKey="Creator"
                infoValue={block?.creator}
                link={`/account/${block?.creator}`}
              />
              <InfoItem
                infoKey="Winning Aaccount"
                infoValue={block?.winnerAccount.publicKey}
                link={`/account/${block?.winnerAccount.publicKey}`}
              />
              <InfoItem
                infoKey="Coinbase Receiver"
                infoValue={
                  block?.transactions?.coinbaseReceiverAccount?.publicKey
                }
                link={`/account/${block?.transactions.coinbaseReceiverAccount.publicKey}`}
              />
              <Grid columns="1/3" gap="medium">
                <InfoItem infoKey="Fee" infoValue={block?.txFees} />
                <InfoItem
                  infoKey="Coinbase"
                  infoValue={block?.transactions?.coinbase}
                />
                <InfoItem infoKey="SNARK Fee" infoValue={block?.snarkFees} />
                <InfoItem
                  infoKey="Date"
                  infoValue={dayjs(block?.dateTime).format(
                    'M/D/YYYY, hh:mm:ss'
                  )}
                />
              </Grid>
            </Box>

            <Box pad="small">
              <Tabs justify="start">
                <Tab
                  title={
                    <Heading level={2} margin="none">
                      User Commands
                    </Heading>
                  }
                >
                  <Transactions data={block?.transactions.userCommands ?? []} />
                </Tab>
                <Tab
                  title={
                    <Heading level={2} margin="none">
                      SNARK Jobs
                    </Heading>
                  }
                >
                  <Box pad="medium">
                    <DataTable
                      columns={[
                        {
                          property: 'prover',
                          header: 'Prover',
                          render: (datum) => (
                            <HashLink
                              hash={datum.prover}
                              link={`/account/${datum.prover}`}
                              ellipsis={false}
                            />
                          ),
                        },
                        {
                          property: 'fee',
                          header: 'Fee',
                        },
                      ]}
                      data={block?.snarkJobs || []}
                      pad="small"
                      background={{
                        header: { color: 'neutral-2', opacity: 'strong' },
                        body: ['light-1', 'light-3'],
                        footer: { color: 'dark-3', opacity: 'strong' },
                      }}
                    />
                  </Box>
                </Tab>
                <Tab
                  title={
                    <Heading level={2} margin="none">
                      Fee Transfer
                    </Heading>
                  }
                ></Tab>
              </Tabs>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  )
}
