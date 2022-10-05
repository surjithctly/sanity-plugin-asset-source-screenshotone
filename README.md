# sanity-plugin-asset-source-screenshotone

Sanity Plugin to generate Screenshots from URL

## Installation

```
sanity install asset-source-screenshotone
```

## Configuration

This plugin is based on this awesome tool called [Screenshot One](https://screenshotone.com/). Create a free account to get started. Then go to the "Access" tab and copy your Access Key. Then add your access key to `<your-studio-folder>/config/asset-source-screenshotone.json`:

```json
{
  "AccessKey": "<YOUR_ACCESS_KEY_HERE>"
}
```

## Done

That's it. Now whenever you add an image field, you can see "Screenshot from URL" link from the dropdown. Then you can generate and insert the screenshot with the settings available.

## Local Development

This plugin is powered by https://github.com/rexxars/sanipack. Follow the steps to develop locally.

```bash
cd sanity-plugin-asset-source-screenshotone
npm link
yarn build

# Link the plugin to your Sanity studio and start it
cd /path/to/my-studio
npm link sanity-plugin-asset-source-screenshotone
sanity install asset-source-screenshotone
sanity start

# In another terminal, start a watch task for your plugin
cd /path/to/sanity-plugin-spotify
npm run watch
```

## License

MIT © Surjith S M
See LICENSE
