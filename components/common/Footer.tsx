import { Anchor, Box, Footer, Text, Image, ResponsiveContext } from 'grommet'
import {
  Discord,
  GitHub,
  GitHubOutline,
  Mail,
  Medium,
  Telegram,
  Twitter,
  YouTube,
} from 'iconoir-react'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function OFooter() {
  const size = useContext(ResponsiveContext)
  const isMobile = size === 'small'
  const iconSize = 20
  return (
    <Footer
      pad={{ horizontal: 'large' }}
      width="100%"
      height="100%"
      className="noise-bg"
    >
      <Box
        direction={isMobile ? 'column' : 'row'}
        justify="between"
        pad="medium"
        width="100%"
        border={{
          side: 'top',
          size: 'medium',
          color: 'black',
        }}
        gap="large"
      >
        <Box direction="column" gap="small">
          <Box direction="row" align="center" gap="medium">
            <Anchor
              icon={<GitHubOutline />}
              href="https://github.com/noncelabs"
            />
          </Box>
        </Box>

        <Box gap="medium" pad="medium" align={isMobile ? 'center' : 'end'}>
          <Text size="small">© 2022 MinaBlock. All Rights Reserved</Text>
        </Box>
      </Box>
    </Footer>
  )
}
