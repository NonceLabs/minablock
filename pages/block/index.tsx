import Layout from 'components/common/Layout'
import dayjs from 'dayjs'
import { Anchor, Box, Heading, Text } from 'grommet'
import useSWR from 'swr'
import { graphFetcher } from 'utils/fetcher'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useState } from 'react'
import { Svg3DSelectFace } from 'iconoir-react'
import Link from 'next/link'

dayjs.extend(relativeTime)

export default function Blocks() {
  const { data, error } = useSWR(
    `
      {
        blocks(limit: 30, sortBy: DATETIME_DESC, query: {canonical: true}) {
          dateTime
          receivedTime
          txFees
          stateHash
          stateHashField
          canonical
          blockHeight
        }
      }
    `,
    graphFetcher
  )
  const isLoading = !error && !data

  const blocks = []

  return (
    <Layout title="Blocks">
      <Box pad={{ vertical: 'large' }}>
        <Box
          border={{ side: 'bottom', size: 'small' }}
          pad={{ bottom: 'small' }}
          direction="row"
          align="center"
          gap="small"
        >
          <Svg3DSelectFace width={80} height={80} />
          <Box>
            <Heading margin="none" level={2}>
              Blocks
            </Heading>
            <Text>The latest blocks</Text>
          </Box>
        </Box>
        <Box width="1200px" pad="medium">
          {isLoading && (
            <Box align="center" justify="center" pad="large">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_qrvv8h4p.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`,
                }}
              />
            </Box>
          )}
          {(data?.blocks || []).map((block) => {
            return (
              <Link
                key={block.stateHash}
                href={`/block/${block.stateHash}`}
                passHref
              >
                <Box
                  direction="row"
                  justify="between"
                  pad="small"
                  className="block-item"
                >
                  <Box>
                    <Text weight="bold">{`#${block.blockHeight}`}</Text>
                  </Box>

                  <Box justify="end">
                    <Anchor
                      label={block.stateHash}
                      href={`/block/${block.stateHash}`}
                      style={{
                        width: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                    <Text color="#999" size="small" textAlign="end">
                      {`${dayjs(block.dateTime).fromNow(true)} ago`}
                    </Text>
                  </Box>
                </Box>
              </Link>
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}
