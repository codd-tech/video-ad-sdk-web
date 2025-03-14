import { theme as themeBase, ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  components: {
    Button: {
      controlHeightLG: 52,
      controlHeight: 42,
      fontSize: 16,
    },
    Progress: {
      remainingColor: '#FFFFFF4C',
      defaultColor: '#FFF',
      colorSuccess: '#FFF',
      lineBorderRadius: 1000,
    },
  },
  token: {
    colorPrimary: '#0091FB',
    colorTextBase: '#FFFFFFCC',
    colorTextHeading: '#FFF',
    colorBgContainer: '#000',
    borderRadiusLG: 18,
    fontSize: 14,
    fontSizeHeading1: 24,
    fontSizeHeading2: 16,
    fontWeightStrong: 500,
    lineHeight: 1.3,
    lineHeightHeading1: 1.35,
  },
  algorithm: themeBase.darkAlgorithm,
};
