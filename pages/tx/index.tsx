import Layout from 'components/common/Layout'
import Loading from 'components/common/Loading'
import Transactions from 'components/Transactions'
import { Box, DataTable, Heading, ResponsiveContext, Text } from 'grommet'
import { Consumable } from 'iconoir-react'
import useSWR from 'swr'
import { graphFetcher } from 'utils/fetcher'

export default function Txs() {
  const { data, error } = useSWR<{ transactions: Transaction[] }>(
    `
    {
      transactions(limit: 20, sortBy: BLOCKHEIGHT_DESC) {
        amount
        blockHeight
        canonical
        dateTime
        from
        hash
        to
        fee
      }
    }
  `,
    graphFetcher
  )
  const isLoading = !error && !data

  return (
    <Layout title="Transactions">
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box
              width="1200px"
              pad={{ vertical: 'large', horizontal: 'large' }}
              gap="small"
            >
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
                    Transactions
                  </Heading>
                  <Text>
                    Newly sent transactions may take a few mins to be indexed
                  </Text>
                </Box>
              </Box>
              {isLoading ? (
                <Loading />
              ) : (
                <Transactions data={data?.transactions || []} />
              )}
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Layout>
  )
}
