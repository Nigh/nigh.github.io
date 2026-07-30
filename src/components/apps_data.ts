export interface AppItem {
  name: string;
  description: string;
  type: 'Web' | 'Desktop' | 'Mobile';
  url?: string;
  downloadUrl?: string;
  sourceUrl?: string;
}

const apps: AppItem[] = [
  {
    name: 'Mangaga',
    url: 'https://nigh.github.io/mangaga/',
    description: '漫画阅读器',
    type: 'Web',
  },
  {
    name: 'APRS PWA',
    url: 'https://nigh.github.io/aprs-pwa/',
    description: 'APRS 位置追踪',
    type: 'Mobile',
  },
  {
    name: '老黄历',
    url: 'https://laohuangli.tecnico.cc/',
    description: 'Ingress 老黄历算命机器人',
    sourceUrl: 'https://github.com/szres/ingress-laohuangli',
    type: 'Web',
  },
  {
    name: 'Calcuko',
    url: 'https://nigh.github.io/calcuko/',
    description: '计算器',
    type: 'Web',
  },
  {
    name: 'Glyph Predict',
    url: 'https://szres.github.io/glyph-predict-pwa/',
    description: 'Glyph 预测',
    sourceUrl: 'https://github.com/szres/glyph-predict-pwa',
    type: 'Mobile',
  },
  {
    name: 'IFS Gacha',
    url: 'https://szres.github.io/ifs-gacha-system/',
    description: 'IFS 抽卡系统',
    sourceUrl: 'https://github.com/szres/ifs-gacha-system',
    type: 'Web',
  },
];

export default apps;
