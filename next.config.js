/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**/**',
      },
    ],
  },
  webpack(config) {
    // SVG imports를 처리하는 기존의 규칙 불러오기
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // ?url로 끝나는 svg에 한해서 기존의 규칙 수정
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // 다른 모든 *.svg import를 React components로 변환
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/, 주석처리 해야 정상 동작
        resourceQuery: { not: /url/ }, // *.svg?url면 제외
        use: ['@svgr/webpack'],
      }
    )

    // 이제 처리했으므로 file loader 규칙이 *.svg를 무시하도록 수정
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = nextConfig
