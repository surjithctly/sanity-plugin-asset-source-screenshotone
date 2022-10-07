/* eslint-disable react/jsx-no-bind */
import React, {useState} from "react"
import pluginConfig from "config:asset-source-screenshotone"
import {
  Flex,
  useToast,
  Spinner,
  Switch,
  Select,
  Grid,
  Button,
  Inline,
  Label,
  TextInput,
  Dialog,
  Text,
  Heading,
  Box,
  Stack,
} from "@sanity/ui"
import styled from "styled-components"

const Img = styled.img`
  max-width: 400px;
`

function getScreenshot(props) {
  const [value, setValue] = useState("")
  const [blob, setBlob] = useState("")
  const [loading, setLoading] = useState(false)

  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [fullpage, setFullPage] = useState(true)
  const [pixelratio, setPixelRatio] = useState(2)
  const [format, setFormat] = useState("jpg")
  const [quality, setQuality] = useState(100)
  const [params, setParams] = useState("")

  const toast = useToast()

  const AccessKey = pluginConfig.AccessKey || null

  function buildImageURL(ImgBlob) {
    const builder = window.URL || window.webkitURL
    return builder.createObjectURL(ImgBlob)
  }

  const generate = async () => {
    if (!value) {
      toast.push({
        status: "error",
        title: "Please enter a URL to generate Screenshot",
      })
      return
    }
    setLoading(true)

    const URL = `https://api.screenshotone.com/take?access_key=${AccessKey}w&url=${encodeURIComponent(
      value
    )}&full_page=${fullpage}&block_chats=true&block_cookie_banners=true&device_scale_factor=${pixelratio}&format=${format}&image_quality=${quality}&cache=false&reduced_motion=true&wait_until=networkidle0${
      width ? `&viewport_width=${width}` : ""
    }${height ? `&viewport_height=${height}` : ""}${params ? params : ""}`

    try {
      const response = await fetch(URL, {
        method: "get",
      })
      const ImgBlob = await response.blob()
      const blobURL = buildImageURL(ImgBlob)
      setBlob(blobURL)
      setLoading(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      toast.push({
        status: "error",
        title: "Something went wrong, Please check console!",
      })
      setLoading(false)
    }
  }

  const handleSelect = () => {
    if (!blob) {
      toast.push({
        status: "error",
        title: "Please generate a screenshot first!",
      })
      return
    }
    props.onSelect([
      {
        kind: "url",
        value: blob,
        // value: `https://api.screenshotone.com/take?access_key=fCLocn9lcX7V7w&url=${encodeURIComponent(
        //   value
        // )}&full_page=true&device_scale_factor=2&format=jpg&image_quality=100&cache=false`,
        assetDocumentProps: {
          originalFilename: "screenshot.jpg", // Use this filename when saving the image.
          source: {
            source: "screenshotone", // The source this image is from
            id: Date.now(), // A string that uniquely identifies it within the source
            url: "https://screenshotone.com/", // Where to find more info about the asset
          },
          description: "Screenshot",
          creditLine: "by Surjith S M",
        },
      },
    ])
  }

  if (!AccessKey) {
    return (
      <Dialog
        id="getscreenshot"
        header="Generate Screenshot"
        onClose={props.onClose}
        open
        width={2}
      >
        <Stack padding={4} space={4}>
          <Heading as="h2">Plugin Setup Pending!</Heading>
          <Text as="p">
            Plugin is installed. Now setup your Access Key in{" "}
            <code>./config/asset-source-screenshotone.json</code>
            <br />
            You may signup for an account on{" "}
            <a href="https://screenshotone.com/" rel="noopener noreferrer" target="_blank">
              Screenshot One
            </a>{" "}
            if you don't have an access key.
          </Text>
        </Stack>
      </Dialog>
    )
  }

  return (
    <Dialog id="getscreenshot" header="Generate Screenshot" onClose={props.onClose} open width={2}>
      <Stack padding={4} space={4}>
        {/* <Heading as="h2">Generate Sreenshot</Heading> */}
        <Text as="p">Let's generate a screenshot from any URL.</Text>

        <Grid columns={2} gap={5}>
          <Box>
            <Stack space={4}>
              <Label size={3}>Enter Website URL</Label>
              <TextInput
                type="url"
                placeholder="https://"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
              />

              <details>
                <summary style={{cursor: "pointer"}}>View Options</summary>
                <Stack space={4} paddingTop={3}>
                  <Inline space={1}>
                    <Switch checked={fullpage} onChange={() => setFullPage(!fullpage)} />{" "}
                    <Text> Full Page</Text>
                  </Inline>
                  <Flex gap={2}>
                    <Stack space={3} flex={1}>
                      <Label>Width</Label>
                      <TextInput
                        type="number"
                        placeholder="1280"
                        value={width}
                        onChange={(event) => setWidth(event.currentTarget.value)}
                      />
                    </Stack>
                    <Stack space={3} flex={1}>
                      <Label>Height</Label>
                      <TextInput
                        type="number"
                        placeholder="1024"
                        value={height}
                        onChange={(event) => setHeight(event.currentTarget.value)}
                      />{" "}
                    </Stack>
                  </Flex>

                  <Flex gap={2}>
                    <Stack space={3} flex={1}>
                      <Label>Format</Label>
                      <Select
                        defaultValue={format}
                        onChange={(event) => setFormat(event.currentTarget.value)}
                      >
                        <option value="jpg">jpg</option>
                        <option value="png">png</option>
                        <option value="webp">webp</option>
                        <option value="avif">avif</option>
                      </Select>{" "}
                    </Stack>
                    <Stack space={3} flex={1}>
                      <Label>Image Quality</Label>
                      <TextInput
                        type="number"
                        min={10}
                        max={100}
                        placeholder="80"
                        value={quality}
                        onChange={(event) => setQuality(event.currentTarget.value)}
                      />
                    </Stack>
                    <Stack space={3} flex={1}>
                      <Label>Device Pixel Ratio</Label>
                      <Select
                        defaultValue={pixelratio}
                        onChange={(event) => setPixelRatio(event.currentTarget.value)}
                      >
                        <option value={1}>@1x</option>
                        <option value={2}>@2x</option>
                        <option value={3}>@3x</option>
                      </Select>{" "}
                    </Stack>
                  </Flex>
                  <Stack space={3}>
                    <Label>Extra Params</Label>
                    <TextInput
                      type="text"
                      min={10}
                      max={100}
                      placeholder="&amp;dark_mode=true&amp;cache=false"
                      value={params}
                      onChange={(event) => setParams(event.currentTarget.value)}
                    />
                  </Stack>
                </Stack>
              </details>

              <Inline space={[3, 3, 4]}>
                <Button
                  mode="ghost"
                  type="button"
                  disabled={loading}
                  onClick={generate}
                  text={"1. Generate Screenshot"}
                />
                <Button
                  tone="primary"
                  type="button"
                  disabled={loading}
                  onClick={handleSelect}
                  text={"2. Insert Screenshot"}
                />
              </Inline>
            </Stack>
          </Box>
          <Box paddingY={3}>
            {loading && (
              <Flex align="center" direction="column" gap={3} height="fill" justify="center">
                <Spinner muted />
                <Text muted size={1}>
                  Generating Screenshot…
                </Text>
              </Flex>
            )}
            {!loading && blob && (
              <a href={blob} target="_blank" rel="noreferrer">
                <Img src={blob} />
              </a>
            )}
          </Box>
        </Grid>
      </Stack>
    </Dialog>
  )
}

export default getScreenshot
