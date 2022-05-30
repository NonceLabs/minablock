import dayjs from 'dayjs'
import { Box, DataTable, Text } from 'grommet'
import { formatMina } from 'utils/format'
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
            property: 'dateTime',
            header: 'Time',
            render: (datum) => (
              <Text color="dark-4" size="small">
                {dayjs(datum.dateTime).format('M/D/YYYY, hh:mm:ss')}
              </Text>
            ),
          },
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
            render: (datum) => <Text>{formatMina(datum.fee)}</Text>,
          },
          {
            property: 'amount',
            header: 'Amount',
            render: (datum) => (
              <Text style={{ fontFamily: 'monospace' }}>
                {formatMina(datum.amount)}
              </Text>
            ),
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
