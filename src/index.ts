import {definePlugin} from 'sanity'
import {getScreenshot} from './getScreenshot'
import {Icon} from './icon'

export interface ScreenshotOneConfig {
  AccessKey: string
}

export const assetSourceScreenshotOne = definePlugin<ScreenshotOneConfig>((config: ScreenshotOneConfig) => {
  return {
    name: 'asset-source-screenshotone',
    form: {
      image: {
        assetSources: (prev: any[]) => [
          ...prev,
          {
            name: 'screenshotone',
            title: 'Screenshot from URL',
            component: getScreenshot,
            icon: Icon,
          },
        ],
      },
    },
  }
})

export default assetSourceScreenshotOne
