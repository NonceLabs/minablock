import InfoItem from 'components/common/InfoItem'
import Layout from 'components/common/Layout'
import dayjs from 'dayjs'
import { Box, Grid, Heading, Text } from 'grommet'
import { Consumable, MoveRight } from 'iconoir-react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { graphFetcher } from 'utils/fetcher'

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
      <Box width="1200px" pad={{ vertical: 'large' }} gap="small">
        <Box
          border={{ side: 'bottom', size: 'medium' }}
          pad={{ bottom: 'small' }}
          gap="small"
          direction="row"
          align="center"
        >
          <Consumable width={70} height={70} />
          <Box>
            <Heading margin="none" level={2}>
              Transaction
            </Heading>
            <Text>{hash}</Text>
          </Box>
        </Box>
        {tx && (
          <Box gap="large" pad={{ horizontal: 'medium' }}>
            <Box>
              <Box direction="column" align="center">
                <Text weight="bold">Amount: {tx.amount}</Text>
                <Text size="small">Fee: {tx.fee}</Text>
              </Box>
              <Box direction="row" align="center" justify="between">
                <InfoItem
                  infoKey="FROM"
                  infoValue={tx.from}
                  ellipsis
                  width={400}
                  link={`/account/${tx.from}`}
                />
                <MoveRight />
                <InfoItem
                  infoKey="TO"
                  infoValue={tx.from}
                  ellipsis
                  width={400}
                  link={`/account/${tx.to}`}
                />
              </Box>
            </Box>
            <Grid columns="1/3" border pad="medium" gap="medium">
              <InfoItem
                infoKey="Date"
                infoValue={dayjs(tx.dateTime).format('M/D/YYYY, hh:mm:ss')}
              />
              <InfoItem
                infoKey="Block State Hash"
                infoValue={tx.block.stateHash}
                ellipsis
                link={`/block/${tx.block.stateHash}`}
              />
              <InfoItem infoKey="Block Height" infoValue={tx.blockHeight} />
              <InfoItem infoKey="Nonce" infoValue={tx.nonce} />
              <InfoItem infoKey="Memo" infoValue={tx.memo ?? '-'} ellipsis />
              <InfoItem infoKey="Kind" infoValue={tx.kind ?? '-'} />
              <InfoItem
                infoKey="CANONICAL"
                infoValue={tx.canonical ? 'true' : 'false'}
              />
            </Grid>
          </Box>
        )}
      </Box>
    </Layout>
  )
}
