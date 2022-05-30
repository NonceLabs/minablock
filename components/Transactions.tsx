import { Box, DataTable } from 'grommet'
import HashLink from './common/HashLink'

export default function Transactions({
  data,
}: {
  data: (Transaction | UserCommand)[]
}) {
  return (
    <Box pad="medium" style={{ overflowX: 'scroll' }}>
      <DataTable
        columns={[
          {
            property: 'hash',
            header: 'Hash',
            render: (datum) => (
              <HashLink hash={datum.hash} link={`/tx/${datum.hash}`} />
            ),
          },
          {
            property: 'from',
            header: 'From',
            render: (datum) => (
              <HashLink hash={datum.from} link={`/account/${datum.from}`} />
            ),
          },
          {
            property: 'to',
            header: 'To',
            render: (datum) => (
              <HashLink hash={datum.to} link={`/account/${datum.to}`} />
            ),
          },
          {
            property: 'fee',
            header: 'Fee',
          },
          {
            property: 'amount',
            header: 'Amount',
          },
        ]}
        data={data || []}
        pad="small"
        background={{
          header: { color: 'neutral-2', opacity: 'strong' },
          body: ['light-1', 'light-3'],
          footer: { color: 'dark-3', opacity: 'strong' },
        }}
      />
    </Box>
  )
}
