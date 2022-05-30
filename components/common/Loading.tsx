import { Box } from 'grommet'

export default function Loading() {
  return (
    <Box align="center" justify="center" pad="large">
      <div
        dangerouslySetInnerHTML={{
          __html: `<lottie-player src="https://assets6.lottiefiles.com/private_files/lf30_qrvv8h4p.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`,
        }}
      />
    </Box>
  )
}
