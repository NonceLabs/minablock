import Layout from 'components/common/Layout'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  Text,
  TextInput,
} from 'grommet'
import { Copy, Packages, Search, Svg3DSelectFace } from 'iconoir-react'
import useSWR from 'swr'
import { httpFetcher } from 'utils/fetcher'

export default function Home() {
  const { data, error } = useSWR<MinaSummary>(
    `https://api.minaexplorer.com/summary`,
    httpFetcher
  )

  const block = data

  return (
    <Layout title="Home">
      <Box gap="medium" pad={{ vertical: 'large' }}>
        <Heading>
          Explore then{' '}
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
          />
          <Button
            label="Search"
            primary
            style={{
              borderRadius: 0,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}
          />
        </Box>

        <Grid columns={'1/2'} gap="medium" pad={{ vertical: 'large' }}>
          <Card
            height="280px"
            width="medium"
            background="neutral-2"
            pad="medium"
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
                  <Text
                    size="small"
                    style={{ maxWidth: '100%', wordBreak: 'break-all' }}
                  >
                    {block?.stateHash}
                  </Text>
                </Box>
              </Box>
            </CardBody>
          </Card>

          {/* <Card
            height="280px"
            width="medium"
            background="neutral-3"
            pad="medium"
          >
            <CardHeader justify="start" gap="small">
              <Packages />
              <Heading level={3} margin="none">
                Nodes
              </Heading>
            </CardHeader>
            <CardBody pad={{ vertical: 'medium' }}>
              <Text color="#999">24 Hours</Text>
              <Text weight="bold" size="2xl">
                157
              </Text>
            </CardBody>
          </Card> */}
        </Grid>
      </Box>
    </Layout>
  )
}
