import { Anchor, Box, Text } from 'grommet'

const ellipsisStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontFamily: 'monospace',
}

export default function InfoItem({
  infoKey,
  infoValue,
  ellipsis = false,
  link = '',
  width = '100%',
}: {
  infoKey: string
  infoValue: string | number
  ellipsis?: boolean
  link?: string
  width?: number | string
}) {
  return (
    <Box>
      <Text size="small" weight="bold" color="dark-6">
        {infoKey}
      </Text>
      {!!link ? (
        <Anchor
          href={link}
          label={infoValue}
          style={
            ellipsis
              ? { ...ellipsisStyle, width, wordBreak: 'break-all' }
              : { width, wordBreak: 'break-all' }
          }
          title={`${infoValue}`}
        />
      ) : (
        <Text
          style={
            ellipsis
              ? { ...ellipsisStyle, width, wordBreak: 'break-all' }
              : { width, wordBreak: 'break-all' }
          }
          title={`${infoValue}`}
        >
          {infoValue}
        </Text>
      )}
    </Box>
  )
}
