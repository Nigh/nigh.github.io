export interface AppItem {
  name: string;
  url: string;
  description: string;
}

const apps: AppItem[] = [
  {
    name: 'Mangaga',
    url: 'https://nigh.github.io/mangaga/',
    description: '漫画阅读器',
  },
  {
    name: 'APRS PWA',
    url: 'https://nigh.github.io/aprs-pwa/',
    description: 'APRS 位置追踪',
  },
  {
    name: '老黄历',
    url: 'https://laohuangli.tecnico.cc/',
    description: '老黄历算命机器人',
  },
  {
    name: 'Calcuko',
    url: 'https://nigh.github.io/calcuko/',
    description: '计算器',
  },
  {
    name: 'Glyph Predict',
    url: 'https://szres.github.io/glyph-predict-pwa/',
    description: 'Glyph 预测',
  },
  {
    name: 'IFS Gacha',
    url: 'https://szres.github.io/ifs-gacha-system/',
    description: 'IFS 抽卡系统',
  },
  {
    name: 'Ingress Op Sim',
    url: 'https://github.com/szres/ingress-op-sim',
    description: 'Ingress 行动模拟器',
  },
];

export default apps;
