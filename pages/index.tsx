import Layout from 'components/common/Layout'
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet'
import {
  Copy,
  Packages,
  PercentageRound,
  Search,
  Svg3DSelectFace,
  Timer,
} from 'iconoir-react'
import { Router, useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { httpFetcher } from 'utils/fetcher'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const { data, error } = useSWR<MinaSummary>(
    `https://api.minaexplorer.com/summary`,
    httpFetcher,
    {
      refreshInterval: 10000,
    }
  )

  const block = data

  const router = useRouter()
  const onSearch = () => {
    if (keyword.length === 55) {
      router.push(`/account/${keyword}`)
    }
    if (keyword.length === 53) {
      router.push(`/tx/${keyword}`)
    }
    if (keyword.length === 52) {
      router.push(`/block/${keyword}`)
    }
  }

  return (
    <Layout title="Home">
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box
              gap="medium"
              pad={{
                vertical: 'large',
                horizontal: isMobile ? 'large' : '0px',
              }}
            >
              <Heading>
                Explore the{' '}
                <Text className="gradient" size="4xl">
                  MINA
                </Text>{' '}
                Blockchain
              </Heading>

              <Box direction="row">
                <TextInput
                  icon={<Search color="#999" />}
                  size="large"
                  placeholder="Search for accounts, blocks, tx hash, blockhash, etc..."
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    background: 'white',
                  }}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                  label="Search"
                  primary
                  style={{
                    borderRadius: 0,
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  }}
                  onClick={onSearch}
                />
              </Box>

              <Grid
                columns={isMobile ? 'full' : '1/2'}
                gap="medium"
                pad={{ vertical: 'large' }}
              >
                <Card
                  height="280px"
                  width="medium"
                  pad="medium"
                  elevation="small"
                  background="accent-3"
                >
                  <CardHeader justify="start" gap="small">
                    <Svg3DSelectFace />
                    <Heading level={3} margin="none">
                      Blocks
                    </Heading>
                  </CardHeader>
                  <CardBody pad={{ vertical: 'medium' }} gap="medium">
                    <Box>
                      <Text color="#999">Height</Text>
                      <Text weight="bold" size="2xl">
                        {block?.blockchainLength}
                      </Text>
                    </Box>
                    <Box gap="small">
                      <Text color="#999">Hash</Text>
                      <Box direction="row" align="center" justify="between">
                        <Anchor
                          size="medium"
                          style={{
                            maxWidth: '100%',
                            wordBreak: 'break-all',
                            fontFamily: 'monospace',
                          }}
                          label={block?.stateHash}
                          href={`/block/${block?.stateHash}`}
                        />
                      </Box>
                    </Box>
                  </CardBody>
                </Card>

                <Card
                  height="280px"
                  width="medium"
                  background="accent-3"
                  pad="medium"
                >
                  <CardHeader justify="start" gap="small">
                    <Timer />
                    <Heading level={3} margin="none">
                      Epoch
                    </Heading>
                  </CardHeader>
                  <CardBody pad={{ vertical: 'medium' }} gap="medium">
                    <Box>
                      <Text color="#999">Current</Text>
                      <Text weight="bold" size="2xl">
                        {block?.epoch}
                      </Text>
                    </Box>
                    <Box>
                      <Text color="#999">Next</Text>
                      <Box direction="row" align="end">
                        <Text weight="bold" size="2xl">
                          {block?.slot}
                          <Text color="#666"> / 7104</Text>
                        </Text>
                      </Box>
                    </Box>
                  </CardBody>
                </Card>

                <Card width="medium" background="accent-3" pad="medium">
                  <CardHeader justify="start" gap="small">
                    <PercentageRound />
                    <Heading level={3} margin="none">
                      Supply
                    </Heading>
                  </CardHeader>
                  <CardBody pad={{ vertical: 'medium' }} gap="medium">
                    <Box>
                      <Text color="#999">Locked</Text>
                      <Box direction="row" align="end">
                        <Text weight="bold" size="2xl">
                          {Number(block?.lockedSupply ?? '0').toFixed(0)}
                        </Text>
                      </Box>
                    </Box>
                    <Box>
                      <Text color="#999">Circulating</Text>
                      <Text weight="bold" size="2xl">
                        {Number(block?.circulatingSupply ?? '0').toFixed(0)}
                      </Text>
                    </Box>
                    <Box>
                      <Text color="#999">Total</Text>
                      <Text weight="bold" size="2xl">
                        {Number(block?.totalCurrency ?? '0').toFixed(0)}
                      </Text>
                    </Box>
                  </CardBody>
                </Card>
              </Grid>
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Layout>
  )
}
