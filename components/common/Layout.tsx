import { Grommet, grommet, Main } from 'grommet'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from './Footer'
import Header from './Header'

export default function Layout({
  children,
  title = '',
}: {
  children: any
  title?: string
}) {
  return (
    <Grommet theme={grommet}>
      <Head>
        <title>{`${title} | ZK Explorer`}</title>
        <meta name="description" content="Best MINA Explorer." />
        <meta name="keywords" content="MINA, explorer" />
        <meta name="author" content="zk Inc." />
        {/* <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Ubuntu"
        ></link> */}
      </Head>
      <Header />
      <Main direction="column" align="center" pad="none" className="noise-bg">
        {children}
      </Main>
      <Footer />
    </Grommet>
  )
}
