import { Box } from 'grommet'
import HashLink from './common/HashLink'

export default function StakeCard({ stake }: { stake: MinaStake }) {
  return (
    <Box background="white" pad={{ horizontal: 'medium', vertical: 'small' }}>
      <HashLink
        hash={stake.delegate}
        link={`/account/${stake.delegate}`}
        ellipsis
      />
    </Box>
  )
}
