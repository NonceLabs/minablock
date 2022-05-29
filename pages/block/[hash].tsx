import HashLink from 'components/common/HashLink'
import InfoItem from 'components/common/InfoItem'
import Layout from 'components/common/Layout'
import dayjs from 'dayjs'
import { Box, DataTable, Grid, Heading, Tab, Tabs, Text } from 'grommet'
import { Svg3DSelectSolid } from 'iconoir-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { graphFetcher } from 'utils/fetcher'

export default function Block() {
  const { query } = useRouter()
  const hash = query.hash as string

  const [block, setBlock] = useState<MinaBlock | undefined>()

  useEffect(() => {
    if (hash) {
      graphFetcher(`
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
      `)
        .then((result) => {
          console.log(result)
          setBlock(result.block)
        })
        .catch(console.error)
    }
  }, [hash])

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

        <Grid columns="1/3" pad="medium" gap="medium" border margin="medium">
          <InfoItem infoKey="HASH" infoValue={block?.stateHash} ellipsis />
          <InfoItem
            infoKey="CREATOR"
            infoValue={block?.creator}
            ellipsis
            link={`/account/${block?.creator}`}
          />
          <InfoItem
            infoKey="WINNING ACCOUNT"
            infoValue={block?.winnerAccount.publicKey}
            ellipsis
            link={`/account/${block?.winnerAccount.publicKey}`}
          />
          <InfoItem
            infoKey="COINBASE RECEIVER"
            infoValue={block?.transactions?.coinbaseReceiverAccount?.publicKey}
            ellipsis
            link={`/account/${block?.transactions.coinbaseReceiverAccount.publicKey}`}
          />
          <InfoItem infoKey="FEE" infoValue={block?.txFees} />
          <InfoItem
            infoKey="COINBASE"
            infoValue={block?.transactions?.coinbase}
          />
          <InfoItem infoKey="SNARK FEE" infoValue={block?.snarkFees} />
          <InfoItem
            infoKey="DATE"
            infoValue={dayjs(block?.dateTime).format('M/D/YYYY, hh:mm:ss')}
          />
        </Grid>

        <Box pad="small">
          <Tabs justify="start">
            <Tab
              title={
                <Heading level={2} margin="none">
                  User Commands
                </Heading>
              }
            >
              <Box pad="medium">
                <DataTable
                  columns={[
                    {
                      property: 'hash',
                      header: 'Hash',
                      render: (datum) => (
                        <HashLink
                          hash={datum.hash}
                          link={`/tx/${datum.hash}`}
                        />
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
                        <HashLink
                          hash={datum.to}
                          link={`/account/${datum.to}`}
                        />
                      ),
                    },
                    {
                      property: 'fee',
                      header: 'Fee',
                    },
                    {
                      property: 'amount',
                      header: 'Amount',
                    },
                  ]}
                  data={block?.transactions.userCommands || []}
                  pad="small"
                  border={{ side: 'top', size: '1px' }}
                />
              </Box>
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
                  border={{ side: 'top', size: '1px' }}
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
    </Layout>
  )
}
