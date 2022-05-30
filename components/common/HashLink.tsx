import { Anchor } from 'grommet'

export default function HashLink({
  hash,
  link,
  ellipsis = true,
  width = 200,
}: {
  hash: string
  link: string
  ellipsis?: boolean
  width?: number
}) {
  return (
    <Anchor
      href={link}
      label={hash}
      style={{
        width: ellipsis ? 200 : 'auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontFamily: 'monospace',
        fontWeight: '400',
      }}
    />
  )
}
