import {
  Anchor,
  Box,
  Button,
  Header as GHeader,
  ResponsiveContext,
  Image,
  Layer,
  Text,
} from 'grommet'
import {
  Cancel,
  Menu,
  User,
  Svg3DSelectSolid,
  Packages,
  Consumable,
  Reports,
  Svg3DSelectFace,
  Wallet,
} from 'iconoir-react'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function Header() {
  const size = useContext(ResponsiveContext)
  const isMobile = size === 'small'
  const [menuVisible, setMenuVisible] = useState(false)

  const menus = (
    <Box
      direction={isMobile ? 'column' : 'row'}
      align={isMobile ? 'end' : 'center'}
      gap="large"
    >
      {/* <Anchor icon={<Wallet />} label="Accounts" href="/account" size="small" /> */}
      <Anchor
        icon={<Svg3DSelectFace />}
        label="Blocks"
        // size="small"
        href="/block"
      />
      <Anchor
        icon={<Consumable />}
        label="Transactions"
        // size="small"
        href="/tx"
      />
      <Anchor icon={<Packages />} label="SNARKs" href="/snark" />
      <Anchor
        icon={<Reports />}
        label="Charts & Stats"
        // size="small"
        href="/stats"
      />
    </Box>
  )

  return (
    <GHeader
      pad={{ horizontal: 'large', vertical: 'small' }}
      className="navigator"
    >
      <Box direction="row" align="center" justify="between" width="100%">
        <Button
          icon={
            <Box direction="row" gap="xsmall">
              <Image src="/logo.svg" width={120} alt="" />
              <Text
                weight="bold"
                size="4xl"
                style={{ fontFamily: 'monospace' }}
              >
                Block
              </Text>
            </Box>
          }
          hoverIndicator
          href="/"
        />

        {isMobile ? <Menu onClick={() => setMenuVisible(true)} /> : menus}

        {menuVisible && (
          <Layer
            full
            position="right"
            background="white"
            modal
            style={{ zIndex: 1000 }}
          >
            <Box direction="column" align="end" pad="large" gap="large">
              <Cancel
                width={40}
                height={40}
                onClick={() => setMenuVisible(false)}
              />
              {menus}
            </Box>
          </Layer>
        )}
      </Box>
    </GHeader>
  )
}
