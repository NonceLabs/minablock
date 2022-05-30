import InfoItem from 'components/common/InfoItem'
import Layout from 'components/common/Layout'
import Loading from 'components/common/Loading'
import dayjs from 'dayjs'
import { Box, Grid, Heading, ResponsiveContext, Text } from 'grommet'
import { Consumable, MoveDown, MoveRight } from 'iconoir-react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { graphFetcher } from 'utils/fetcher'
import { formatMina } from 'utils/format'

export default function Tx() {
  const { query } = useRouter()
  const hash = query.hash as string
  const { data, error } = useSWR<{ transaction: Transaction }>(
    `
    {
      transaction(query: {hash: "${hash}"}) {
        canonical
        amount
        blockHeight
        dateTime
        fee
        failureReason
        feeToken
        from
        to
        token
        hash
        id
        isDelegation
        kind
        memo
        nonce
        block {
          canonical
          stateHash
        }
      }
    }
  `,
    graphFetcher
  )
  const isLoading = !error && !data
  const tx = data?.transaction

  return (
    <Layout title={hash}>
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box width="1200px" pad={{ vertical: 'large' }} gap="small">
              <Box
                border={{ side: 'bottom', size: 'medium' }}
                pad={{ horizontal: isMobile ? 'medium' : '', bottom: 'small' }}
                gap="small"
                direction="row"
                align="center"
              >
                <Consumable width={70} height={70} />
                <Box>
                  <Heading margin="none" level={2}>
                    Transaction
                  </Heading>
                  <Text className="hash-break">{hash}</Text>
                </Box>
              </Box>
              {isLoading && <Loading />}
              {tx && (
                <Box
                  gap="large"
                  pad={{ horizontal: isMobile ? 'large' : 'medium' }}
                >
                  <Box>
                    {!isMobile && (
                      <Box direction="column" align="center">
                        <Text weight="bold">
                          Amount: {formatMina(tx.amount)}
                        </Text>
                        <Text size="small">Fee: {formatMina(tx.fee)}</Text>
                      </Box>
                    )}
                    <Box
                      direction={isMobile ? 'column' : 'row'}
                      align="center"
                      justify="between"
                      gap={isMobile ? 'large' : ''}
                    >
                      <InfoItem
                        infoKey="FROM"
                        infoValue={tx.from}
                        width={isMobile ? '100%' : 360}
                        link={`/account/${tx.from}`}
                      />
                      <Box direction="row" align="center">
                        {isMobile ? (
                          <MoveDown width={40} height={40} />
                        ) : (
                          <MoveRight width={40} height={40} />
                        )}
                        {isMobile && (
                          <Box direction="column" align="center">
                            <Text weight="bold">
                              Amount: {formatMina(tx.amount)}
                            </Text>
                            <Text size="small">Fee: {formatMina(tx.fee)}</Text>
                          </Box>
                        )}
                      </Box>
                      <InfoItem
                        infoKey="TO"
                        infoValue={tx.from}
                        width={isMobile ? '100%' : 360}
                        link={`/account/${tx.to}`}
                      />
                    </Box>
                  </Box>

                  <Grid columns="1" border pad="medium" gap="medium">
                    <InfoItem
                      infoKey="Block State Hash"
                      infoValue={tx.block.stateHash}
                      link={`/block/${tx.block.stateHash}`}
                    />
                    <InfoItem
                      infoKey="Block Height"
                      infoValue={tx.blockHeight}
                    />
                    <InfoItem infoKey="Nonce" infoValue={tx.nonce} />
                    <InfoItem
                      infoKey="Memo"
                      infoValue={tx.memo ?? '-'}
                      ellipsis
                    />
                    <InfoItem infoKey="Kind" infoValue={tx.kind ?? '-'} />
                    <InfoItem
                      infoKey="CANONICAL"
                      infoValue={tx.canonical ? 'true' : 'false'}
                    />
                    <InfoItem
                      infoKey="Date"
                      infoValue={dayjs(tx.dateTime).format(
                        'M/D/YYYY, hh:mm:ss'
                      )}
                    />
                  </Grid>
                </Box>
              )}
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Layout>
  )
}
