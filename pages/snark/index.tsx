import Layout from 'components/common/Layout'
import StakeCard from 'components/StakeCard'
import { Box, Heading, ResponsiveContext, Text } from 'grommet'
import { Packages } from 'iconoir-react'
import useSWR from 'swr'
import { graphFetcher, httpFetcher } from 'utils/fetcher'

export default function Snarks() {
  const { data: summary, error: summaryError } = useSWR<MinaSummary>(
    `https://api.minaexplorer.com/summary`,
    httpFetcher
  )

  const { data, error } = useSWR<{ stakes: MinaStake[] }>(
    summary
      ? `
    {
      stakes(limit: 20, sortBy: BALANCE_DESC, query: {timing: {timed_in_epoch: true}, epoch: ${summary.epoch}, ledgerHash: "${summary.stakingEpochLedgerHash}"}) {
        balance
        public_key
        delegate
      }
    }
  `
      : null,
    graphFetcher
  )

  console.log(data)

  return (
    <Layout title="SNARKs">
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
                <Packages width={70} height={70} />
                <Box>
                  <Heading margin="none" level={2}>
                    SNARKs
                  </Heading>
                  <Text>SNARK Work in last 7 days</Text>
                </Box>
              </Box>

              <Box gap="small">
                {(data?.stakes || []).map((stake) => {
                  return <StakeCard key={stake.delegate} stake={stake} />
                })}
              </Box>
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Layout>
  )
}
